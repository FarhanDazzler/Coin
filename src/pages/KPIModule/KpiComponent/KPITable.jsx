import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Badge, Flex, MantineProvider } from '@mantine/core';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
} from 'mantine-react-table';
import * as XLSX from 'xlsx';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KpiTableFilter from './KpiTableFilter';
import { getCurrentYearAndQuarter } from '../KpiModuleLandingPage';
import { useMsal } from '@azure/msal-react';
import { submit_KPI_data_KPI_Module } from '../../../redux/KPI_Module/KPI_Action';

// function to export the data to CSV using the XLSX library
const exportToCsv = (filename, data, fields) => {
  // Map data to the required format
  const formattedData = data.map((item) => {
    const result = {};
    fields.forEach((field) => {
      result[field.label] = item[field.value];
    });
    return result;
  });

  // Create a new workbook and add the worksheet
  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Write the workbook to CSV format
  const csv = XLSX.write(wb, { bookType: 'csv', type: 'string' });

  // Create a Blob from the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const Badge_apply = ({ data }) => {
  const colorMap = {
    PASS: 'green',
    FAIL: 'red',
    'N/A': 'gray',
    NA: 'gray',
  };

  const color = colorMap[data.toUpperCase()] || 'gray';

  return (
    <Badge color={color} size="lg" radius="lg" variant="outline">
      {data.toUpperCase()}
    </Badge>
  );
};

// Function to calculate the result based on the numerator, denominator, threshold, positive direction and result
function calculateResult(numerator, denominator, threshold, positiveDirection, result) {
  if (
    threshold === null ||
    threshold === '' ||
    threshold === '-' ||
    threshold === 'NA' ||
    result === 'NA' ||
    result === 'N/A'
  ) {
    return 'N/A';
  }

  if (
    numerator === null ||
    numerator === '' ||
    numerator === 'NA' ||
    denominator === null ||
    denominator === '' ||
    denominator === 'NA'
  ) {
    return 'Fail';
  }

  let num, den, thresholdFloat;

  try {
    num = parseFloat(+numerator);
    den = parseFloat(+denominator);
    thresholdFloat = parseFloat(+threshold);
  } catch (error) {
    console.log('Error: One of the inputs is not a valid float.');
    return 'Fail';
  }

  if (isNaN(num) || isNaN(den) || isNaN(thresholdFloat)) {
    console.log('Error: One of the inputs is not a valid float.');
    return 'Fail';
  }

  if (den === 0) {
    return 'Fail'; // Only denominator is zero
  }
  const value = num / den.toFixed(5);
  if (positiveDirection && positiveDirection?.trim()?.toLowerCase() === 'lower is better') {
    return value <= thresholdFloat ? 'Pass' : 'Fail';
  } else if (positiveDirection && positiveDirection?.trim()?.toLowerCase() === 'higher is better') {
    return value >= thresholdFloat ? 'Pass' : 'Fail';
  } else {
    return 'Fail';
  }
}

const KPITable = ({
  data = [],
  yearAndQuarter,
  distinct_control_ids = [],
  distinct_provider = [],
  distinct_receiver = [],
  distinct_zone = [],
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { accounts } = useMsal();
  const [submitLoading, setSubmitLoading] = useState(false);
  const currentYearAndQuarter = getCurrentYearAndQuarter();
  console.log('currentYearAndQuarter', currentYearAndQuarter);
  const [tableData, setTableData] = useState(() => data);
  const [filterData, setFilterData] = useState({
    zoneValue: [],
    entityValue: [],
    providerValue: [],
    controlIDValue: [],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isFileUploading, setIsfileuploading] = useState(false);
  const [buttonText, setButtonText] = useState('Upload File');

  // Code for validation and result calculation for KPI_Num and KPI_Den columns
  const validateKPI = (row, value, type) => {
    let errors = {};

    if (type === 'KPI_Num') {
      if (row.KPI_Num && !row.KPI_Den) {
        errors.KPI_Num = 'Denominator is required';
      } else if (!row.KPI_Num && row.KPI_Num !== 0 && row.KPI_Den) {
        errors.KPI_Num = 'Numerator is required';
      }
    } else if (type === 'KPI_Den') {
      if (row.KPI_Den && !row.KPI_Num && row.KPI_Num !== 0) {
        errors.KPI_Den = 'Numerator is required';
      } else if (row.KPI_Num && !row.KPI_Den) {
        errors.KPI_Num = 'Denominator is required';
      } else if (!isNaN(value) && value <= 0) {
        errors.KPI_Den = 'Denominator must be greater than zero';
      }
    }
    console.log('errors', errors);
    return errors;
  };

  const updateResults = (row, tableData, cell) => {
    tableData[cell.row.index].Result_L1 = calculateResult(
      row.KPI_Num,
      row.KPI_Den,
      row.L1,
      row.Direction,
      row.Result_L1,
    );
    tableData[cell.row.index].Result_L2 = calculateResult(
      row.KPI_Num,
      row.KPI_Den,
      row.L2,
      row.Direction,
      row.Result_L2,
    );
    tableData[cell.row.index].Result_L3 = calculateResult(
      row.KPI_Num,
      row.KPI_Den,
      row.L3,
      row.Direction,
      row.Result_L3,
    );

    if ((row.KPI_Num || row.KPI_Num == 0) && row.KPI_Den) {
      tableData[cell.row.index].KPI_Value = (+row.KPI_Num / +row.KPI_Den).toFixed(5);
    } else {
      tableData[cell.row.index].KPI_Value = '';
    }
  };

  const columns = [
    {
      accessorKey: 'Zone',
      //filterVariant: 'multi-select',
      header: 'Zone',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Entity',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Entity',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'provider',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Provider',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'CONTROL_ID',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Control ID',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'control_NAME',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Name',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'kpi_type',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI Type',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Expected_Source',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Expected Source',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      // Cell: ({ row }) => <span>{row.original.Expected_Source}</span>,
      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'expected_kpi_source',
      enableClickToCopy: true,
      // filterVariant: 'multi-select',
      header: 'Expected KPI Data Source',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      // Cell: ({ row }) => <span>{row.original.expected_kpi_source}</span>,
      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'KPI_CODE',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI ID',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_NAME',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Name',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'applicable',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Applicability',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Month',
      //filterVariant: 'multi-select',
      header: 'Month',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Direction',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Direction',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'expected_num',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Num',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'expected_den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Den',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Num',
      enableClickToCopy: true,
      header: 'KPI Num',
      size: 100,
      Cell: ({ row }) => <span>{row.original.KPI_Num}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.KPI_Num,
        //helperText: validationErrors[row.original.id]?.KPI_Num,
        value: row.original.KPI_Num,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;

          // Update results based on the row
          updateResults(row.original, updatedTableData, cell);
        },
        onBlur: (event) => {
          const value = parseFloat(event.target.value.trim());
          tableData[cell.row.index][cell.column.id] = value;

          const errors = validateKPI(row.original, value, 'KPI_Num');
          setValidationErrors((prev) => ({
            ...prev,
            [row.original.id]: {
              ...prev[row.original.id],
              ...errors,
            },
          }));

          if (Object.keys(errors).length === 0) {
            delete validationErrors[row.original.id]?.KPI_Num;
            delete validationErrors[row.original.id]?.KPI_Den;
            setValidationErrors({ ...validationErrors });
          }

          updateResults(row.original, tableData, cell);
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
          },
        },
    },
    {
      accessorKey: 'KPI_Den',
      enableClickToCopy: true,
      header: 'KPI Den',
      size: 100,
      Cell: ({ row }) => <span>{row.original.KPI_Den}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.KPI_Den,
        value: row.original.KPI_Den,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;

          // Update results based on the row
          updateResults(row.original, updatedTableData, cell);
        },
        //helperText: validationErrors[row.original.id]?.KPI_Den,
        onBlur: (event) => {
          const value = parseFloat(event.target.value.trim());
          tableData[cell.row.index][cell.column.id] = value;

          const errors = validateKPI(row.original, value, 'KPI_Den');
          setValidationErrors((prev) => ({
            ...prev,
            [row.original.id]: {
              ...prev[row.original.id],
              ...errors,
            },
          }));

          if (Object.keys(errors).length === 0) {
            delete validationErrors[row.original.id]?.KPI_Num;
            delete validationErrors[row.original.id]?.KPI_Den;
            setValidationErrors({ ...validationErrors });
          }

          updateResults(row.original, tableData, cell);
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
          },
        },
    },
    {
      accessorKey: 'KPI_Value',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Value',
      size: 100,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      enableEditing: false,
      Cell: ({ row }) => <span>{row.original.KPI_Value}</span>,
    },
    {
      accessorKey: 'upload_approach',
      header: 'Actual KPI Source',
      size: 100,
      editVariant: 'select',
      Cell: ({ row }) => <span>{row.original?.upload_approach}</span>,
      mantineEditSelectProps: ({ cell, row }) => ({
        data: [
          {
            value: 'Excel',
            label: 'Excel',
          },
          {
            value: 'PBI',
            label: 'PBI',
          },
          {
            value: 'Celonis',
            label: 'Celonis',
          },
          {
            value: 'Others',
            label: 'Others',
          },
        ],
        onChange: (value) => {
          return (tableData[cell.row.index][cell.column.id] = value);
        },
        value: row.original.upload_approach ? row.original.upload_approach : null,
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'source_system',
      enableClickToCopy: true,
      header: 'Source of Data - Link',
      size: 300,
      Cell: ({ row }) => <span>{row.original.source_system}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: false,
        type: 'text',
        variant: 'filled',
        value: row.original.source_system,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;

          // Update results based on the row
          updateResults(row.original, updatedTableData, cell);
        },
        onBlur: (event) => {
          const value = event.target.value.trim();
          tableData[cell.row.index][cell.column.id] = value;
          // setTableData([...tableData]);
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'kpi_desc',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Description',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'L1',
      // filterVariant: 'autocomplete',
      header: 'Threshold L1',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'L2',
      // filterVariant: 'autocomplete',
      header: 'Threshold L2',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'L3',
      // filterVariant: 'autocomplete',
      header: 'Threshold L3',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Result_L1',
      //   filterVariant: 'autocomplete',
      header: 'Result L1',
      size: 50,
      enableEditing: false,
      // Cell: ({ cell }) => <Badge_apply data={cell.getValue()} />,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.Result_L1} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
          },
        },
    },
    {
      accessorKey: 'Result_L2',
      //   filterVariant: 'autocomplete',
      header: 'Result L2',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.Result_L2} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
          },
        },
    },
    {
      accessorKey: 'Result_L3',
      //   filterVariant: 'autocomplete',
      header: 'Result L3',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.Result_L3} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'kpi_owner_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Owner Email',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'control_owner_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Owner Email',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'control_oversight_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Oversight Email',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'load_date',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Load Date',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'year_and_quarter',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Year and Quarter',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.Expected_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
  ];

  const handleExport = () => {
    const fields = [
      { label: 'id', value: 'id' },
      { label: 'Zone', value: 'Zone' },
      { label: 'Entity', value: 'Entity' },
      { label: 'Provider', value: 'provider' },
      { label: 'Control ID', value: 'CONTROL_ID' },
      { label: 'Control Name', value: 'control_NAME' },
      { label: 'KPI Type', value: 'kpi_type' },
      { label: 'Expected Source', value: 'Expected_Source' },
      { label: 'Expected KPI Data Source', value: 'expected_kpi_source' },
      { label: 'KPI ID', value: 'KPI_CODE' },
      { label: 'KPI Name', value: 'KPI_NAME' },
      { label: 'Applicability', value: 'applicable' },
      { label: 'Month', value: 'Month' },
      { label: 'Direction', value: 'Direction' },
      { label: 'Expected Num', value: 'expected_num' },
      { label: 'Expected Den', value: 'expected_den' },
      { label: 'KPI Num', value: 'KPI_Num' },
      { label: 'KPI Den', value: 'KPI_Den' },
      { label: 'KPI Value', value: 'KPI_Value' },
      { label: 'Actual KPI Source', value: 'upload_approach' },
      { label: 'Source of Data - Link', value: 'source_system' },
      { label: 'KPI Description', value: 'kpi_desc' },
      { label: 'Threshold L1', value: 'L1' },
      { label: 'Threshold L2', value: 'L2' },
      { label: 'Threshold L3', value: 'L3' },
      { label: 'Result L1', value: 'Result_L1' },
      { label: 'Result L2', value: 'Result_L2' },
      { label: 'Result L3', value: 'Result_L3' },
      { label: 'KPI Owner Email', value: 'kpi_owner_email' },
      { label: 'Control Owner Email', value: 'control_owner_email' },
      { label: 'Control Oversight Email', value: 'control_oversight_email' },
      { label: 'Load Date', value: 'load_date' },
      { label: 'Year and Quarter', value: 'year_and_quarter' },
    ];

    exportToCsv('KPI_Module_Export.csv', tableData, fields);
  };

  const tableRecord = useMemo(() => {
    const areAllFiltersEmpty = Object.values(filterData).every((arr) => arr.length === 0);

    return areAllFiltersEmpty
      ? tableData
      : tableData.filter((item) => {
          return (
            (!filterData.zoneValue.length || filterData.zoneValue.includes(item.Zone)) &&
            (!filterData.entityValue.length || filterData.entityValue.includes(item.Entity)) &&
            (!filterData.providerValue.length ||
              filterData.providerValue.includes(item.provider)) &&
            (!filterData.controlIDValue.length ||
              filterData.controlIDValue.includes(item.CONTROL_ID))
          );
        });
  }, [filterData, tableData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    // setting the file uploading state to true
    setIsfileuploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const csvData = XLSX.utils.sheet_to_json(worksheet);

      handleDataImport(csvData);
      // Clear the file input value to allow re-uploading the same file
      event.target.value = '';
      // setting the file uploading state to false
      setIsfileuploading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const validateData = (data) => {
    let isValid = true;

    data.forEach((row, index) => {
      const { id, 'KPI Num': KPI_Num, 'KPI Den': KPI_Den } = row;

      if ((KPI_Num || KPI_Num === 0) && (KPI_Den || KPI_Den === 0)) {
        if (isNaN(KPI_Num) || isNaN(KPI_Den)) {
          isValid = false;
          toast.error(`Invalid KPI Numerator and Denominator at row ${index + 1}`);
        }
        if (KPI_Den <= 0) {
          isValid = false;
          toast.error(`Denominator must be greater than zero at row ${index + 1}`);
        }
      } else if (KPI_Num || KPI_Den) {
        isValid = false;
        toast.error(`Both KPI Num and KPI Den are required at row ${index + 1}`);
      }
    });

    return isValid;
  };

  const performCalculations = (data, tableData) => {
    return data.map((row) => {
      const {
        id,
        'KPI Num': KPI_Num,
        'KPI Den': KPI_Den,
        'Actual KPI Source': upload_approach,
        'Source of Data - Link': source_system,
      } = row;

      const tableRow = tableData.find((item) => item.id === id);

      if (tableRow) {
        const { Expected_Source, L1, L2, L3, Direction, Result_L1, Result_L2, Result_L3 } =
          tableRow;

        // only update those row where expected source is manual
        if (Expected_Source === 'Manual') {
          const KPI_Value =
            (KPI_Num || KPI_Num == 0) && KPI_Den ? (+KPI_Num / +KPI_Den).toFixed(5) : '';
          const newResult_L1 = calculateResult(KPI_Num, KPI_Den, L1, Direction, Result_L1);
          const newResult_L2 = calculateResult(KPI_Num, KPI_Den, L2, Direction, Result_L2);
          const newResult_L3 = calculateResult(KPI_Num, KPI_Den, L3, Direction, Result_L3);

          return {
            ...tableRow,
            KPI_Num,
            KPI_Den,
            upload_approach,
            source_system,
            KPI_Value,
            Result_L1: newResult_L1,
            Result_L2: newResult_L2,
            Result_L3: newResult_L3,
          };
        }
      }

      return tableRow;
    });
  };

  const handleDataImport = (csvData) => {
    if (validateData(csvData)) {
      const updatedData = performCalculations(csvData, tableData);
      setTableData(updatedData);
      // Clear the validation errors of table after successful validation and import of data
      setValidationErrors({});
    }
  };

  const handleSaveKPIData = () => {
    // checking if there are any validation errors before sending the data to the api for saving the data
    // if there are no validation errors then send the data to the api for saving the data
    // else show the validation errors to the user

    // {Object.values(validationErrors).some(
    //   (error) => error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
    // ) && <Text color="red">Fix errors before submitting</Text>}

    if (
      Object.keys(tableData).length === 0 ||
      Object.values(validationErrors).some(
        (error) => error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
      )
    ) {
      toast.error('Please fill all the required fields and fix the errors before submitting.');
      return;
    } else {
      const payload = {
        Submitted_by: accounts[0]?.username,
        KPI_data: tableData,
        events: {
          onSuccess: () => setSubmitLoading(false),
          onError: () => setSubmitLoading(false),
        },
      };
      setSubmitLoading(true);
      dispatch(submit_KPI_data_KPI_Module(payload));
      console.log('Saved data', tableData);
    }
  };

  return (
    <div className="kpi_table">
      <KpiTableFilter
        tableData={tableData}
        distinct_control_ids={distinct_control_ids}
        distinct_provider={distinct_provider}
        distinct_receiver={distinct_receiver}
        distinct_zone={distinct_zone}
        setFilterData={setFilterData}
      />
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <MantineReactTable
          columns={columns}
          data={tableRecord}
          enableColumnFilterModes={false}
          enableFacetedValues={true}
          enableGrouping={false}
          // enablePinning= {true}
          enableRowSelection={false}
          selectAllMode="all"
          getRowId={(row) => row.id}
          // paginationDisplayMode={'pages'}
          enableRowNumbers={true}
          rowNumberMode={'original'}
          // positionToolbarAlertBanner= {'bottom'}
          enableStickyHeader={true}
          // createDisplayMode="row" // ('modal', and 'custom' are also available)
          editDisplayMode="table" // ('modal', 'row', 'cell', and 'custom' are also available)
          enableEditing={(row) =>
            row.original.Expected_Source == 'Manual' &&
            row.original.year_and_quarter === currentYearAndQuarter
          }
          initialState={{
            isLoading: isFileUploading,
            showColumnFilters: true,
            showGlobalFilter: true,
            density: 'xs',
            expanded: true,
            grouping: ['state'],
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'state', desc: false }],
          }}
          mantineTableHeadCellProps={{
            align: 'center',
          }}
          displayColumnDefOptions={{
            'mrt-row-numbers': {
              size: 10,
            },
            'mrt-row-expand': {
              size: 10,
            },
          }}
          mantineTableProps={{
            withColumnBorders: true,
          }}
          renderTopToolbar={({ table }) => {
            const isDisabled = yearAndQuarter.toString() !== currentYearAndQuarter;

            return (
              <div>
                <div style={{ padding: '16px', color: 'white', fontSize: '14px' }}>
                  <b>Note:</b> In case there have been no transactions for the specified period for
                  any KPI, please enter 0 as both the numerator and the denominator. In case the
                  values are not allowed please reach out to your Zone Internal Control.
                </div>
                <Flex p="md" justify="space-between" className="kpi_module_buttons">
                  <Flex align="center" gap="xs">
                    <button
                      className="custom-btn mt-2 submit-btn"
                      onClick={handleSaveKPIData}
                      disabled={isDisabled || submitLoading}
                    >
                      Submit KPIs
                    </button>

                    <button className="custom-btn mt-2 submit-btn" onClick={handleExport}>
                      {t('selfAssessment.assessmentForm.exportToExcel')}
                    </button>

                    <div className="mt-4">
                      <label htmlFor="uploadfile" className="file-input">
                        <input
                          icon={FileUploadOutlinedIcon}
                          type="file"
                          placeholder="Name"
                          id="uploadfile"
                          onChange={handleFileUpload}
                          //style={{ display: 'none' }}
                          disabled={isDisabled}
                        />
                        <div className="custom-btn choose-file">
                          {<FileUploadOutlinedIcon />}
                          {' ' + buttonText}
                        </div>
                      </label>
                    </div>
                  </Flex>
                  <Flex gap="xs">
                    <MRT_GlobalFilterTextInput table={table} />
                    <MRT_ToggleFiltersButton table={table} />
                    <MRT_ShowHideColumnsButton table={table} />
                    <MRT_ToggleDensePaddingButton table={table} />
                  </Flex>
                </Flex>
              </div>
            );
          }}
        />
      </MantineProvider>
    </div>
  );
};

export default KPITable;

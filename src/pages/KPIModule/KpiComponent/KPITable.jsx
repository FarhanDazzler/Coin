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
import Workbook from 'react-excel-workbook';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';
import KpiTableFilter from './KpiTableFilter';
import readXlsxFile from 'read-excel-file';
import { getCurrentYearAndQuarter } from '../KpiModuleLandingPage';

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
  if (positiveDirection && positiveDirection.trim().toLowerCase() === 'lower is better') {
    return value <= thresholdFloat ? 'Pass' : 'Fail';
  } else if (positiveDirection && positiveDirection.trim().toLowerCase() === 'higher is better') {
    return value >= thresholdFloat ? 'Pass' : 'Fail';
  } else {
    return 'Fail';
  }
}

const KPITable = ({ data, yearAndQuarter }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentQuarter = getCurrentYearAndQuarter();
  console.log('currentQuarter', currentQuarter);
  const currentYear = new Date().getFullYear();
  const [tableData, setTableData] = useState(() => data);
  const [filterData, setFilterData] = useState({
    zoneValue: [],
    entityValue: [],
    providerValue: [],
    controlIDValue: [],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [excelFile, setExcelFile] = useState(null);
  const [buttonText, setButtonText] = useState('Choose a file');
  const columns = [
    {
      accessorKey: 'Zone',
      filterVariant: 'multi-select',
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
      filterVariant: 'multi-select',
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
      filterVariant: 'multi-select',
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
      filterVariant: 'multi-select',
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
      filterVariant: 'multi-select',
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
      Cell: ({ row }) => <span>{row.original.Expected_Source}</span>,

      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'KPI_CODE',
      enableClickToCopy: true,
      filterVariant: 'multi-select',
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
      filterVariant: 'multi-select',
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
      //   filterVariant: 'autocomplete',
      header: 'KPI Num',
      size: 100,
      Cell: ({ row }) => <span>{row.original.KPI_Num}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.KPI_Num,
        helperText: validationErrors[row.original.id]?.KPI_Num,
        onBlur: (event) => {
          // console.log('@@', row.original.id);
          const value = parseFloat(event.target.value.trim());

          tableData[cell.row.index][cell.column.id] = value;
          // setTableData([...tableData]);
          // setting up results here based on the numerator, denominator, threshold, and positive direction
          tableData[cell.row.index].Result_L1 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L1,
            row.original.Direction,
            row.original.Result_L1,
          );
          tableData[cell.row.index].Result_L2 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L2,
            row.original.Direction,
            row.original.Result_L2,
          );
          tableData[cell.row.index].Result_L3 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L3,
            row.original.Direction,
            row.original.Result_L3,
          );

          //validation logic
          // if (!value) {
          //   setValidationErrors((prev) => ({
          //     ...prev,
          //     [row.original.id]: {
          //       ...prev[row.original.id],
          //       KPI_Num: 'Numerator is required',
          //     },
          //   }));
          // } else
          if (!isNaN(value) && value < 0) {
            setValidationErrors((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                KPI_Num: 'Numerator can be positive values only',
              },
            }));
          } else if (row.original.KPI_Num && !row.original.KPI_Den) {
            // console.log('@@', row);
            setValidationErrors((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                KPI_Num: 'Denominator is required',
              },
            }));
          } else {
            delete validationErrors[row.original.id]?.KPI_Num;
            setValidationErrors({ ...validationErrors });

            // setting up KPI Value after the denominator is entered
            if (row.original.KPI_Den && row.original.KPI_Num) {
              tableData[cell.row.index].KPI_Value = (
                +row.original.KPI_Num / +row.original.KPI_Den
              ).toFixed(5);
            }

            if (
              row.original.KPI_Den &&
              validationErrors[row.original.id]?.KPI_Den == 'Numerator is required'
            ) {
              delete validationErrors[row.original.id]?.KPI_Den;
              setValidationErrors({ ...validationErrors });
            }
          }
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
      accessorKey: 'KPI_Den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Den',
      size: 100,
      Cell: ({ row }) => <span>{row.original.KPI_Den}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.KPI_Den,
        helperText: validationErrors[row.original.id]?.KPI_Den,
        onBlur: (event) => {
          const value = parseFloat(event.target.value.trim());

          tableData[cell.row.index][cell.column.id] = value;

          // setting up results here based on the numerator, denominator, threshold, and positive direction
          tableData[cell.row.index].Result_L1 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L1,
            row.original.Direction,
            row.original.Result_L1,
          );
          tableData[cell.row.index].Result_L2 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L2,
            row.original.Direction,
            row.original.Result_L2,
          );
          tableData[cell.row.index].Result_L3 = calculateResult(
            row.original.KPI_Num,
            row.original.KPI_Den,
            row.original.L3,
            row.original.Direction,
            row.original.Result_L3,
          );

          //validation logic
          // if (!value) {
          //   setValidationErrors((prev) => ({
          //     ...prev,
          //     [row.original.id]: {
          //       ...prev[row.original.id],
          //       KPI_Den: 'Denominator is required',
          //     },
          //   }));
          // } else
          if (!isNaN(value) && value <= 0) {
            setValidationErrors((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                KPI_Den: 'Denominator can be positive values only',
              },
            }));
          } else if (row.original.KPI_Den && !row.original.KPI_Num) {
            // console.log('##', row);
            setValidationErrors((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                KPI_Den: 'Numerator is required',
              },
            }));
          } else {
            delete validationErrors[row.original.id]?.KPI_Den;
            setValidationErrors({ ...validationErrors });

            // setting up KPI Value after the denominator is entered
            if (row.original.KPI_Den && row.original.KPI_Num) {
              tableData[cell.row.index].KPI_Value = (
                +row.original.KPI_Num / +row.original.KPI_Den
              ).toFixed(5);
            }

            if (
              row.original.KPI_Num &&
              validationErrors[row.original.id]?.KPI_Num == 'Denominator is required'
            ) {
              delete validationErrors[row.original.id]?.KPI_Num;
              setValidationErrors({ ...validationErrors });
            }
          }
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
      accessorKey: 'expected_kpi_source',
      header: 'Expected KPI Source',
      size: 100,
      editVariant: 'select',
      Cell: ({ row }) => <span>{row.original.expected_kpi_source}</span>,
      mantineEditSelectProps: ({ cell, row }) => ({
        data: [
          {
            value: 'Automated',
            label: 'Automated',
          },
          {
            value: 'Manual',
            label: 'Manual',
          },
        ],
        onChange: (value) => (tableData[cell.row.index][cell.column.id] = value),
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
        onChange: (value) => (tableData[cell.row.index][cell.column.id] = value),
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
    // {
    //   accessorKey: 'Direction',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'Direction',
    //   size: 300,
    //   enableEditing: false,
    // mantineTableBodyCellProps: ({ row }) =>
    //   row.original.Expected_Source == 'Automated' && {
    //     // align: 'center',
    //     sx: {
    //       backgroundColor: '#1B1212',
    //       color: '#fff',
    //       // borderRight: '1px solid rgba(224,224,224,1)',
    //     },
    //   },
    // },
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

  const validateData = () => {
    if (!excelFile) {
      toast.error('No Excel file data to validate.');
      // console.error('No Excel file data to validate.');
      return false;
    }

    // Length validation
    if (excelFile.length !== data.length) {
      toast.error('Data length mismatch between excelFile and tableData.');
      return false;
    }

    // Define the mapping between excelFile keys and tableData/data keys
    const keyMapping = {
      Zone: 'Zone',
      Entity: 'Entity',
      provider: 'provider',
      CONTROL_ID: 'CONTROL_ID',
      // 'Control Name': 'control_NAME',
      kpi_type: 'kpi_type',
      Expected_Source: 'Expected_Source',
      KPI_CODE: 'KPI_CODE',
      // 'KPI Name': 'KPI_NAME',
      applicable: 'applicable',
      Month: 'Month',
      expected_num: 'expected_num',
      expected_den: 'expected_den',
      KPI_Num: 'KPI_Num',
      KPI_Den: 'KPI_Den',
      // 'KPI_Value': 'KPI_Value',
      expected_kpi_source: 'expected_kpi_source',
      upload_approach: 'upload_approach',
      source_system: 'source_system',
      // 'KPI Description': 'kpi_desc',
      L1: 'L1',
      L2: 'L2',
      L3: 'L3',
      Result_L1: 'Result_L1',
      Result_L2: 'Result_L2',
      Result_L3: 'Result_L3',
      kpi_owner_email: 'kpi_owner_email',
      control_owner_email: 'control_owner_email',
      control_oversight_email: 'control_oversight_email',
      year_and_quarter: 'year_and_quarter',
      id: 'id',
    };

    const allowedDiffFieldsExcel = [
      'KPI_Num',
      'KPI_Den',
      'expected_kpi_source',
      'upload_approach',
      'source_system',
    ];

    const isNullOrEmpty = (value) => value === null || value === '';

    for (let i = 0; i < excelFile.length; i++) {
      const excelRow = excelFile[i];
      const tableRow = data[i];
      console.log('keyMapping', keyMapping);
      for (const [excelKey, tableKey] of Object.entries(keyMapping)) {
        if (!allowedDiffFieldsExcel.includes(excelKey)) {
          const excelValue = excelRow[excelKey];
          const tableValue = tableRow[tableKey];

          if (
            excelValue != tableValue &&
            !(isNullOrEmpty(excelValue) && isNullOrEmpty(tableValue))
          ) {
            toast.error(`Mismatch found at row ${i + 1} for key: ${excelKey}`);
            return false;
          }
        }
      }

      if (isNullOrEmpty(excelRow['KPI_Num']) && isNullOrEmpty(excelRow['KPI_Den'])) {
        continue;
      }

      const kpiNum = parseFloat(excelRow['KPI_Num']);
      const kpiDen = parseFloat(excelRow['KPI_Den']);

      if (isNaN(kpiNum) && isNaN(kpiDen)) {
        toast.error(`Invalid KPI Numerator and Denominator at row ${i + 1}`);
        return false;
      }
      if (isNaN(kpiNum) && !isNaN(kpiDen)) {
        toast.error(`Invalid KPI Numerator at row ${i + 1}`);
        return false;
      }
      if (isNaN(kpiDen) && !isNaN(kpiNum)) {
        toast.error(`Invalid KPI Denominator at row ${i + 1}`);
        return false;
      }

      if (kpiNum < 0) {
        toast.error(`Numerator must be positive at row ${i + 1}`);
        return false;
      }

      if (kpiDen <= 0) {
        toast.error(`Denominator must be greater than zero at row ${i + 1}`);
        return false;
      }
    }

    console.log('Validation passed');
    return true;
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    // Validate the data from the excel file and tableData
    if (!validateData()) {
      console.error('Validation failed');
      document.getElementById('excel_import_btn_kpi_module').reset(); // Ensure the form ID is correct
      setButtonText('Choose a file');
      return;
    }

    // Update the tableData with the results
    setTableData(excelFile);
    setButtonText('Choose a file');
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
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setButtonText(selectedFile.name);
      readXlsxFile(selectedFile).then((data) => {
        const copyData = { ...data };
        const fileData = data.slice(1).map((d, dataIndex) => {
          let obj = { id: dataIndex };
          d.map((v, i) => {
            let key = copyData[0][i];
            if (copyData[0][i] === 'Provider') {
              key = 'provider';
            }
            if (copyData[0][i] === 'Control ID') {
              key = 'CONTROL_ID';
            }
            if (copyData[0][i] === 'Control Name') {
              key = 'control_NAME';
            }
            if (copyData[0][i] === 'KPI Type') {
              key = 'kpi_type';
            }
            if (copyData[0][i] === 'Expected Source') {
              key = 'Expected_Source';
            }
            if (copyData[0][i] === 'KPI ID') {
              key = 'KPI_CODE';
            }
            if (copyData[0][i] === 'KPI Name') {
              key = 'KPI_NAME';
            }
            if (copyData[0][i] === 'Applicability') {
              key = 'applicable';
            }
            if (copyData[0][i] === 'Expected Num') {
              key = 'expected_num';
            }
            if (copyData[0][i] === 'Expected Den') {
              key = 'expected_den';
            }
            if (copyData[0][i] === 'KPI Num') {
              key = 'KPI_Num';
            }
            if (copyData[0][i] === 'KPI Den') {
              key = 'KPI_Den';
            }
            if (copyData[0][i] === 'KPI Value') {
              key = 'KPI_Value';
            }
            if (copyData[0][i] === 'Expected KPI Source') {
              key = 'expected_kpi_source';
            }
            if (copyData[0][i] === 'Actual KPI Source') {
              key = 'upload_approach';
            }
            if (copyData[0][i] === 'Source of Data - Link') {
              key = 'source_system';
            }
            if (copyData[0][i] === 'KPI Description') {
              key = 'kpi_desc';
            }
            if (copyData[0][i] === 'Threshold L1') {
              key = 'L1';
            }
            if (copyData[0][i] === 'Threshold L2') {
              key = 'L2';
            }
            if (copyData[0][i] === 'Threshold L3') {
              key = 'L3';
            }
            if (copyData[0][i] === 'Result L1') {
              key = 'Result_L1';
            }
            if (copyData[0][i] === 'Result L2') {
              key = 'Result_L2';
            }
            if (copyData[0][i] === 'Result L3') {
              key = 'Result_L3';
            }
            if (copyData[0][i] === 'KPI Owner Email') {
              key = 'kpi_owner_email';
            }
            if (copyData[0][i] === 'Control Owner Email') {
              key = 'control_owner_email';
            }
            if (copyData[0][i] === 'Control Oversight Email') {
              key = 'control_oversight_email';
            }
            if (copyData[0][i] === 'Year and Quarter') {
              key = 'year_and_quarter';
            }

            obj[key] = v;
          });

          const findCurrentData = tableRecord.find((d) => d.id === obj.id);

          if (findCurrentData.year_and_quarter === obj.year_and_quarter) {
            return {
              ...obj,
              Result_L1: calculateResult(
                obj.KPI_Num,
                obj.KPI_Den,
                obj.L1,
                obj.Direction,
                obj.Result_L1,
              ),
              Result_L2: calculateResult(
                obj.KPI_Num,
                obj.KPI_Den,
                obj.L2,
                obj.Direction,
                obj.Result_L2,
              ),
              Result_L3: calculateResult(
                obj.KPI_Num,
                obj.KPI_Den,
                obj.L3,
                obj.Direction,
                obj.Result_L3,
              ),
            };
          }
          return findCurrentData;
        });

        setExcelFile(fileData);
      });
    } else {
      setExcelFile(null);
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
      console.log('Saved data', tableData);
    }
  };

  return (
    <div className="kpi_table">
      <KpiTableFilter tableData={tableData} setFilterData={setFilterData} />
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
            row.original.year_and_quarter === currentYear
          }
          initialState={{
            showColumnFilters: true,
            showGlobalFilter: true,
            density: 'xs',
            expanded: true,
            grouping: ['state'],
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'state', desc: false }],
          }}
          // mantinePaginationProps={{
          //   radius: 'xl',
          //   size: 'lg',
          // }}
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
            //   highlightOnHover: false,
            withColumnBorders: true,
            //   sx: {
            //     'thead > tr': {
            //       backgroundColor: 'inherit',
            //     },
            //     // 'thead > tr > th': {
            //     //   backgroundColor: 'inherit',
            //     // },
            //     'tbody > tr > td': {
            //       backgroundColor: 'inherit',
            //     },
            //   },
          }}
          renderTopToolbar={({ table }) => {
            return (
              <Flex p="md" justify="space-between" className="kpi_module_buttons">
                <Flex align="center" gap="xs">
                  <button
                    className="custom-btn mt-2 submit-btn"
                    onClick={handleSaveKPIData}
                    // disabled={
                    //   Object.keys(tableData).length === 0 ||
                    //   Object.values(validationErrors).some(
                    //     (error) =>
                    //       error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
                    //   )
                    // }
                  >
                    Submit KPIs
                  </button>
                  <div className="row kpi_table_row" id="export_button_right">
                    <Workbook
                      filename={`KPI_Module_Export.xlsx`}
                      element={
                        <button
                          className="custom-btn mt-2 submit-btn"
                          disabled={table.getPrePaginationRowModel().rows.length === 0}
                        >
                          {t('selfAssessment.assessmentForm.exportToExcel')}
                        </button>
                      }
                    >
                      <Workbook.Sheet data={tableData} name="KPI">
                        <Workbook.Column label="Zone" value="Zone" />
                        <Workbook.Column label="Entity" value="Entity" />
                        <Workbook.Column label="Provider" value="provider" />
                        <Workbook.Column label="Control ID" value="CONTROL_ID" />
                        <Workbook.Column label="Control Name" value="control_NAME" />
                        <Workbook.Column label="KPI Type" value="kpi_type" />
                        <Workbook.Column label="Expected Source" value="Expected_Source" />
                        <Workbook.Column label="KPI ID" value="KPI_CODE" />
                        <Workbook.Column label="KPI Name" value="KPI_NAME" />
                        <Workbook.Column label="Applicability" value="applicable" />
                        <Workbook.Column label="Month" value="Month" />
                        <Workbook.Column label="Expected Num" value="expected_num" />
                        <Workbook.Column label="Expected Den" value="expected_den" />
                        <Workbook.Column label="KPI Num" value="KPI_Num" />
                        <Workbook.Column label="KPI Den" value="KPI_Den" />
                        <Workbook.Column label="KPI Value" value="KPI_Value" />
                        <Workbook.Column label="Expected KPI Source" value="expected_kpi_source" />
                        <Workbook.Column label="Actual KPI Source" value="upload_approach" />
                        <Workbook.Column label="Source of Data - Link" value="source_system" />
                        <Workbook.Column label="KPI Description" value="kpi_desc" />
                        <Workbook.Column label="Direction" value="Direction" />
                        <Workbook.Column label="Threshold L1" value="L1" />
                        <Workbook.Column label="Threshold L2" value="L2" />
                        <Workbook.Column label="Threshold L3" value="L3" />
                        <Workbook.Column label="Result L1" value="Result_L1" />
                        <Workbook.Column label="Result L2" value="Result_L2" />
                        <Workbook.Column label="Result L3" value="Result_L3" />
                        <Workbook.Column label="KPI Owner Email" value="kpi_owner_email" />
                        <Workbook.Column label="Control Owner Email" value="control_owner_email" />
                        <Workbook.Column
                          label="Control Oversight Email"
                          value="control_oversight_email"
                        />
                        <Workbook.Column label="Year and Quarter" value="year_and_quarter" />
                        <Workbook.Column label="id" value="id" />
                      </Workbook.Sheet>
                    </Workbook>
                  </div>
                  <form
                    onSubmit={handleFileSubmit}
                    id="excel_import_btn_kpi_module"
                    className="kpi_module_form mt-1"
                  >
                    <div className="d-flex align-items-center">
                      <div className="mt-2">
                        <label htmlFor="uploadfile" className="file-input">
                          <input
                            type="file"
                            placeholder="Name"
                            id="uploadfile"
                            onChange={handleFileUpload}
                          />
                          <div className="custom-btn choose-file">{buttonText}</div>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="custom-btn upload-btn"
                        disabled={
                          buttonText === 'Choose a file' ||
                          yearAndQuarter.toString() !== currentQuarter
                        }
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </Flex>
                <Flex gap="xs">
                  <MRT_GlobalFilterTextInput table={table} />
                  <MRT_ToggleFiltersButton table={table} />
                  <MRT_ShowHideColumnsButton table={table} />
                  <MRT_ToggleDensePaddingButton table={table} />
                </Flex>
              </Flex>
            );
          }}
        />
      </MantineProvider>
    </div>
  );
};

export default KPITable;

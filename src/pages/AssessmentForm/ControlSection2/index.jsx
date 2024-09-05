import React, { useCallback, useEffect, useMemo, useState } from 'react';
//import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Flex, MantineProvider } from '@mantine/core';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
} from 'mantine-react-table';
import * as XLSX from 'xlsx';
import {
  kpiResultSelector,
  getResponseSelector,
  getLatestDraftSelector,
  get_historical_graph_dataSelector,
  get_KPI_Section2_dataSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Loader } from '@mantine/core';
import KIP_Graph_Section_2 from './KIP_Graph_Section_2';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { getCurrentYearAndQuarter } from '../../KPIModule/KpiModuleLandingPage';
import { exportToCsv, Badge_apply } from '../../KPIModule/KpiComponent/KPITable';

export const hasFailNumerator = (row) => {
  const isNumeratorValue = !!row?.Numerator || [0, '0'].includes(row?.Numerator);
  const isDenominatorValue = !!row?.Denominator || [0, '0'].includes(row?.Denominator);
  if (!isNumeratorValue && isDenominatorValue) {
    return true;
  }
  return false;
};

export const hasFailDenominator = (row) => {
  const isNumeratorValue = !!row?.Numerator || [0, '0'].includes(row?.Numerator);
  const isDenominatorValue = !!row?.Denominator || [0, '0'].includes(row?.Denominator);
  if (!isDenominatorValue && isNumeratorValue) {
    return true;
  }
  return false;
};

//const headerStyles = { color: '#000', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.1)' };
const ControlSection2 = ({
  tableData = [],
  setTableData,
  controlId,
  isModal,
  isReview,
  startTableEdit,
  setIsStartTableEdit,
  validationErrors,
  setValidationErrors,
}) => {
  const { t } = useTranslation();
  let headerStyles;
  if (isModal) {
    headerStyles = { color: '#fff', fontWeight: '700', backgroundColor: '#000' };
  } else {
    headerStyles = { color: '#fff', fontWeight: '700', backgroundColor: '#000' };
  }
  const [showGraph, setShowGraph] = useState(true);
  const getKPIResponse = useSelector(getResponseSelector);
  const kpiResultData = useSelector(kpiResultSelector);
  const get_KPI_Section2_data = useSelector(get_KPI_Section2_dataSelector);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const kpiResponseData = latestDraftData?.data?.Latest_response?.kpis
    ? latestDraftData?.data?.Latest_response?.kpis
    : get_KPI_Section2_data?.data;

  const currentYearAndQuarter = getCurrentYearAndQuarter();
  const dispatch = useDispatch();
  const get_historical_graph_data = useSelector(get_historical_graph_dataSelector);
  const historicalGraphData = get_historical_graph_data?.data || {};

  const [isFileUploading, setIsfileuploading] = useState(false);

  useEffect(() => {
    if (startTableEdit) return;
    if (isModal || isReview) {
      //Check is user only preview mode then api data store in table view
      if (getKPIResponse?.data?.Latest_Response?.kpis) {
        setTableData(getKPIResponse?.data?.Latest_Response?.kpis);
      }
    } else if (get_KPI_Section2_data?.data?.length > 0) {
      //Convert table formate data TO display structure
      const table_data = [...kpiResponseData];
      // table_data.forEach((tData, i) => {
      //   // tData['id'] = i + 1;
      //   tData['Upload_Approach'] = tData['Upload_Approach'] || '';
      //   tData['Source_System'] = tData['Source_System']?.trimStart() || '';

      //   tData['KPI_Source'] = 'Manual';
      //   tData['Year_and_Quarter'] = currentYearAndQuarter;
      // });

      setTableData(table_data);
    }
  }, [kpiResultData, kpiResponseData]);

  // Code for validation and result calculation for Numerator and Denominator columns
  const validateKPI = (row, value, type) => {
    let errors = {};
    // console.log('row num', row.Numerator);
    // console.log('row deno', row.Denominator);
    // console.log('value', value);
    // console.log('type', type);
    // console.log(row.Numerator ? 'Numerator is present' : 'Numerator is not present');
    // console.log(row.Denominator ? 'Denominator is present' : 'Denominator is not present');

    // These functions handle the validation logic based on the Numerator_Allowed and Denominator_Allowed values.
    const isNumeratorValid = (num) => {
      switch (row.Numerator_Allowed) {
        case 'Positive/Zero only':
          return num >= 0;
        case 'Negative/Zero only':
          return num <= 0;
        case 'Zero/One only':
          return num === 0 || num === 1;
        case 'Any value':
        default:
          return true;
      }
    };

    const isDenominatorValid = (den) => {
      switch (row.Denominator_Allowed) {
        case 'Positive only':
          return den > 0;
        case 'Negative only':
          return den < 0;
        case 'Positive/Zero only':
          return den >= 0;
        case 'Negative/Zero only':
          return den <= 0;
        case 'Zero/One only':
          return den === 0 || den === 1;
        case 'Any value':
        default:
          return true;
      }
    };

    if (type === 'Numerator') {
      // Check if the Numerator is valid based on the Numerator_Allowed value
      if (!isNaN(value) && !isNumeratorValid(value)) {
        errors.Numerator = `Numerator must be ${row.Numerator_Allowed}`;
      } else if (
        (row.Numerator || row.Numerator === 0) && // Handling zero as a valid number
        !row.Denominator &&
        row.Denominator !== 0
      ) {
        errors.Numerator = 'Denominator is required';
      } else if (
        !row.Numerator &&
        row.Numerator !== 0 &&
        (row.Denominator || row.Denominator === 0)
      ) {
        errors.Numerator = 'Numerator is required';
      }
    } else if (type === 'Denominator') {
      // Check if the Denominator is valid based on the Denominator_Allowed value
      if (!isNaN(value) && !isDenominatorValid(value)) {
        errors.Denominator = `Denominator must be ${row.Denominator_Allowed}`;
      } else if (
        (row.Denominator || row.Denominator === 0) &&
        !row.Numerator &&
        row.Numerator !== 0
      ) {
        errors.Denominator = 'Numerator is required';
      } else if (
        (row.Numerator || row.Numerator === 0) &&
        !row.Denominator &&
        row.Denominator !== 0
      ) {
        errors.Denominator = 'Denominator is required';
      }
      // else if (!isNaN(value) && value <= 0) {
      //   errors.Denominator = 'Denominator must be greater than zero';
      // }
    }

    // If both Numerator and Denominator are present, check their validity
    if ((row.Numerator || row.Numerator === 0) && (row.Denominator || row.Denominator === 0)) {
      const isNumeratorInvalid = !isNumeratorValid(row.Numerator);
      const isDenominatorInvalid = !isDenominatorValid(row.Denominator);

      errors.Numerator = isNumeratorInvalid ? `Numerator must be ${row.Numerator_Allowed}` : null;
      errors.Denominator = isDenominatorInvalid
        ? `Denominator must be ${row.Denominator_Allowed}`
        : null;

      // If both are valid, clear the errors object
      if (!isNumeratorInvalid && !isDenominatorInvalid) {
        errors = {};
      }
    }

    console.log('errors', errors);
    return errors;
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
      // console.log('Error: One of the inputs is not a valid float.');
      return 'Fail';
    }

    if (isNaN(num) || isNaN(den) || isNaN(thresholdFloat)) {
      // console.log('Error: One of the inputs is not a valid float.');
      return 'Fail';
    }

    if (den === 0) {
      return 'Pass'; // Only denominator is zero
    }
    const value = Math.abs(num / den.toFixed(5));
    if (positiveDirection && positiveDirection?.trim()?.toLowerCase() === 'lower is better') {
      return value <= thresholdFloat ? 'Pass' : 'Fail';
    } else if (
      positiveDirection &&
      positiveDirection?.trim()?.toLowerCase() === 'higher is better'
    ) {
      return value >= thresholdFloat ? 'Pass' : 'Fail';
    } else {
      return 'Fail';
    }
  }

  const updateResults = (row, tableData, cell) => {
    const numerator = parseFloat(row.Numerator);
    const denominator = parseFloat(row.Denominator);

    // console.log('numerator', numerator);
    // console.log('denominator', denominator);

    tableData[cell.row.index].L1_Result = calculateResult(
      numerator,
      denominator,
      row.Threshold_L1,
      row.Positive_Direction,
      row.L1_Result,
    );
    tableData[cell.row.index].L2_Result = calculateResult(
      numerator,
      denominator,
      row.Threshold_L2,
      row.Positive_Direction,
      row.L2_Result,
    );
    tableData[cell.row.index].L3_Result = calculateResult(
      numerator,
      denominator,
      row.Threshold_L3,
      row.Positive_Direction,
      row.L3_Result,
    );

    // logic to calculate KPI Value
    if ((numerator || numerator === 0) && (denominator || denominator === 0)) {
      // calculate KPI Value only if Numerator and Denominator are present and not null and finding the absolute value of the result
      // If the denominator is zero, the KPI Value is zero
      tableData[cell.row.index].KPI_Value =
        denominator === 0 ? 0 : Math.abs((+numerator / +denominator).toFixed(5));

      // console.log('abs Value', Math.abs((+numerator / +denominator).toFixed(5)));
      // console.log('KPI Value', tableData[cell.row.index].KPI_Value);
    } else {
      tableData[cell.row.index].KPI_Value = '';
      // console.log('KPI Value else', tableData[cell.row.index].KPI_Value);
    }
  };

  const columnsNew = [
    {
      accessorKey: 'Zone',
      //filterVariant: 'multi-select',
      header: 'Zone',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
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
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Year_and_Quarter',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Year and Quarter',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_ID',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI ID',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Name',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Name',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Description',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Description',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Type',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI Type',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Applicability_Level',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Applicability Level',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Responsibility',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI Responsibility',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Receiving_Entity',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Receiving Entity',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Owner_Email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Owner Email',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Oversight_Email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Oversight Email',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Source',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI Source',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      // Cell: ({ row }) => <span>{row.original.KPI_Source}</span>,
      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'Expected_KPI_Source',
      enableClickToCopy: true,
      // filterVariant: 'multi-select',
      header: 'Expected KPI Data Source',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      // Cell: ({ row }) => <span>{row.original.Expected_KPI_Source}</span>,
      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'KPI_Frequency',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'KPI Frequency',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
      // Cell: ({ row }) => <span>{row.original.KPI_Source}</span>,
      // Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
    },
    {
      accessorKey: 'Control_ID',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Control ID',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Provider_Org',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Provider Org',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Positive_Direction',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Positive Direction',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Expected_Numerator',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Numerator',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Expected_Denominator',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Denominator',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Numerator_Allowed',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Numerator Allowed',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Numerator',
      enableClickToCopy: true,
      header: 'Numerator',
      size: 100,
      enableEditing: isReview ? false : true,
      Cell: ({ row }) => <span>{row.original.Numerator}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.Numerator,
        //helperText: validationErrors[row.original.id]?.Numerator,
        value: row.original.Numerator,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;

          // // Update results based on the row
          // updateResults(row.original, updatedTableData, cell);
        },
        onBlur: (event) => {
          //const value = parseFloat(event.target.value.trim());
          const value = event.target.value.trim();
          tableData[cell.row.index][cell.column.id] = value;

          const errors = validateKPI(row.original, value, 'Numerator');
          setValidationErrors((prev) => ({
            ...prev,
            [row.original.id]: {
              ...prev[row.original.id],
              ...errors,
            },
          }));

          if (Object.keys(errors).length === 0) {
            delete validationErrors[row.original.id]?.Numerator;
            delete validationErrors[row.original.id]?.Denominator;
            setValidationErrors({ ...validationErrors });
            updateResults(row.original, tableData, cell);
          }
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
          },
        },
    },
    {
      accessorKey: 'Denominator_Allowed',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Denominator Allowed',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Denominator',
      enableClickToCopy: true,
      header: 'Denominator',
      size: 100,
      enableEditing: isReview ? false : true,
      Cell: ({ row }) => <span>{row.original.Denominator}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.Denominator,
        value: row.original.Denominator,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;

          // // Update results based on the row
          // updateResults(row.original, updatedTableData, cell);
        },
        //helperText: validationErrors[row.original.id]?.Denominator,
        onBlur: (event) => {
          //const value = parseFloat(event.target.value.trim());
          const value = event.target.value.trim();
          tableData[cell.row.index][cell.column.id] = value;

          const errors = validateKPI(row.original, value, 'Denominator');
          setValidationErrors((prev) => ({
            ...prev,
            [row.original.id]: {
              ...prev[row.original.id],
              ...errors,
            },
          }));

          if (Object.keys(errors).length === 0) {
            delete validationErrors[row.original.id]?.Numerator;
            delete validationErrors[row.original.id]?.Denominator;
            setValidationErrors({ ...validationErrors });
            updateResults(row.original, tableData, cell);
          }
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
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
        row.original.KPI_Source == 'Automated' && {
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
      accessorKey: 'Calculation_Source',
      header: 'Calculation Source',
      size: 100,
      editVariant: 'select',
      enableEditing: isReview ? false : true,
      Cell: ({ row }) => <span>{row.original?.Calculation_Source}</span>,
      mantineEditSelectProps: ({ cell, row }) => ({
        data: [
          {
            value: 'PBI',
            label: 'PBI',
          },
          {
            value: 'GRM Dashboard',
            label: 'GRM Dashboard',
          },
          {
            value: 'Cognos',
            label: 'Cognos',
          },
          {
            value: 'SAP',
            label: 'SAP',
          },
          {
            value: 'Celonis',
            label: 'Celonis',
          },
          {
            value: 'Anaplan',
            label: 'Anaplan',
          },
          {
            value: 'Others',
            label: 'Others',
          },
        ],
        onChange: (value) => {
          return (tableData[cell.row.index][cell.column.id] = value);
        },
        value: row.original.Calculation_Source ? row.original.Calculation_Source : null,
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Actual_Source_Link',
      enableClickToCopy: true,
      header: 'Actual Source Link',
      size: 300,
      enableEditing: isReview ? false : true,
      Cell: ({ row }) => <span>{row.original.Actual_Source_Link}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: false,
        type: 'text',
        variant: 'filled',
        value: row.original.Actual_Source_Link,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;
        },
        onBlur: (event) => {
          const value = event.target.value.trim();
          tableData[cell.row.index][cell.column.id] = value;
          // setTableData([...tableData]);
        },
      }),
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Threshold_L1',
      // filterVariant: 'autocomplete',
      header: 'Threshold L1',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Threshold_L2',
      // filterVariant: 'autocomplete',
      header: 'Threshold L2',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Threshold_L3',
      // filterVariant: 'autocomplete',
      header: 'Threshold L3',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'L1_Result',
      //   filterVariant: 'autocomplete',
      header: 'L1 Result',
      size: 50,
      enableEditing: false,
      // Cell: ({ cell }) => <Badge_apply data={cell.getValue()} />,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L1_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
          },
        },
    },
    {
      accessorKey: 'L2_Result',
      //   filterVariant: 'autocomplete',
      header: 'L2 Result',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L2_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
          },
        },
    },
    {
      accessorKey: 'L3_Result',
      //   filterVariant: 'autocomplete',
      header: 'L3 Result',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L3_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'Load_Date',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Load Date',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
          // align: 'center',
          sx: {
            backgroundColor: '#1B1212',
            color: '#fff',
            // borderRight: '1px solid rgba(224,224,224,1)',
          },
        },
    },
    {
      accessorKey: 'KPI_Uploader',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Uploader',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        row.original.KPI_Source == 'Automated' && {
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
      {
        label: 'Zone',
        value: 'Zone',
      },
      {
        label: 'Month',
        value: 'Month',
      },
      {
        label: 'Year and Quarter',
        value: 'Year_and_Quarter',
      },
      {
        label: 'KPI ID',
        value: 'KPI_ID',
      },
      {
        label: 'KPI Name',
        value: 'KPI_Name',
      },
      {
        label: 'KPI Description',
        value: 'KPI_Description',
      },
      {
        label: 'KPI Type',
        value: 'KPI_Type',
      },
      {
        label: 'KPI Applicability Level',
        value: 'KPI_Applicability_Level',
      },
      {
        label: 'KPI Responsibility',
        value: 'KPI_Responsibility',
      },
      {
        label: 'Receiving Entity',
        value: 'Receiving_Entity',
      },
      {
        label: 'KPI Owner Email',
        value: 'KPI_Owner_Email',
      },
      {
        label: 'KPI Oversight Email',
        value: 'KPI_Oversight_Email',
      },
      {
        label: 'KPI Source',
        value: 'KPI_Source',
      },
      {
        label: 'Expected KPI Data Source',
        value: 'Expected_KPI_Source',
      },
      {
        label: 'KPI Frequency',
        value: 'KPI_Frequency',
      },
      {
        label: 'Control ID',
        value: 'Control_ID',
      },
      {
        label: 'Provider Org',
        value: 'Provider_Org',
      },
      {
        label: 'Positive Direction',
        value: 'Positive_Direction',
      },
      {
        label: 'Expected Numerator',
        value: 'Expected_Numerator',
      },
      {
        label: 'Expected Denominator',
        value: 'Expected_Denominator',
      },
      {
        label: 'Numerator Allowed',
        value: 'Numerator_Allowed',
      },
      {
        label: 'Numerator',
        value: 'Numerator',
      },
      {
        label: 'Denominator Allowed',
        value: 'Denominator_Allowed',
      },
      {
        label: 'Denominator',
        value: 'Denominator',
      },
      {
        label: 'KPI Value',
        value: 'KPI_Value',
      },
      {
        label: 'Calculation Source',
        value: 'Calculation_Source',
      },
      {
        label: 'Actual Source Link',
        value: 'Actual_Source_Link',
      },
      {
        label: 'Threshold L1',
        value: 'Threshold_L1',
      },
      {
        label: 'Threshold L2',
        value: 'Threshold_L2',
      },
      {
        label: 'Threshold L3',
        value: 'Threshold_L3',
      },
      {
        label: 'L1 Result',
        value: 'L1_Result',
      },
      {
        label: 'L2 Result',
        value: 'L2_Result',
      },
      {
        label: 'L3 Result',
        value: 'L3_Result',
      },
      {
        label: 'Load Date',
        value: 'Load_Date',
      },
      {
        label: 'KPI Uploader',
        value: 'KPI_Uploader',
      },
    ];

    exportToCsv('KPI_Module_Export.csv', tableData, fields);
  };

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
      const {
        id,
        'Denominator Allowed': Denominator_Allowed,
        'Numerator Allowed': Numerator_Allowed,
        Numerator,
        Denominator,
      } = row;

      // Function to check if the Numerator is valid based on the Numerator Allowed value
      const isNumeratorValid = (num) => {
        switch (Numerator_Allowed) {
          case 'Positive/Zero only':
            return num >= 0;
          case 'Negative/Zero only':
            return num <= 0;
          case 'Zero/One only':
            return num === 0 || num === 1;
          case 'Any value':
          default:
            return true;
        }
      };

      // Function to check if the Denominator is valid based on the Denominator Allowed value
      const isDenominatorValid = (den) => {
        switch (Denominator_Allowed) {
          case 'Positive only':
            return den > 0;
          case 'Negative only':
            return den < 0;
          case 'Positive/Zero only':
            return den >= 0;
          case 'Negative/Zero only':
            return den <= 0;
          case 'Zero/One only':
            return den === 0 || den === 1;
          case 'Any value':
          default:
            return true;
        }
      };

      if ((Numerator || Numerator === 0) && (Denominator || Denominator === 0)) {
        if (isNaN(Numerator) || isNaN(Denominator)) {
          isValid = false;
          toast.error(`Invalid KPI Numerator and Denominator at row ${index + 1}`);
        }
        // Check if Numerator and Denominator are valid based on their allowed values
        if (!isNumeratorValid(Numerator)) {
          isValid = false;
          toast.error(`Numerator must be ${Numerator_Allowed} at row ${index + 1}`);
        }

        if (!isDenominatorValid(Denominator)) {
          isValid = false;
          toast.error(`Denominator must be ${Denominator_Allowed} at row ${index + 1}`);
        }
      } else if (Numerator || Denominator) {
        isValid = false;
        toast.error(`Both Numerator and Denominator are required at row ${index + 1}`);
      }
    });

    return isValid;
  };

  const performCalculations = (data, tableData) => {
    // Predefined Calculation Source options with proper casing
    const Calculation_Source_options = {
      pbi: 'PBI',
      'grm dashboard': 'GRM Dashboard',
      cognos: 'Cognos',
      sap: 'SAP',
      celonis: 'Celonis',
      anaplan: 'Anaplan',
    };

    return data.map((row) => {
      const {
        id,
        Numerator,
        Denominator,
        'Calculation Source': Calculation_Source,
        'Actual Source Link': Actual_Source_Link,
      } = row;

      const tableRow = tableData.find((item) => item.id === id);

      if (tableRow) {
        const {
          KPI_Source,
          Threshold_L1,
          Threshold_L2,
          Threshold_L3,
          Positive_Direction,
          L1_Result,
          L2_Result,
          L3_Result,
        } = tableRow;

        // only update those row where expected source is manual
        if (KPI_Source === 'Manual' || KPI_Source === 'Semi - Automated') {
          let normalizedCalculationSource = Calculation_Source;

          // Normalize the Calculation_Source if it has a value
          if (Calculation_Source && Calculation_Source.trim() !== '') {
            const normalizedInput = Calculation_Source.trim().toLowerCase();
            normalizedCalculationSource = Calculation_Source_options[normalizedInput] || 'Others';
          }

          // Calculate KPI Value when Numerator and Denominator are provided and are valid numbers and finding the absolute value of the KPI Value
          // If the Denominator is 0, then the KPI Value is 0
          const KPI_Value =
            (Numerator || Numerator === 0) && (Denominator || Denominator === 0)
              ? Denominator === 0
                ? 0
                : Math.abs((+Numerator / +Denominator).toFixed(5))
              : '';

          const newResult_L1 = calculateResult(
            Numerator,
            Denominator,
            Threshold_L1,
            Positive_Direction,
            L1_Result,
          );
          const newResult_L2 = calculateResult(
            Numerator,
            Denominator,
            Threshold_L2,
            Positive_Direction,
            L2_Result,
          );
          const newResult_L3 = calculateResult(
            Numerator,
            Denominator,
            Threshold_L3,
            Positive_Direction,
            L3_Result,
          );

          return {
            ...tableRow,
            Numerator,
            Denominator,
            Calculation_Source: normalizedCalculationSource,
            Actual_Source_Link,
            KPI_Value,
            L1_Result: newResult_L1,
            L2_Result: newResult_L2,
            L3_Result: newResult_L3,
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

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section2KPI')} active>
        {get_historical_graph_data.loading || get_KPI_Section2_data.loading ? (
          <div>
            <div className="mt-8 mb-8 text-center">
              <Loader color="#e7c55d" />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 pt-5">
              {showGraph && (
                <>
                  {historicalGraphData && Object.keys(historicalGraphData)?.length > 0 ? (
                    <KIP_Graph_Section_2 isReview={isReview} isModal={isModal} />
                  ) : (
                    <div className="mt-5 text-center">
                      <h1 className="table-modal-title">
                        {t('selfAssessment.assessmentForm.section2NoKPIChartavailableText')}
                      </h1>
                    </div>
                  )}
                </>
              )}
            </div>
            {tableData?.length !== 0 ? (
              <div className="mt-5">
                <div className="kpi_table">
                  <MantineProvider
                    theme={{ colorScheme: 'dark' }}
                    withGlobalStyles
                    withNormalizeCSS
                  >
                    <MantineReactTable
                      columns={columnsNew}
                      data={tableData}
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
                        (row.original.KPI_Source == 'Manual' ||
                          row.original.KPI_Source === 'Semi - Automated') &&
                        row.original.Year_and_Quarter === currentYearAndQuarter
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
                        return (
                          <div>
                            <div style={{ padding: '16px', color: 'white', fontSize: '14px' }}>
                              <b>Note:</b> In case there have been no transactions for the specified
                              period for any KPI, please enter 0 as both the numerator and the
                              denominator. In case the values are not allowed, please reach out to
                              your Zone Internal Control.
                            </div>
                            <Flex p="md" justify="space-between" className="kpi_module_buttons">
                              <Flex align="center" gap="xs">
                                <button
                                  className="custom-btn mt-2 submit-btn"
                                  onClick={handleExport}
                                >
                                  {t('selfAssessment.assessmentForm.exportToExcel')}
                                </button>

                                <div className="mt-4">
                                  <label htmlFor="uploadfile" className="file-input">
                                    <input
                                      icon={FileUploadOutlinedIcon}
                                      type="file"
                                      accept="text/csv"
                                      placeholder="Name"
                                      id="uploadfile"
                                      onChange={handleFileUpload}
                                      //style={{ display: 'none' }}
                                    />
                                    {!isReview && (
                                      <div className="custom-btn choose-file">
                                        {<FileUploadOutlinedIcon />}
                                        {'Upload File'}
                                      </div>
                                    )}
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
              </div>
            ) : (
              <div className="text-center top-order">
                <h1 className="table-modal-title">
                  {t('selfAssessment.assessmentForm.section2NoKPIavailableText')}
                </h1>
              </div>
            )}{' '}
          </>
        )}
      </CollapseFrame>
    </div>
  );
};

export default ControlSection2;

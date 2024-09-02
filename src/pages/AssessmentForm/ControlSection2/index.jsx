import React, { useCallback, useEffect, useMemo, useState } from 'react';
//import axios from 'axios';
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

import Workbook from 'react-excel-workbook';
import readXlsxFile from 'read-excel-file';
import {
  kpiResultSelector,
  getResponseSelector,
  getLatestDraftSelector,
  get_historical_graph_dataSelector,
  get_KPI_Section2_dataSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Loader } from '@mantine/core';
import KIP_Graph_Section_2 from './KIP_Graph_Section_2';
import { convertVariable } from '../../../utils/helper';
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
  const [validationErrors, setValidationErrors] = useState({});
  const kpiResponseData = latestDraftData?.data?.Latest_response?.kpis
    ? latestDraftData?.data?.Latest_response?.kpis
    : get_KPI_Section2_data?.data;

  const currentYearAndQuarter = getCurrentYearAndQuarter();
  const dispatch = useDispatch();
  const get_historical_graph_data = useSelector(get_historical_graph_dataSelector);
  const historicalGraphData = get_historical_graph_data?.data || {};

  const headerCellStyle = {
    backgroundColor: '#d4d4d4',
    border: '2px solid gray',
    color: 'black',
  };

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
      table_data.forEach((tData, i) => {
        // tData['id'] = i + 1;
        tData['Upload_Approach'] = tData['Upload_Approach'] || '';
        tData['Source_System'] = tData['Source_System']?.trimStart() || '';
      });

      setTableData(table_data);
    }
  }, [kpiResultData, kpiResponseData]);

  const handleUpdateLevel = (data) => {
    const row = { ...data };

    row.KPI_Value = (+row.Numerator / +row.Denominator).toFixed(5);

    const isNumeratorValue = !!row?.Numerator || [0, '0'].includes(row?.Numerator);
    const isDenominatorValue = !!row?.Denominator || [0, '0'].includes(row?.Denominator);

    const isFillsNumeratorAndDenominatorValue = isNumeratorValue && isDenominatorValue;

    if (row.Positive_direction?.toLowerCase() === 'lower is better') {
      if (
        row.MICS_L1_Threshold === '-' ||
        row.MICS_L1_Threshold === '' ||
        row.MICS_L1_Threshold == null ||
        row.L1_Result == 'N/A'
      ) {
        row.L1_Result = 'N/A';
      } else {
        if (
          parseFloat(row.KPI_Value) <= parseFloat(row.MICS_L1_Threshold) &&
          row.MICS_L1_Threshold !== '' &&
          isFillsNumeratorAndDenominatorValue
        ) {
          row.L1_Result = 'Pass';
        } else {
          row.L1_Result = 'Fail';
        }
      }

      // store L2_Result when KPI value lessthen MICS L2 thresshold value then pass L2 result
      if (
        row.MICS_L2_Threshold === '-' ||
        row.MICS_L2_Threshold === '' ||
        row.MICS_L2_Threshold == null ||
        row.L2_Result == 'N/A'
      ) {
        row.L2_Result = 'N/A';
      } else if (
        parseFloat(row.KPI_Value) <= parseFloat(row.MICS_L2_Threshold) &&
        row.MICS_L2_Threshold !== '' &&
        isFillsNumeratorAndDenominatorValue
      ) {
        row.L2_Result = 'Pass';
      } else {
        row.L2_Result = 'Fail';
      }

      if (
        row.MICS_L3_Threshold === '-' ||
        row.MICS_L3_Threshold === '' ||
        row.MICS_L3_Threshold == null ||
        row.L3_Result == 'N/A'
      ) {
        row.L3_Result = 'N/A';
      } else {
        if (
          parseFloat(row.KPI_Value) <= parseFloat(row.MICS_L3_Threshold) &&
          isFillsNumeratorAndDenominatorValue
        ) {
          row.L3_Result = 'Pass';
        } else {
          row.L3_Result = 'Fail';
        }
      }
    } else if (row.Positive_direction?.toLowerCase() === 'higher is better') {
      if (
        row.MICS_L1_Threshold === '-' ||
        row.MICS_L1_Threshold === '' ||
        row.MICS_L1_Threshold === null ||
        row.L1_Result == 'N/A'
      ) {
        row.L1_Result = 'N/A';
      } else {
        if (
          parseFloat(row.KPI_Value) >= parseFloat(row.MICS_L1_Threshold) &&
          row.MICS_L1_Threshold !== '' &&
          isFillsNumeratorAndDenominatorValue
        ) {
          row.L1_Result = 'Pass';
        } else {
          row.L1_Result = 'Fail';
        }
      }

      if (
        row.MICS_L2_Threshold === '-' ||
        row.MICS_L2_Threshold === '' ||
        row.MICS_L2_Threshold === null ||
        row.L2_Result == 'N/A'
      ) {
        row.L2_Result = 'N/A';
      } else {
        if (
          parseFloat(row.KPI_Value) >= parseFloat(row.MICS_L2_Threshold) &&
          isFillsNumeratorAndDenominatorValue
        ) {
          row.L2_Result = 'Pass';
        } else {
          row.L2_Result = 'Fail';
        }
      }

      if (
        row.MICS_L3_Threshold === '-' ||
        row.MICS_L3_Threshold === '' ||
        row.MICS_L3_Threshold === null ||
        row.L3_Result == 'N/A'
      ) {
        row.L3_Result = 'N/A';
      } else {
        if (
          parseFloat(row.KPI_Value) >= parseFloat(row.MICS_L3_Threshold) &&
          isFillsNumeratorAndDenominatorValue
        ) {
          row.L3_Result = 'Pass';
        } else {
          row.L3_Result = 'Fail';
        }
      }
    }
    return row;
  };

  //Table on change function
  function handleChange(newInputValue, row, column) {
    setIsStartTableEdit(true);
    const newValue = newInputValue.trimStart();
    const updateProduct = tableData.map((d) => {
      // Check user change row id match or not
      if (d.id === row.id) {
        const copyRow = { ...JSON.parse(JSON.stringify(row)) };
        //If user Upload_Approach change value then update existing value
        if (column.dataField === 'Upload_Approach') {
          row['Upload_Approach'] = newValue;
        }
        //If user Denominator change value then update existing value
        if (column.dataField === 'Denominator') {
          if (newValue == 0) {
            row['Denominator'] = '';
          } else {
            row['Denominator'] = newValue;
          }
          row['Numerator'] = convertVariable(copyRow['Numerator']);
        }

        if (column.dataField === 'Source_System') {
          row['Source_System'] = newValue;
        }

        //If user Numerator change value then update existing value
        if (column.dataField === 'Numerator') {
          // TODO: @@@@ If 0 not allowed input then uncomment
          // if (newValue == 0) {
          //   row['Numerator'] = 0;
          // } else {
          row['Numerator'] = newValue;
          // }
          row['Denominator'] = convertVariable(copyRow['Denominator']);
        }

        return handleUpdateLevel(row);
      }
      return d;
    });
    setTableData(updateProduct);
    setTimeout(() => {
      document.activeElement.blur();
    }, 100);
  }

  // Code for validation and result calculation for Numerator and Denominator columns
  const validateKPI = (row, value, type) => {
    let errors = {};

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

    return errors;
  };

  // File upload logic
  // This function convert uploaded Excel file data read and view on table mode
  const handleFileUpload = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      readXlsxFile(selectedFile).then((data) => {
        const copyData = { ...data };
        const fileData = data.slice(1).map((d, dataIndex) => {
          let obj = { id: Date.now() + dataIndex };
          d.map((v, i) => {
            let key = copyData[0][i];
            if (copyData[0][i] === 'KPI Data source (Select from Excel/PBI/Celonis/Others)') {
              key = 'Upload_Approach';
            }
            if (copyData[0][i] === 'Link to data') {
              key = 'Source_System';
            }

            obj[key] = v;
          });

          return handleUpdateLevel(obj);
        });

        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
        myHeaders.append('Content-Type', 'application/json');

        var apiBody = {
          input_table: tableData,
          output_table: fileData,
        };

        const output_table_data = apiBody.output_table.map((d) => {
          const Denominator = d['Denominator'];
          if ([0, '0'].includes(Denominator)) {
            d['Denominator'] = '';
          } else {
            d['Denominator'] = Denominator ? +Denominator : '';
          }

          // TODO: @@@@ if Numerator accept 0 then add logic here...
          const Numerator = d['Numerator'];
          d['Numerator'] = !!Numerator || [0, '0'].includes(Numerator) ? Numerator.toString() : '';

          return {
            ...handleUpdateLevel(d),
            isManual: true,
            isEdited: true,
          };
        });

        dispatch(getCsvTampredDataAction({ ...apiBody, output_table: output_table_data }));
        setTableData(output_table_data);
      });
    }
  };

  const tableBodyCellStyle = {
    backgroundColor: '#1f2023',
    color: '#fff',
    border: '2px solid gray',
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
      Cell: ({ row }) => <span>{row.original.Numerator}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors[row.original.id]?.Numerator,
        helperText: validationErrors[row.original.id]?.Numerator,
        value: row.original.Numerator,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;
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
          }
          handleChange(value, row.original, { dataField: 'Numerator' });
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
      Cell: ({ row }) => <span>{row.original.Denominator}</span>,
      mantineEditTextInputProps: ({ cell, row }) => ({
        required: true,
        type: 'number',
        variant: 'filled',
        value: row.original.Denominator,
        onChange: (event) => {
          const value = event.target.value.trim();
          const updatedTableData = [...tableData]; // Assuming tableData is an array of objects

          // Update the value in the local tableData copy
          updatedTableData[cell.row.index][cell.column.id] = value;
        },
        error: validationErrors[row.original.id]?.Denominator,
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
          }
          handleChange(value, row.original, { dataField: 'Denominator' });
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

  const tableRecord = useMemo(() => {
    return tableData.map((d) => ({
      ...d,
      KPI_Source: 'Manual',
      Year_and_Quarter: currentYearAndQuarter,
    }));
  }, [tableData]);

  console.log('tableRecord', tableRecord);

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
            {tableRecord?.length !== 0 ? (
              <div className="mt-5">
                <div className="kpi_table">
                  <MantineProvider
                    theme={{ colorScheme: 'dark' }}
                    withGlobalStyles
                    withNormalizeCSS
                  >
                    <MantineReactTable
                      columns={columnsNew}
                      data={tableRecord}
                      enableColumnFilterModes={false}
                      enableFacetedValues={true}
                      enableGrouping={false}
                      enableRowSelection={false}
                      selectAllMode="all"
                      getRowId={(row) => row.id}
                      enableRowNumbers={true}
                      rowNumberMode={'original'}
                      enableStickyHeader={true}
                      editDisplayMode="table" // ('modal', 'row', 'cell', and 'custom' are also available)
                      enableEditing={(row) =>
                        row.original.KPI_Source == 'Manual' &&
                        row.original.Year_and_Quarter === currentYearAndQuarter
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
                        // const isDisabled = yearAndQuarter.toString() !== currentYearAndQuarter;

                        return (
                          <div>
                            <Flex p="md" justify="space-between" className="kpi_module_buttons">
                              <div>
                                <Flex align="center" gap="xs">
                                  <div className="row " id="export_button_right">
                                    <Workbook
                                      filename={`data-${controlId}.xlsx`}
                                      element={
                                        <button className="export_button">
                                          <strong>
                                            {t('selfAssessment.assessmentForm.exportToExcel')}
                                          </strong>
                                        </button>
                                      }
                                    >
                                      <Workbook.Sheet
                                        data={tableRecord.map((td) => ({
                                          ...td,
                                          Numerator: hasFailNumerator(td)
                                            ? ''
                                            : td.Numerator
                                            ? td.Numerator.toString()
                                            : '',
                                          Denominator: hasFailDenominator(td)
                                            ? ''
                                            : td.Denominator
                                            ? td.Denominator.toString()
                                            : '',
                                        }))}
                                        name="Sheet A"
                                      >
                                        <Workbook.Column label="id" value="id" />
                                        <Workbook.Column label="Zone" value="Zone" />
                                        <Workbook.Column label="Month" value="Month" />
                                        <Workbook.Column
                                          label="Year_and_Quarter"
                                          value="Year_and_Quarter"
                                        />
                                        <Workbook.Column label="KPI_ID" value="KPI_ID" />
                                        <Workbook.Column label="KPI_Name" value="KPI_Name" />
                                        <Workbook.Column
                                          label="KPI_Description"
                                          value="KPI_Description"
                                        />
                                        <Workbook.Column label="KPI_Type" value="KPI_Type" />
                                        <Workbook.Column
                                          label="KPI_Applicability_Level"
                                          value="KPI_Applicability_Level"
                                        />
                                        <Workbook.Column
                                          label="KPI_Responsibility"
                                          value="KPI_Responsibility"
                                        />
                                        <Workbook.Column
                                          label="Receiving_Entity"
                                          value="Receiving_Entity"
                                        />
                                        <Workbook.Column
                                          label="KPI_Owner_Email"
                                          value="KPI_Owner_Email"
                                        />
                                        <Workbook.Column
                                          label="KPI_Oversight_Email"
                                          value="KPI_Oversight_Email"
                                        />
                                        <Workbook.Column label="KPI_Source" value="KPI_Source" />
                                        <Workbook.Column
                                          label="Expected_KPI_Source"
                                          value="Expected_KPI_Source"
                                        />
                                        <Workbook.Column
                                          label="KPI_Frequency"
                                          value="KPI_Frequency"
                                        />
                                        <Workbook.Column label="Control_ID" value="Control_ID" />
                                        <Workbook.Column
                                          label="Provider_Org"
                                          value="Provider_Org"
                                        />
                                        <Workbook.Column
                                          label="Positive_Direction"
                                          value="Positive_Direction"
                                        />
                                        <Workbook.Column
                                          label="Expected_Numerator"
                                          value="Expected_Numerator"
                                        />
                                        <Workbook.Column
                                          label="Expected_Denominator"
                                          value="Expected_Denominator"
                                        />
                                        <Workbook.Column
                                          label="Numerator_Allowed"
                                          value="Numerator_Allowed"
                                        />
                                        <Workbook.Column
                                          label="Denominator_Allowed"
                                          value="Denominator_Allowed"
                                        />
                                        <Workbook.Column label="KPI_Value" value="KPI_Value" />
                                        <Workbook.Column
                                          label="Calculation_Source"
                                          value="Calculation_Source"
                                        />
                                        <Workbook.Column
                                          label="Actual_Source_Link"
                                          value="Actual_Source_Link"
                                        />
                                        <Workbook.Column
                                          label="Threshold_L1"
                                          value="Threshold_L1"
                                        />
                                        <Workbook.Column
                                          label="Threshold_L2"
                                          value="Threshold_L2"
                                        />
                                        <Workbook.Column
                                          label="Threshold_L3"
                                          value="Threshold_L3"
                                        />
                                        <Workbook.Column label="L1_Result" value="L1_Result" />
                                        <Workbook.Column label="L2_Result" value="L2_Result" />
                                        <Workbook.Column label="L3_Result" value="L3_Result" />
                                        <Workbook.Column label="Load_Date" value="Load_Date" />
                                        <Workbook.Column
                                          label="KPI_Uploader"
                                          value="KPI_Uploader"
                                        />
                                      </Workbook.Sheet>
                                    </Workbook>
                                  </div>

                                  <label htmlFor="uploadfile" className="file-input">
                                    <input
                                      icon={FileUploadOutlinedIcon}
                                      type="file"
                                      // accept="text/csv"
                                      placeholder="Name"
                                      id="uploadfile"
                                      onChange={handleFileUpload}
                                      //style={{ display: 'none' }}
                                      // disabled={isDisabled}
                                    />
                                    <div className="custom-btn choose-file">
                                      {<FileUploadOutlinedIcon />}
                                      Upload file
                                    </div>
                                  </label>
                                </Flex>
                                <div style={{ textDecoration: 'underline' }}>
                                  NOTE: Kindly enter both numerator and denominator, partial
                                  information will result in the failure of KPIs
                                </div>
                              </div>
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

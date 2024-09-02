import React, { useCallback, useEffect, useMemo, useState } from 'react';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
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
  const kpiResponseData =
    latestDraftData?.data?.Latest_response?.kpis &&
    latestDraftData?.data?.Latest_response?.kpis.length > 0
      ? latestDraftData?.data?.Latest_response?.kpis
      : get_KPI_Section2_data?.data;

  const currentYearAndQuarter = getCurrentYearAndQuarter();
  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const dispatch = useDispatch();
  const get_historical_graph_data = useSelector(get_historical_graph_dataSelector);
  const historicalGraphData = get_historical_graph_data?.data || {};
  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);
  useEffect(() => {
    tableData.map((data, i) => {
      handleChange('', '', data, i);
    });
  }, [csvUpdateData, tableData.length]);

  const headerCellStyle = {
    backgroundColor: '#d4d4d4',
    border: '2px solid gray',
    color: 'black',
  };

  //All fixed table schema
  const columns = [
    {
      dataField: 'id',
      text: 'id',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'sep',
      text: 'sep',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Global_KPI_Code',
      text: 'Global_KPI_Code',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
      // filter: textFilter(),
    },
    {
      dataField: 'Applicability',
      text: 'Applicability',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
      // filter: textFilter(),
    },
    {
      dataField: 'MICS_Code',
      text: 'MICS_Code',
      editable: false,
      headerStyle: {
        ...headerStyles,
        width: '1000px',
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'MICS_L1_Threshold',
      text: 'MICS_L1_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'MICS_L2_Threshold',
      text: 'MICS_L2_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'MICS_L3_Threshold',
      text: 'MICS_L3_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },

    {
      dataField: 'Positive_direction',
      text: 'Positive_direction',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Entity_ID',
      text: 'Entity_ID',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'isManual',
      formatter: (cellContent, row) => (row?.isManual ? 'Manual' : 'Automated'),
      text: 'KPI Type',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Period_From',
      text: 'Period_From',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Period_To',
      text: 'Period_To',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Expected_Numerator',
      text: 'Expected_Numerator',
      headerStyle: {
        ...headerStyles,
      },
      editable: false,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Numerator',
      text: 'Numerator',
      headerStyle: {
        ...headerStyles,
      },
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      editor: { type: 'number' },
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isManual) {
          return {
            backgroundColor: 'white',
            border: '2px solid gold',
            color: 'black',
          };
        } else {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
      formatter: (cellContent, row) => {
        if (row.isEdited) {
          if (hasFailNumerator(row)) {
            return (
              <div>
                {row?.Numerator}
                <div className="alert alert-danger in" role="alert">
                  <strong>Numerator is required when Denominator is filled</strong>
                </div>
              </div>
            );
          }
        }
        // if (row?.Numerator == 0) {
        //   return (
        //     <div>
        //       {row?.Numerator}
        //       <div className="alert alert-danger in" role="alert">
        //         <strong>Numerator can be positive values only</strong>
        //       </div>
        //     </div>
        //   );
        // }
        return cellContent ? cellContent : '';
      },
      validator: (newValue, row, column) => {
        row.isEdited = true;
        if (isNaN(newValue)) {
          row.Numerator = '';
          return {
            valid: false,
            message: 'Numerator can be a number only',
          };
        }
        // TODO: @@@@ If user only positive number then uncomment code
        // if (row.Numerator <= 0) {
        //   handleChange(row.Numerator, newValue, row, column);
        //   return {
        //     valid: false,
        //     message: 'Denominator is required when Numerator is filled',
        //   };
        // }
      },
    },
    {
      dataField: 'Expected_Denominator',
      text: 'Expected_Denominator',
      headerStyle: {
        ...headerStyles,
      },
      editable: false,
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Denominator',
      text: 'Denominator',
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      editor: { type: 'number' },
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => {
        if (row.isEdited) {
          if (hasFailDenominator(row)) {
            return (
              <div>
                {row?.Denominator}
                <div className="alert alert-danger in" role="alert">
                  <strong>Denominator is required when Numerator is filled</strong>
                </div>
              </div>
            );
          }
          // TODO: @@@@ If user only positive number then uncomment code
          // if (row?.Denominator < 0) {
          //   return (
          //     <div>
          //       {row?.Denominator}
          //       <div className="alert alert-danger in" role="alert">
          //         <strong>Denominator cannot be zero</strong>
          //       </div>
          //     </div>
          //   );
          // }
        }

        return cellContent ? cellContent : '';
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isManual) {
          return {
            backgroundColor: 'white',
            border: '2px solid gold',
            color: 'black',
          };
        } else {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
      validator: (newValue, row, column) => {
        row.isEdited = true;

        return true;
      },
    },
    {
      dataField: 'KPI_Value',
      text: 'KPI_Value',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => {
        return (
          <div style={{ color: '#000' }}>
            {hasFailNumerator(row) || hasFailDenominator(row) ? '' : row.KPI_Value}
          </div>
        );
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
        if (!row?.Numerator || !row?.Denominator) {
          return {
            backgroundColor: 'white',
            // color: 'white',
          };
        }
      },
    },
    {
      dataField: 'Upload_Approach',
      text: 'KPI Data source (Excel/PBI/Celonis/Others)',
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      headerStyle: {
        ...headerStyles,
      },
      editor: {
        type: Type.SELECT,
        options: [
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
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isManual) {
          return {
            backgroundColor: 'white',
            border: '2px solid gold',
            color: 'black',
          };
        } else {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Source_System',
      text: 'Source of Data - Link',
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      formatter: (cell, row) => {
        if (typeof cell === 'string') {
          return cell.trimStart(); // Trim leading spaces from string
        }
        return cell;
      },
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isManual) {
          return {
            backgroundColor: 'white',
            border: '2px solid gold',
            color: 'black',
          };
        } else {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'Month',
      text: 'Month',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'L1_Result',
      text: 'L1_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'L2_Result',
      text: 'L2_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
    {
      dataField: 'L3_Result',
      text: 'L3_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => {
        return cellContent;
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.isManual) {
          return {
            backgroundColor: '#d4d4d4',
            border: '2px solid gray',
            color: 'black',
          };
        }
      },
    },
  ];

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.L3_Result === 'Fail' || row.L3_Result === 'Fail' || row.L3_Result === 'Fail') {
      style.backgroundColor = '#f8dbe0';
      style.color = '#000';
    }
    return style;
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
        if (tData.KPI_Value === '' || tData.KPI_Value === 0) {
          tData['sep'] = 2;
        } else {
          tData['sep'] = 1;
        }
        tData['id'] = i + 1;
        tData['Upload_Approach'] = tData['Upload_Approach'] || '';
        tData['Source_System'] = tData['Source_System']?.trimStart() || '';
        let period = tData.Period_From;
        let words = period.split('-');
        const month = parseInt(words[1]);
        const d = new Date();
        d.setMonth(month - 1);
        tData['Month'] = moment(period, 'YYYY-MM-DD').format('MMMM');
        tData['Type_of_KPI'] = tData.isManual ? 'Manual' : 'Automated';
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
  function handleChange(oldValue, newInputValue, row, column) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      document.getElementById('combine_btn').reset();

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
      myHeaders.append('Content-Type', 'application/json');

      var apiBody = {
        input_table: tableData,
        output_table: excelFile,
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

      if (stateCsvTampred?.data === false) {
      } else {
        setScvUpdateData(0);
      }
    } else {
      setTableData(null);
    }
  };

  // File upload logic
  // This function convert uploaded Excel file data read and view on table mode
  const handleFile = (e) => {
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

        setExcelFile(fileData);
      });
    } else {
      setExcelFile(null);
    }
  };

  const setStringValue = (value) => {
    if ([0, '0'].includes(value)) {
      return '0';
    }
    if (!value) return '';
    return value.toString();
  };

  const tableBodyCellStyle = {
    backgroundColor: '#1f2023',
    color: '#fff',
    border: '2px solid gray',
  };

  const columnsNew = [
    {
      accessorKey: 'KPI_ID',
      enableClickToCopy: true,
      header: 'KPI_ID',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          // align: 'center',
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'KPI_Applicability_Level',
      enableClickToCopy: true,
      header: 'KPI_Applicability_Level',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'Positive_direction',
      enableClickToCopy: true,
      header: 'Positive_direction',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'Expected_Numerator',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected_Numerator',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
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
        // error: validationErrors[row.original.id]?.Numerator,
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

          // const errors = validateKPI(row.original, value, 'Numerator');
          // setValidationErrors((prev) => ({
          //   ...prev,
          //   [row.original.id]: {
          //     ...prev[row.original.id],
          //     ...errors,
          //   },
          // }));

          // if (Object.keys(errors).length === 0) {
          //   delete validationErrors[row.original.id]?.Numerator;
          //   delete validationErrors[row.original.id]?.Denominator;
          //   setValidationErrors({ ...validationErrors });
          //   updateResults(row.original, tableData, cell);
          // }
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
      accessorKey: 'Expected_Denominator',
      enableClickToCopy: true,
      //filterVariant: 'multi-select',
      header: 'Expected_Denominator',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
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

          // // Update results based on the row
          // updateResults(row.original, updatedTableData, cell);
        },
        //helperText: validationErrors[row.original.id]?.Denominator,
        onBlur: (event) => {
          //const value = parseFloat(event.target.value.trim());
          const value = event.target.value.trim();
          tableData[cell.row.index][cell.column.id] = value;
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
      header: 'KPI_Value',
      size: 150,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'KPI_Uploader',
      enableClickToCopy: true,
      header: 'KPI Data source (Excel/PBI/Celonis/Others)',
      size: 200,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'KPI_Source',
      enableClickToCopy: true,
      header: 'Source of Data - Link',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'Month',
      enableClickToCopy: true,
      header: 'Month',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'L1_Result',
      header: 'L1_Result',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L1_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'L2_Result',
      //   filterVariant: 'autocomplete',
      header: 'L2_Result',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L2_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
    {
      accessorKey: 'L3_Result',
      //   filterVariant: 'autocomplete',
      header: 'L3_Result',
      size: 50,
      enableEditing: false,
      Cell: ({ row }) => {
        return <Badge_apply data={row.original.L3_Result} />;
      },
      mantineTableBodyCellProps: ({ row }) =>
        !row.original.isManual && {
          sx: {
            ...tableBodyCellStyle,
          },
        },
    },
  ];

  const tableRecord = useMemo(() => {
    return tableData;
  }, [tableData]);

  console.log('tableRecord', tableRecord);

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section2KPI')} active>
        {get_historical_graph_data.loading ? (
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
                {/*<div id="my_btns">*/}
                {/*  <div className="d-flex align-items-center">*/}
                {/*    <div className="row " id="export_button_right">*/}
                {/*      <Workbook*/}
                {/*        filename={`data-${controlId}.xlsx`}*/}
                {/*        element={*/}
                {/*          <button className="export_button">*/}
                {/*            <strong>{t('selfAssessment.assessmentForm.exportToExcel')}</strong>*/}
                {/*          </button>*/}
                {/*        }*/}
                {/*      >*/}
                {/*        <Workbook.Sheet*/}
                {/*          data={tableData.map((td) => ({*/}
                {/*            ...td,*/}
                {/*            Numerator: hasFailNumerator(td)*/}
                {/*              ? ''*/}
                {/*              : td.Numerator*/}
                {/*              ? td.Numerator.toString()*/}
                {/*              : '',*/}
                {/*            Denominator: hasFailDenominator(td)*/}
                {/*              ? ''*/}
                {/*              : td.Denominator*/}
                {/*              ? td.Denominator.toString()*/}
                {/*              : '',*/}
                {/*          }))}*/}
                {/*          name="Sheet A"*/}
                {/*        >*/}
                {/*          <Workbook.Column label="sep" value="sep" />*/}
                {/*          <Workbook.Column label="Global_KPI_Code" value="Global_KPI_Code" />*/}
                {/*          <Workbook.Column label="Applicability" value="Applicability" />*/}
                {/*          <Workbook.Column label="Calculation_Source" value="Calculation_Source" />*/}
                {/*          <Workbook.Column label="Entity_ID" value="Entity_ID" />*/}
                {/*          <Workbook.Column label="KPI_ID" value="KPI_ID" />*/}
                {/*          <Workbook.Column label="Entity_Type" value="Entity_Type" />*/}
                {/*          <Workbook.Column label="KPI Type" value="isManual" />*/}
                {/*          <Workbook.Column label="Expected_Numerator" value="Expected_Numerator" />*/}
                {/*          <Workbook.Column label="Numerator" value="Numerator" />*/}
                {/*          <Workbook.Column*/}
                {/*            label="Expected_Denominator"*/}
                {/*            value="Expected_Denominator"*/}
                {/*          />*/}
                {/*          <Workbook.Column label="Denominator" value="Denominator" />*/}
                {/*          <Workbook.Column label="Type_of_KPI" value="Type_of_KPI" />*/}
                {/*          <Workbook.Column label="KPI_Value" value="KPI_Value" />*/}
                {/*          <Workbook.Column label="Month" value="Month" />*/}
                {/*          <Workbook.Column label="MICS_Code" value="MICS_Code" />*/}
                {/*          <Workbook.Column label="Period_From" value="Period_From" />*/}
                {/*          <Workbook.Column label="Period_To" value="Period_To" />*/}
                {/*          <Workbook.Column label="Positive_direction" value="Positive_direction" />*/}
                {/*          <Workbook.Column label="Source_Details" value="Source_Details" />*/}
                {/*          <Workbook.Column*/}
                {/*            label="Uploader_DataProvider"*/}
                {/*            value="Uploader_DataProvider"*/}
                {/*          />*/}
                {/*          <Workbook.Column*/}
                {/*            label="KPI Data source (Select from Excel/PBI/Celonis/Others)"*/}
                {/*            value="Upload_Approach"*/}
                {/*          />*/}
                {/*          <Workbook.Column label="Link to data" value="Source_System" />*/}
                {/*          <Workbook.Column label="MICS_L1_Threshold" value="MICS_L1_Threshold" />*/}
                {/*          <Workbook.Column label="MICS_L2_Threshold" value="MICS_L2_Threshold" />*/}
                {/*          <Workbook.Column label="MICS_L3_Threshold" value="MICS_L3_Threshold" />*/}
                {/*          <Workbook.Column label="L1_Result" value="L1_Result" />*/}
                {/*          <Workbook.Column label="L2_Result" value="L2_Result" />*/}
                {/*          <Workbook.Column label="L3_Result" value="L3_Result" />*/}
                {/*        </Workbook.Sheet>*/}
                {/*      </Workbook>*/}
                {/*    </div>*/}
                {/*    <button className="export_button" onClick={() => setShowGraph(!showGraph)}>*/}
                {/*      <strong> KPI Statistics</strong>*/}
                {/*    </button>*/}
                {/*  </div>*/}
                {/*  {!isModal && (*/}
                {/*    <form onSubmit={handleSubmit} id="combine_btn">*/}
                {/*      <div className="d-flex align-items-center">*/}
                {/*        <div className="mr-2">*/}
                {/*          <label htmlFor="uploadfile" className="file-input-wrapper">*/}
                {/*            <input*/}
                {/*              type="file"*/}
                {/*              placeholder="Name"*/}
                {/*              id="uploadfile"*/}
                {/*              onChange={handleFile}*/}
                {/*            />*/}
                {/*          </label>*/}
                {/*        </div>*/}

                {/*        <button*/}
                {/*          type="submit"*/}
                {/*          className="submit_btn black-text"*/}
                {/*          disabled={!excelFile}*/}
                {/*        >*/}
                {/*          <strong>*/}
                {/*            {t('selfAssessment.assessmentForm.section2UploadExcelBtn')}*/}
                {/*          </strong>*/}
                {/*        </button>*/}
                {/*      </div>*/}
                {/*    </form>*/}
                {/*  )}*/}
                {/*</div>*/}

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
                                        <Workbook.Column label="sep" value="sep" />
                                        <Workbook.Column
                                          label="Global_KPI_Code"
                                          value="Global_KPI_Code"
                                        />
                                        <Workbook.Column
                                          label="Applicability"
                                          value="Applicability"
                                        />
                                        <Workbook.Column
                                          label="Calculation_Source"
                                          value="Calculation_Source"
                                        />
                                        <Workbook.Column label="Entity_ID" value="Entity_ID" />
                                        <Workbook.Column label="KPI_ID" value="KPI_ID" />
                                        <Workbook.Column label="Entity_Type" value="Entity_Type" />
                                        <Workbook.Column label="KPI Type" value="isManual" />
                                        <Workbook.Column
                                          label="Expected_Numerator"
                                          value="Expected_Numerator"
                                        />
                                        <Workbook.Column label="Numerator" value="Numerator" />
                                        <Workbook.Column
                                          label="Expected_Denominator"
                                          value="Expected_Denominator"
                                        />
                                        <Workbook.Column label="Denominator" value="Denominator" />
                                        <Workbook.Column label="Type_of_KPI" value="Type_of_KPI" />
                                        <Workbook.Column label="KPI_Value" value="KPI_Value" />
                                        <Workbook.Column label="Month" value="Month" />
                                        <Workbook.Column label="MICS_Code" value="MICS_Code" />
                                        <Workbook.Column label="Period_From" value="Period_From" />
                                        <Workbook.Column label="Period_To" value="Period_To" />
                                        <Workbook.Column
                                          label="Positive_direction"
                                          value="Positive_direction"
                                        />
                                        <Workbook.Column
                                          label="Source_Details"
                                          value="Source_Details"
                                        />
                                        <Workbook.Column
                                          label="Uploader_DataProvider"
                                          value="Uploader_DataProvider"
                                        />
                                        <Workbook.Column
                                          label="KPI Data source (Select from Excel/PBI/Celonis/Others)"
                                          value="Upload_Approach"
                                        />
                                        <Workbook.Column
                                          label="Link to data"
                                          value="Source_System"
                                        />
                                        <Workbook.Column
                                          label="MICS_L1_Threshold"
                                          value="MICS_L1_Threshold"
                                        />
                                        <Workbook.Column
                                          label="MICS_L2_Threshold"
                                          value="MICS_L2_Threshold"
                                        />
                                        <Workbook.Column
                                          label="MICS_L3_Threshold"
                                          value="MICS_L3_Threshold"
                                        />
                                        <Workbook.Column label="L1_Result" value="L1_Result" />
                                        <Workbook.Column label="L2_Result" value="L2_Result" />
                                        <Workbook.Column label="L3_Result" value="L3_Result" />
                                      </Workbook.Sheet>
                                    </Workbook>
                                  </div>

                                  <label htmlFor="uploadfile" className="file-input">
                                    <input
                                      icon={FileUploadOutlinedIcon}
                                      type="file"
                                      accept="text/csv"
                                      placeholder="Name"
                                      id="uploadfile"
                                      // onChange={handleFileUpload}
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

                {/*<div*/}
                {/*  className={`renderBlockWrapper section2-table ${*/}
                {/*    isModal ? 'section2-table-ismodal' : 'section2-table-notmodal'*/}
                {/*  }`}*/}
                {/*>*/}
                {/*  <BootstrapTable*/}
                {/*    keyField="id"*/}
                {/*    // cellEdit={ cellEditProp }*/}
                {/*    data={tableData.map((td) => ({*/}
                {/*      ...td,*/}
                {/*      Numerator: hasFailNumerator(td) ? '' : setStringValue(td.Numerator),*/}
                {/*      Denominator: hasFailDenominator(td) ? '' : setStringValue(td.Denominator),*/}
                {/*    }))}*/}
                {/*    columns={columns}*/}
                {/*    filter={filterFactory()}*/}
                {/*    pagination={paginationFactory()}*/}
                {/*    className="container pagination"*/}
                {/*    responsive*/}
                {/*    rowStyle={rowStyle2}*/}
                {/*    cellEdit={cellEditFactory({*/}
                {/*      autoSelectText: true,*/}
                {/*      autoFocus: true,*/}
                {/*      mode: 'click',*/}
                {/*      blurToSave: true,*/}
                {/*      afterSaveCell: handleChange,*/}
                {/*    })}*/}
                {/*  />*/}
                {/*</div>*/}
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

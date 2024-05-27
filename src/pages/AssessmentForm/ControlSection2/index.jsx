import React, { useCallback, useEffect, useMemo, useState } from 'react';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2';

import Workbook from 'react-excel-workbook';
import readXlsxFile from 'read-excel-file';
import {
  kpiResultSelector,
  getResponseSelector,
  getLatestDraftSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Loader } from '@mantine/core';
import KIP_Graph_Section_2 from './KIP_Graph_Section_2';
import { convertVariable } from '../../../utils/helper';

//const headerStyles = { color: '#000', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.1)' };
const ControlSection2 = ({ tableData = [], setTableData, controlId, isModal, isReview }) => {
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
  const latestDraftData = useSelector(getLatestDraftSelector);
  const kpiResult =
    isModal || isReview
      ? getKPIResponse?.data?.Latest_Response?.data
      : kpiResultData?.data?.data || getKPIResponse?.data?.Latest_Response?.data;
  const kpiResponseData = latestDraftData?.data?.Latest_response?.kpis || kpiResultData?.data?.kpis;
  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const dispatch = useDispatch();

  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);
  useEffect(() => {
    tableData.map((data, i) => {
      handleChange('', '', data, i);
    });
  }, [csvUpdateData, tableData.length]);

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
      formatter: (cellContent, row) => {
        if (!row?.Numerator && row?.Denominator) {
          return (
            <div>
              {row?.Numerator}
              <div className="alert alert-danger in" role="alert">
                <strong>Numerator is required when Denominator is filled</strong>
              </div>
            </div>
          );
        }
        if (row?.Numerator < 0) {
          return (
            <div>
              {row?.Numerator}
              <div className="alert alert-danger in" role="alert">
                <strong>Numerator can be positive values only</strong>
              </div>
            </div>
          );
        }
        return cellContent;
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
      // validator: (newValue, row, column) => {
      //   if (isNaN(newValue) || newValue < 0) {
      //     row.Numerator = '';
      //     return {
      //       valid: false,
      //       message: 'Numerator cannot be negative values only',
      //     };
      //   }
      //   if (+row.Denominator < 0 || !row.Denominator) {
      //     handleChange(row.Numerator, newValue, row, column);
      //     return {
      //       valid: false,
      //       message: 'Denominator is required when Numerator is filled',
      //     };
      //   }
      // },
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
      // ddasd
      dataField: 'Denominator',
      text: 'Denominator',
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      editor: { type: 'number' },
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => {
        if (!row?.Denominator && row?.Numerator) {
          return (
            <div>
              {row?.Denominator}
              <div className="alert alert-danger in" role="alert">
                <strong>Denominator is required when Numerator is filled</strong>
              </div>
            </div>
          );
        }
        if (row?.Denominator && row?.Denominator <= 0) {
          return (
            <div>
              {row?.Denominator}
              <div className="alert alert-danger in" role="alert">
                <strong>Denominator can be positive values only</strong>
              </div>
            </div>
          );
        }

        return cellContent;
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

      // validator: (newValue, row, column) => {
      //   if (isNaN(newValue) || newValue <= 0) {
      //     row.Denominator = '';
      //     return {
      //       valid: false,
      //       message: 'Denominator can be positive values only',
      //     };
      //   }
      //   if (+row.Numerator < 0 || !row.Numerator) {
      //     handleChange(row.Denominator, newValue, row, column);
      //     return {
      //       valid: false,
      //       message: 'Numerator is required when Denominator is filled',
      //     };
      //   }
      // },
    },
    {
      dataField: 'KPI_Value',
      text: 'KPI_Value',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => (!row?.Numerator || !row?.Denominator ? '' : row.KPI_Value),
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
            color: 'white',
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
    if (isModal || isReview) {
      //Check is user only preview mode then api data store in table view
      if (getKPIResponse?.data?.Latest_Response?.kpis) {
        setTableData(getKPIResponse?.data?.Latest_Response?.kpis);
      }
    } else if (kpiResponseData?.length > 0) {
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
  }, [kpiResultData]);

  //Table on change function
  function handleChange(oldValue, newInputValue, row, column) {
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
          if (newValue < 1) {
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
          if (newValue < 0) {
            row['Numerator'] = '';
          } else {
            row['Numerator'] = newValue;
          }
          row['Denominator'] = convertVariable(copyRow['Denominator']);
        }

        row.KPI_Value = (+row?.Numerator / +row?.Denominator).toFixed(5);
        //If user Lower is better change value then update existing value
        if (row.Positive_direction.toLowerCase() === 'lower is better') {
          if (
            row.MICS_L1_Threshold === '-' ||
            row.MICS_L1_Threshold === '' ||
            row.MICS_L1_Threshold == null ||
            row.L1_Result == 'N/A'
          ) {
            row.L1_Result = 'N/A';
          } else {
            if (+row.KPI_Value <= +row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
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
          } else if (+row.KPI_Value <= +row.MICS_L2_Threshold && row.MICS_L2_Threshold !== '') {
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
            if (+row.KPI_Value <= +row.MICS_L3_Threshold) {
              row.L3_Result = 'Pass';
            } else {
              row.L3_Result = 'Fail';
            }
          }
        } else if (row.Positive_direction.toLowerCase() === 'higher is better') {
          if (
            row.MICS_L1_Threshold === '-' ||
            row.MICS_L1_Threshold === '' ||
            row.MICS_L1_Threshold === null ||
            row.L1_Result == 'N/A'
          ) {
            row.L1_Result = 'N/A';
          } else {
            if (+row.KPI_Value >= +row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
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
            if (+row.KPI_Value >= +row.MICS_L2_Threshold) {
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
            if (+row.KPI_Value >= +row.MICS_L3_Threshold) {
              row.L3_Result = 'Pass';
            } else {
              row.L3_Result = 'Fail';
            }
          }
        }

        return row;
      }
      return d;
    });

    setTableData(updateProduct);
    setTimeout(() => {
      document.activeElement.blur();
    }, 100);
  }

  useEffect(() => {
    if (stateCsvTampred?.data === false && !stateCsvTampred.loading) {
      const isupated = excelFile?.find((i) => i?.Denominator == 0);
      if (isupated) return Swal.fire('Oops...', 'Denominator cannot be Zero !!', 'error');
      let newDataArray = tableData?.map((data, i) => {
        const Numerator =
          excelFile[i]?.Numerator && excelFile[i]?.Denominator > 0
            ? excelFile[i]?.Numerator
            : data?.Numerator;
        const Denominator =
          excelFile[i]?.Numerator && excelFile[i]?.Denominator > 0
            ? excelFile[i]?.Denominator
            : data?.Denominator || '';
        return {
          ...data,
          Numerator,
          Denominator,
          Upload_Approach: excelFile[i]['KPI Data source (Select from Excel/PBI/Celonis/Others)'],
          Source_System: excelFile[i]['Link to data'],
        };
      });

      setTableData([...newDataArray]);
      setScvUpdateData(csvUpdateData + 1);
    } else {
      setScvUpdateData(0);
    }
  }, [stateCsvTampred.loading, stateCsvTampred.data]);

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

      dispatch(getCsvTampredDataAction(apiBody));
      if (stateCsvTampred?.data === false) {
        // let newDataArray = tableData?.map((data, i) => {
        //   return {
        //     ...data,
        //     Numerator: excelFile[i]?.Numerator,
        //     Denominator: excelFile[i]?.Denominator,
        //     Upload_Approach: excelFile[i]['KPI Data source (Select from Excel/PBI/Celonis/Others)'],
        //     Source_System: excelFile[i]['Link to data'],
        //   };
        // });
        // console.log(newDataArray, 'newDataArray');
        // setTableData([...newDataArray]);
        // setScvUpdateData(csvUpdateData + 1);
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
      if (selectedFile) {
        readXlsxFile(selectedFile).then((data) => {
          setExcelFile(
            data.slice(1).map((d) => {
              let obj = {};
              d.map((v, i) => {
                obj[data[0][i]] = v;
              });
              return obj;
            }),
          );
        });
      } else {
        setExcelFile(null);
      }
    } else {
      // console.log('plz select your file');
    }
  };

  console.log('tableDatatableData', tableData);

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section2KPI')} active>
        {kpiResultData.loading ? (
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
                  {kpiResult && Object.keys(kpiResult)?.length > 0 ? (
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
                <div id="my_btns">
                  <div className="d-flex align-items-center">
                    <div className="row " id="export_button_right">
                      <Workbook
                        filename={`data-${controlId}.xlsx`}
                        element={
                          <button className="export_button">
                            <strong>{t('selfAssessment.assessmentForm.exportToExcel')}</strong>
                          </button>
                        }
                      >
                        <Workbook.Sheet data={tableData} name="Sheet A">
                          {/* <Workbook.Column label="sep" value="sep" /> */}
                          <Workbook.Column label="Global_KPI_Code" value="Global_KPI_Code" />
                          <Workbook.Column label="Applicability" value="Applicability" />
                          <Workbook.Column label="Entity_ID" value="Entity_ID" />
                          {/* <Workbook.Column label="KPI Type" value="isManual" /> */}
                          <Workbook.Column label="Expected_Numerator" value="Expected_Numerator" />
                          <Workbook.Column label="Numerator" value="Numerator" />
                          <Workbook.Column
                            label="Expected_Denominator"
                            value="Expected_Denominator"
                          />
                          <Workbook.Column label="Denominator" value="Denominator" />
                          <Workbook.Column label="Type_of_KPI" value="Type_of_KPI" />
                          {/* <Workbook.Column label="KPI_Value" value="KPI_Value" /> */}
                          <Workbook.Column label="Month" value="Month" />
                          <Workbook.Column
                            label="KPI Data source (Select from Excel/PBI/Celonis/Others)"
                            value="Upload_Approach"
                          />
                          <Workbook.Column label="Link to data" value="Source_System" />
                          <Workbook.Column label="L1_Result" value="L1_Result" />
                          <Workbook.Column label="L2_Result" value="L2_Result" />
                          <Workbook.Column label="L3_Result" value="L3_Result" />
                        </Workbook.Sheet>
                      </Workbook>
                    </div>
                    <button className="export_button" onClick={() => setShowGraph(!showGraph)}>
                      <strong> KPI Statistics</strong>
                    </button>
                  </div>
                  {!isModal && (
                    <form onSubmit={handleSubmit} id="combine_btn">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">
                          <label htmlFor="uploadfile" className="file-input-wrapper">
                            <input
                              type="file"
                              placeholder="Name"
                              id="uploadfile"
                              onChange={handleFile}
                            />
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="submit_btn black-text"
                          disabled={!excelFile}
                        >
                          <strong>
                            {t('selfAssessment.assessmentForm.section2UploadExcelBtn')}
                          </strong>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                <div style={{ textDecoration: 'underline' }}>
                  NOTE: Kindly enter both numerator and denominator, partial information will result
                  in the failure of KPIs
                </div>
                <div
                  className={`renderBlockWrapper section2-table ${
                    isModal ? 'section2-table-ismodal' : 'section2-table-notmodal'
                  }`}
                >
                  <BootstrapTable
                    keyField="id"
                    // cellEdit={ cellEditProp }
                    data={tableData}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                    className="container pagination"
                    responsive
                    rowStyle={rowStyle2}
                    cellEdit={cellEditFactory({
                      autoSelectText: true,
                      autoFocus: true,
                      mode: 'click',
                      blurToSave: true,
                      afterSaveCell: handleChange,
                    })}
                  />
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

import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Workbook from 'react-excel-workbook';
import readXlsxFile from 'read-excel-file';
import {
  kpiResultSelector,
  getResponseSelector,
  getLatestDraftSelector,
} from '../../../../../redux/Assessments/AssessmentSelectors';
import { getCsvTampredDataAction } from '../../../../../redux/CsvTampred/CsvTampredAction';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import ControlSection2Chart from './ControlSection2Chart';
import { Loader } from '@mantine/core';
import KIP_Graph_Section_2 from './KIP_Graph_Section_2';

//const headerStyles = { color: '#000', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.1)' };
const ControlSection2 = ({ tableData, setTableData, controlId, isModal, isReview }) => {
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

  console.log('@@@@@: kpiResult', kpiResult);
  const kpiResponseData = latestDraftData?.data?.Latest_response?.kpis || kpiResultData?.data?.kpis;
  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const dispatch = useDispatch();
  const [editProductIds, setEditProductIds] = useState([
    { idNumeratorList: [], idDenominatorList: [] },
  ]);

  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);
  useEffect(() => {
    tableData.map((data, i) => {
      handleChange('', '', data, i);
    });
  }, [csvUpdateData, tableData.length]);
  const columns = [
    {
      dataField: 'id',
      text: 'id',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'sep',
      text: 'sep',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'Global_KPI_Code',
      text: 'Global_KPI_Code',
      editable: false,
      headerStyle: {
        ...headerStyles,
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
    },
    {
      dataField: 'MICS_L1_Threshold',
      text: 'MICS_L1_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L2_Threshold',
      text: 'MICS_L2_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L3_Threshold',
      text: 'MICS_L3_Threshold',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'Positive_direction',
      text: 'Positive_direction',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'Entity_ID',
      text: 'Entity_ID',
      editable: false,
      headerStyle: {
        ...headerStyles,
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
    },
    {
      dataField: 'Period_From',
      text: 'Period_From',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'Period_To',
      text: 'Period_To',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      hidden: true,
    },
    {
      dataField: 'Expected_Numerator',
      text: 'Expected_Numerator',
      headerStyle: {
        ...headerStyles,
      },
      editable: false,
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
        }
      },
    },
    {
      dataField: 'Expected_Denominator',
      text: 'Expected_Denominator',
      headerStyle: {
        ...headerStyles,
      },
      editable: false,
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
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isManual) {
          return {
            backgroundColor: 'white',
            border: '2px solid gold',
            color: 'black',
          };
        }
      },

      validator: (newValue, row, column) => {
        if (isNaN(newValue) || newValue <= 0) {
          row.Denominator = '';
          return {
            valid: false,
            message: 'Denominator can be positive values only',
          };
        }
      },
    },
    {
      dataField: 'KPI_Value',
      text: 'KPI_Value',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
      formatter: (cellContent, row) => (!row.Numerator || !row.Denominator ? '' : row.KPI_Value),
      style: (cell, row, rowIndex, colIndex) => {
        if (!row.Numerator || !row.Denominator) {
          return {
            backgroundColor: 'white',
            color: 'white',
          };
        }
      },
    },
    // {
    //   dataField: 'Upload_Approach',
    //   text: 'KPI Data source (Select from Excel/PBI/Celonis/Others)',
    //   // formatter: (cellContent, row) => '',
    //   editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
    //   headerStyle: {
    //     ...headerStyles,
    //   },
    //   style: (cell, row, rowIndex, colIndex) => {
    //     if (row.isManual) {
    //       return {
    //         backgroundColor: 'white',
    //         border: '2px solid gold',
    //         color: 'black',
    //       };
    //     }
    //   },
    // },
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
        }
      },
    },
    {
      dataField: 'Source_System',
      text: 'Source of Data - Link',
      editable: isModal ? false : (value, row, rowIndex, columnIndex) => row.isManual,
      // formatter: (cellContent, row) => '',
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
    },
    {
      dataField: 'L1_Result',
      text: 'L1_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
    },
    {
      dataField: 'L2_Result',
      text: 'L2_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
    },
    {
      dataField: 'L3_Result',
      text: 'L3_Result',
      editable: false,
      headerStyle: {
        ...headerStyles,
      },
    },
  ];

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.L3_Result === 'Fail' || row.L3_Result === 'Fail' || row.L3_Result === 'Fail') {
      style.backgroundColor = '#f8dbe0 ';
      style.color = '#000';
    }
    return style;
  };

  useEffect(() => {
    if (isModal || isReview) {
      if (getKPIResponse?.data?.Latest_Response?.kpis) {
        setTableData(getKPIResponse?.data?.Latest_Response?.kpis);
      }
    } else if (kpiResponseData?.length > 0) {
      const table_data = [...kpiResponseData];
      table_data.forEach((tData, i) => {
        if (tData.KPI_Value === '' || tData.KPI_Value === 0) {
          tData['sep'] = 2;
        } else {
          tData['sep'] = 1;
        }
        tData['id'] = i + 1;
        tData['Upload_Approach'] = tData['Upload_Approach'] || '';
        let period = tData.Period_From;
        let words = period.split('-');
        const month = parseInt(words[1]);
        const d = new Date();
        d.setMonth(month - 1);
        tData['Month'] = moment(period, 'YYYY-MM-DD').format('MMMM');
        tData['Type_of_KPI'] = tData.isManual ? 'Manual' : 'Automated';
      });

      const idNumeratorList = table_data.filter((d) => d.Numerator === 'NA').map((v) => v.id);
      const idDenominatorList = table_data.filter((d) => d.Denominator === 'NA').map((v) => v.id);
      setEditProductIds({
        idNumeratorList: idNumeratorList,
        idDenominatorList: idDenominatorList,
      });
      setTableData(table_data);
    }
  }, [kpiResultData]);

  function handleChange(oldValue, newValue, row, column) {
    const updateProduct = tableData.map((d) => {
      if (d.id === row.id) {
        if (column.dataField === 'Upload_Approach') {
          row['Upload_Approach'] = newValue;
        }
        if (column.dataField === 'Denominator' && newValue < 1) {
          row['Denominator'] = '';
        }
        row.KPI_Value = (row.Numerator / row.Denominator).toFixed(5);
        if (row.Positive_direction === 'Lower is better') {
          if (
            row.MICS_L1_Threshold === '-' ||
            row.L1_Result === '' ||
            row.MICS_L1_Threshold == null
          ) {
            console.log('l1 there', row.MICS_L1_Threshold);
            row.L1_Result = 'N/A';
          } else {
            if (+row.KPI_Value <= +row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
              row.L1_Result = 'Pass';
            } else {
              row.L1_Result = 'Fail';
            }
          }

          if (
            row.MICS_L2_Threshold === '-' ||
            row.L2_Result === '' ||
            row.MICS_L2_Threshold == null
          ) {
            console.log('l2 there', row.MICS_L2_Threshold);
            row.L2_Result = 'N/A';
          } else if (+row.KPI_Value <= +row.MICS_L2_Threshold && row.MICS_L2_Threshold !== '') {
            row.L2_Result = 'Pass';
          } else {
            row.L2_Result = 'Fail';
          }

          if (
            row.MICS_L3_Threshold === '-' ||
            row.L3_Result === '' ||
            row.MICS_L3_Threshold == null
          ) {
            console.log('l3 there', row.MICS_L3_Threshold, row.L3_Result, row.KPI_Value);
            row.L3_Result = 'N/A';
          } else {
            if (+row.KPI_Value <= +row.MICS_L3_Threshold) {
              row.L3_Result = 'Pass';
            } else {
              row.L3_Result = 'Fail';
            }
          }
        } else if (row.Positive_direction === 'Higher is better') {
          if (
            row.MICS_L1_Threshold === '-' ||
            row.L1_Result === '' ||
            row.MICS_L1_Threshold === null
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
            row.L2_Result === '' ||
            row.MICS_L2_Threshold === null
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
            row.L3_Result === '' ||
            row.MICS_L3_Threshold === null
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
  }

  const Section2ExcelDataValidation = (old_table, new_table) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
    myHeaders.append('Content-Type', 'application/json');

    var apiBody = JSON.stringify({
      input_table: old_table,
      output_table: new_table,
    });

    var requestParameters = {
      method: 'POST',
      headers: myHeaders,
      body: apiBody,
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/is_csv_tampered`, requestParameters)
      .then((response) => response.text())
      .then((response) => {
        const flag = JSON.parse(response).data;
        if (flag) {
          //console.log('Not Valid');
          alert("Please don't change the existing values from excel file!!");
        } else {
          console.log('Valid');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      document.getElementById('combine_btn').reset();
      // Section 2 data validation
      //Section2ExcelDataValidation(tableData, excelFile);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
      myHeaders.append('Content-Type', 'application/json');

      var apiBody = {
        input_table: tableData,
        output_table: excelFile,
      };

      dispatch(getCsvTampredDataAction(apiBody));
      if (stateCsvTampred?.data === false) {
        let newDataArray = tableData?.map((data, i) => {
          //console.log(excelFile[i], '***');
          return {
            ...data,
            Numerator: excelFile[i]?.Numerator,
            Denominator: excelFile[i]?.Denominator,
            Upload_Approach: excelFile[i]['KPI Data source (Select from Excel/PBI/Celonis/Others)'],
            Source_System: excelFile[i]['Link to data'],
          };
        });
        console.log(newDataArray, 'newDataArray');
        setTableData([...newDataArray]);
        setScvUpdateData(csvUpdateData + 1);
      } else {
        setScvUpdateData(0);
      }

      var requestParameters = {
        method: 'POST',
        headers: myHeaders,
        body: apiBody,
      };

      // fetch(`${process.env.REACT_APP_API_BASE_URL}/is_csv_tampered`, requestParameters)
      //   .then((response) => response.text())
      //   .then((response) => {
      //     const flag = JSON.parse(response).data;
      //     if (flag) {
      //       alert("Please don't change the existing values from excel file!!");
      //     } else {
      //       setTableData(excelFile);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      setTableData(null);
    }
  };

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile) {
        // let reader = new FileReader();
        // reader.readAsArrayBuffer(selectedFile);
        // reader.onload = (e) => {
        //   setExcelFileError(null);
        //   setExcelFile(e.target.result);
        // };
        readXlsxFile(selectedFile).then((data) => {
          setExcelFile(
            data.slice(1).map((d) => {
              //console.log(d, '@@@@');
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
  console.log('kpiResult && Object.keys(kpiResult)?.length > 0', kpiResult);
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
              {/*<ControlSection2Chart isModal={isModal} />*/}
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
                          {/* <Workbook.Column label="L1_Result" value="L1_Result" />
                    <Workbook.Column label="L2_Result" value="L2_Result" />
                    <Workbook.Column label="L3_Result" value="L3_Result" /> */}
                        </Workbook.Sheet>
                      </Workbook>
                    </div>
                    {/*<h1 className="table-modal-title">fddkj*/}
                    {/*  {t('selfAssessment.assessmentForm.excelFileUploadAndDownload')}*/}
                    {/*</h1>*/}
                    <button className="export_button" onClick={() => setShowGraph(!showGraph)}>
                      <strong> KPI Statistics</strong>
                    </button>
                  </div>
                  {!isModal && (
                    <form onSubmit={handleSubmit} id="combine_btn">
                      <input type="file" placeholder="Name" id="uploadfile" onChange={handleFile} />
                      <button type="submit" className="submit_btn black-text">
                        <strong>{t('selfAssessment.assessmentForm.section2UploadExcelBtn')}</strong>
                      </button>
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

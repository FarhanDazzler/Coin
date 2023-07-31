import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Workbook from 'react-excel-workbook';
import readXlsxFile from 'read-excel-file';
import {
  kpiResultSelector,
  getResponseSelector,
} from '../../../../../redux/Assessments/AssessmentSelectors';
import { getCsvTampredDataAction } from '../../../../../redux/CsvTampred/CsvTampredAction';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import moment from 'moment';

//const headerStyles = { color: '#000', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.1)' };
const ControlSection2 = ({ tableData, setTableData, controlId, isModal }) => {
  let headerStyles;
  if (isModal) {
    headerStyles = { color: '#000', fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.1)' };
  } else {
    headerStyles = { color: '#fff', fontWeight: '700', backgroundColor: '#000' };
  }
  const getKPIResponse = useSelector(getResponseSelector);
  const kpiResultData = useSelector(kpiResultSelector);
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
        if (isNaN(newValue)) {
          row.Denominator = '';

          return {
            valid: false,
            message: 'only numbers are allowed',
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

  console.log('table_data', kpiResultData?.data);
  useEffect(() => {
    if (getKPIResponse?.data?.Latest_Response?.kpis) {
      setTableData(getKPIResponse?.data?.Latest_Response?.kpis);
    } else if (kpiResultData?.data?.length > 0) {
      const table_data = [...kpiResultData.data];
      table_data.forEach((tData, i) => {
        if (tData.KPI_Value === '' || tData.KPI_Value === 0) {
          // console.log('null');
          tData['sep'] = 2;
        } else {
          // console.log('not null');
          tData['sep'] = 1;
        }
        // console.log('ids');
        tData['id'] = i + 1;

        let period = tData.Period_From;
        let words = period.split('-');
        const month = parseInt(words[1]);
        const d = new Date();
        d.setMonth(month - 1);
        // console.log(monthName);
        tData['Month'] =moment(period,'YYYY-MM-DD').format('MMMM')
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
        row.KPI_Value = (row.Numerator / row.Denominator).toFixed(2);
        if (row.Positive_direction === 'Lower is better') {
          if (row.MICS_L1_Threshold === '-' || row.L1_Result === '') {
            row.L1_Result = 'NA';
          } else {
            if (row.KPI_Value <= row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
              row.L1_Result = 'Pass';
            } else {
              row.L1_Result = 'Fail';
            }
          }

          if (row.MICS_L2_Threshold === '-' || row.L2_Result === '' || row.KPI_Value === 'NaN') {
            row.L2_Result = 'NA';
          } else {
            if (row.KPI_Value <= row.MICS_L2_Threshold) {
              row.L2_Result = 'Pass';
            } else {
              row.L2_Result = 'Fail';
            }
          }

          if (row.MICS_L3_Threshold === '-' || row.L3_Result === '' || row.KPI_Value === 'NaN') {
            row.L3_Result = 'NA';
          } else {
            if (row.KPI_Value <= row.MICS_L3_Threshold) {
              row.L3_Result = 'Pass';
            } else {
              row.L3_Result = 'Fail';
            }
          }
        } else if (row.Positive_direction === 'Higher is better') {
          if (row.MICS_L1_Threshold === '-' || row.L1_Result === '' || row.KPI_Value === 'NaN') {
            row.L1_Result = 'NA';
          } else {
            if (row.KPI_Value >= row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
              row.L1_Result = 'Pass';
            } else {
              row.L1_Result = 'Fail';
            }
          }

          if (row.MICS_L2_Threshold === '-' || row.L2_Result === '' || row.KPI_Value === 'NaN') {
            row.L2_Result = 'NA';
          } else {
            if (row.KPI_Value >= row.MICS_L2_Threshold) {
              row.L2_Result = 'Pass';
            } else {
              row.L2_Result = 'Fail';
            }
          }

          if (row.MICS_L3_Threshold === '-' || row.L3_Result === '' || row.KPI_Value === 'NaN') {
            row.L3_Result = 'NA';
          } else {
            if (row.KPI_Value >= row.MICS_L3_Threshold) {
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

    fetch('https://acoemicsgrcpwa-devbe.azurewebsites.net/is_csv_tampered', requestParameters)
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

  console.log(excelFile, 'after upload');
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

      console.log(apiBody, 'API BODY For Section 2');
      dispatch(getCsvTampredDataAction(apiBody));
      if (stateCsvTampred?.data === false) {
        console.log('i am in data update');
        let newDataArray = tableData.map((data, i) => {
          return {
            ...data,
            Numerator: excelFile[i].Numerator,
            Denominator: excelFile[i].Denominator,
          };
        });
        setTableData([...newDataArray]);
        setScvUpdateData(csvUpdateData + 1);
      } else {
        console.log('i am in true state');
        setScvUpdateData(0);
      }

      var requestParameters = {
        method: 'POST',
        headers: myHeaders,
        body: apiBody,
      };

      // fetch('https://acoemicsgrcpwa-devbe.azurewebsites.net/is_csv_tampered', requestParameters)
      //   .then((response) => response.text())
      //   .then((response) => {
      //     console.log(JSON.parse(response).data, 'Check Section 2 validation data');

      //     const flag = JSON.parse(response).data;
      //     if (flag) {
      //       //console.log('Not Valid');
      //       alert("Please don't change the existing values from excel file!!");
      //     } else {
      //       console.log('Valid');
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

  return (
    <div>
      <CollapseFrame title="Section 2 : KPI" active>
        {tableData?.length !== 0 ? (
          <div className="mt-5">
            <div id="my_btns">
              <div className="d-flex align-items-center">
                <div className="row " id="export_button_right">
                  <Workbook
                    filename={`data-${controlId}.xlsx`}
                    element={
                      <button className="export_button">
                        <strong>Export To Excel</strong>
                      </button>
                    }
                  >
                    <Workbook.Sheet data={tableData} name="Sheet A">
                      {/* <Workbook.Column label="sep" value="sep" /> */}
                      <Workbook.Column label="Global_KPI_Code" value="Global_KPI_Code" />
                      <Workbook.Column label="Entity_ID" value="Entity_ID" />
                      <Workbook.Column label="Expected_Numerator" value="Expected_Numerator" />
                      <Workbook.Column label="Numerator" value="Numerator" />
                      <Workbook.Column label="Expected_Denominator" value="Expected_Denominator" />
                      <Workbook.Column label="Denominator" value="Denominator" />
                      <Workbook.Column label="Type_of_KPI" value="Type_of_KPI" />
                      {/* <Workbook.Column label="KPI_Value" value="KPI_Value" /> */}
                      <Workbook.Column label="Month" value="Month" />
                      {/* <Workbook.Column label="L1_Result" value="L1_Result" />
                    <Workbook.Column label="L2_Result" value="L2_Result" />
                    <Workbook.Column label="L3_Result" value="L3_Result" /> */}
                    </Workbook.Sheet>
                  </Workbook>
                </div>
                <h1 className="table-modal-title">Excel File Upload & Download</h1>
              </div>
              {!isModal && (
                <form onSubmit={handleSubmit} id="combine_btn">
                  <input type="file" placeholder="Name" id="uploadfile" onChange={handleFile} />
                  <button type="submit" className="submit_btn black-text">
                    <strong>Submit</strong>
                  </button>
                </form>
              )}
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
                  mode: 'click',
                  blurToSave: true,
                  afterSaveCell: handleChange,
                })}
              />
            </div>
          </div>
        ) : (
          <div className="mt-5 text-center">
            <h1 className="table-modal-title">KPI is not applicable for this Control</h1>
          </div>
        )}
      </CollapseFrame>
    </div>
  );
};

export default ControlSection2;

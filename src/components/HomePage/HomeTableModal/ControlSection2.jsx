import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import { useSelector } from 'react-redux';
import { kpiResultSelector } from '../../../redux/Assessments/AssessmentSelectors';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Workbook from 'react-excel-workbook';
import readXlsxFile from 'read-excel-file';

const headerStyles = { backgroundColor: '#f1c40f', color: '#000000', fontWeight: '700' };

const ControlSection2 = ({ tableData, setTableData }) => {
  const kpiResultData = useSelector(kpiResultSelector);

  const [editProductIds, setEditProductIds] = useState([
    { idNumeratorList: [], idDenominatorList: [] },
  ]);
  const [excelFile, setExcelFile] = useState(null);

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
      dataField: 'Positive_Direction',
      text: 'Positive_Direction',
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
      dataField: 'Numerator',
      text: 'Numerator',
      headerStyle: {
        ...headerStyles,
      },
      editable: (value, row, rowIndex, columnIndex) =>
        editProductIds.idNumeratorList.includes(row.id),
      editor: { type: 'number' },
    },
    {
      dataField: 'Denominator',
      text: 'Denominator',
      editable: (value, row, rowIndex, columnIndex) =>
        editProductIds.idDenominatorList.includes(row.id),
      editor: { type: 'number' },
      headerStyle: {
        ...headerStyles,
      },
      style: (cell, row, rowIndex, colIndex) => {
        if (row.sep === 2) {
          return {
            backgroundColor: 'white',
            border: '1px solid gold',
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
      style.backgroundColor = '#FF7A80';
      style.color = '#FFFFFF';
    }
    return style;
  };

  useEffect(() => {
    if (kpiResultData?.data.length > 0) {
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
        tData['Month'] = d.toLocaleString('default', { month: 'long' });
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
        if (row.Positive_Direction === 'Lower is better') {
          if (row.KPI_Value <= row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
            row.L1_Result = 'Pass';
          } else {
            if (row.MICS_L1_Threshold === '') {
              row.L1_Result = 'NA';
            } else {
              row.L1_Result = 'Fail';
            }
          }

          if (row.KPI_Value <= row.MICS_L2_Threshold) {
            row.L2_Result = 'Pass';
          } else {
            row.L2_Result = 'Fail';
          }

          if (row.KPI_Value <= row.MICS_L3_Threshold) {
            row.L3_Result = 'Pass';
          } else {
            row.L3_Result = 'Fail';
          }
        } else if (row.Positive_Direction === 'Higher is better') {
          if (row.KPI_Value >= row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
            row.L1_Result = 'Pass';
          } else {
            if (row.MICS_L1_Threshold === '') {
              row.L1_Result = 'NA';
            } else {
              row.L1_Result = 'Fail';
            }
          }

          if (row.KPI_Value >= row.MICS_L2_Threshold) {
            row.L2_Result = 'Pass';
          } else {
            row.L2_Result = 'Fail';
          }

          if (row.KPI_Value >= row.MICS_L3_Threshold) {
            row.L3_Result = 'Pass';
          } else {
            row.L3_Result = 'Fail';
          }
        } else if (row.Positive_Direction === 'Lower is bad') {
          if (row.KPI_Value < row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
            row.L1_Result = 'Fail';
          } else {
            if (row.MICS_L1_Threshold === '') {
              row.L1_Result = 'NA';
            } else {
              row.L1_Result = 'Pass';
            }
          }

          if (row.KPI_Value < row.MICS_L2_Threshold) {
            row.L2_Result = 'Fail';
          } else {
            row.L2_Result = 'Pass';
          }

          if (row.KPI_Value < row.MICS_L3_Threshold) {
            row.L3_Result = 'Fail';
          } else {
            row.L3_Result = 'Pass';
          }
        } else if (row.Positive_Direction === 'Higher is bad') {
          if (row.KPI_Value > row.MICS_L1_Threshold && row.MICS_L1_Threshold !== '') {
            row.L1_Result = 'Fail';
          } else {
            if (row.MICS_L1_Threshold === '') {
              row.L1_Result = 'NA';
            } else {
              row.L1_Result = 'Pass';
            }
          }

          if (row.KPI_Value > row.MICS_L2_Threshold) {
            row.L2_Result = 'Fail';
          } else {
            row.L2_Result = 'Pass';
          }

          if (row.KPI_Value > row.MICS_L3_Threshold) {
            row.L3_Result = 'Fail';
          } else {
            row.L3_Result = 'Pass';
          }
        }

        return row;
      }
      return d;
    });
    setTableData(updateProduct);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      document.getElementById('combine_btn').reset();
      setTableData(excelFile);
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
        <div className="mt-5">
          <div id="my_btns">
            <div className="d-flex align-items-center">
              <div className="row " id="export_button_right">
                <Workbook
                  filename="data.xlsx"
                  element={
                    <button className="export_button">
                      <strong>Export To Excel</strong>
                    </button>
                  }
                >
                  <Workbook.Sheet data={tableData} name="Sheet A">
                    <Workbook.Column label="sep" value="sep" />
                    <Workbook.Column label="Global_KPI_Code" value="Global_KPI_Code" />
                    <Workbook.Column label="Entity_ID" value="Entity_ID" />
                    <Workbook.Column label="Numerator" value="Numerator" />
                    <Workbook.Column label="Denominator" value="Denominator" />
                    <Workbook.Column label="KPI_Value" value="KPI_Value" />
                    <Workbook.Column label="Month" value="Month" />
                    <Workbook.Column label="L1_Result" value="L1_Result" />
                    <Workbook.Column label="L2_Result" value="L2_Result" />
                    <Workbook.Column label="L3_Result" value="L3_Result" />
                  </Workbook.Sheet>
                </Workbook>
              </div>
              <h1 className="table-modal-title">Excel File Upload & Download</h1>
            </div>

            <form onSubmit={handleSubmit} id="combine_btn">
              <input type="file" placeholder="Name" id="uploadfile" onChange={handleFile} />
              <button type="submit" className="submit_btn black-text">
                <strong>Submit</strong>
              </button>
            </form>
          </div>

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
      </CollapseFrame>
    </div>
  );
};

export default ControlSection2;

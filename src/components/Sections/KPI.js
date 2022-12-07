//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Second from './Second';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
//import paginationFactory from 'react-bootstrap-table2-paginator';

//import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

function KPI() {
  let [L, setL] = useState([false, false, false]);
  const columns = [
    {
      dataField: 'id',
      text: 'id',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'sep',
      text: 'sep',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Global_KPI_Code',
      text: 'Global_KPI_Code',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'MICS_Code',
      text: 'MICS_Code',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
        width: '1000px',
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L1_Threshold',
      text: 'MICS_L1_Threshold',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => {
      //       console.log(e);
      //       console.log(column);
      //       console.log(columnIndex);
      //       console.log(row);
      //       console.log(rowIndex);
      //       //alert('Click on Product ID field');
      //     }},
    },
    {
      dataField: 'MICS_L2_Threshold',
      text: 'MICS_L2_Threshold',
      editable: false,

      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L3_Threshold',
      text: 'MICS_L3_Threshold',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },
    {
      dataField: 'Positive_Direction',
      text: 'Positive_Direction',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Entity_ID',
      text: 'Entity_ID',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'Period_From',
      text: 'Period_From',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Period_To',
      text: 'Period_To',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Numerator',
      text: 'Numerator',
      editable: (content, row, rowIndex, columnIndex) => row.id == 2,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: 'white',
          border: '1px solid gold',
        };
      },
    },

    {
      dataField: 'Denominator',
      text: 'Denominator',
      editable: (content, row, rowIndex, columnIndex) => row.id == 2,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: 'white',
          border: '1px solid gold',
        };
      },
    },

    {
      dataField: 'KPI_Value',
      text: 'KPI_Value',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },
    {
      dataField: 'Month',
      text: 'Month',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L1_Result',
      text: 'L1_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L2_Result',
      text: 'L2_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L3_Result',
      text: 'L3_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },
  ];

  const product = [
    {
      sap: 1,
      Global_KPI_Code: 'KPI_ATR_ACCR_02a',
      id: 1,
      MICS_Code: 'ATR_ACCR_01b-K',
      MICS_L1_Threshold: 'NULL',
      MICS_L2_Threshold: 0.05,
      MICS_L3_Threshold: 0.01,
      Positive_Direction: 'Lower is better',
      Entity_ID: 'Argentina',
      Period_From: '6/1/2022',
      Period_To: '6/30/2022',
      Numerator: -61,
      Denominator: 100,
      KPI_Value: -0.61,
      Month: 'Oct',
      L1_Result: 'NA',
      L2_Result: 'Pass',
      L3_Result: 'Pass',
    },
    {
      sap: 2,
      Global_KPI_Code: 'KPI_ATR_ACCR_02a',
      id: 2,
      MICS_Code: 'ATR_ACCR_01b-K',
      MICS_L1_Threshold: 'NULL',
      MICS_L2_Threshold: 0.05,
      MICS_L3_Threshold: 0.01,
      Positive_Direction: 'Lower is better',
      Entity_ID: 'Argentina',
      Period_From: '6/1/2022',
      Period_To: '6/30/2022',
      Numerator: null,
      Denominator: null,
      KPI_Value: 0,
      Month: 'sept',
      L1_Result: '',
      L2_Result: '',
      L3_Result: '',
    },
  ];
  return (
    <>
      <div>
        <div className="border-0  ">
          <div className="child-body text">
            <BootstrapTable
              responsives
              className="table card-table table-outline text-nowrap table-vcenter card-table"
              keyField="id"
              data={product}
              columns={columns}
              cellEdit={cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column, keyField, rowIndex) => {
                  console.log(oldValue, newValue, row.id, column.dataField);
                  if (column.dataField == 'Denominator') {
                    product[row.id - 1].Denominator = newValue;
                    console.log('kushal');
                  }
                  if (column.dataField == 'Numerator') {
                    product[row.id - 1].Numerator = newValue;
                    console.log('khandelwal');
                  }
                  row.KPI_Value = row.Numerator / row.Denominator;

                  if (row.KPI_Value < row.MICS_L1_Threshold && row.MICS_L1_Threshold != 'NULL') {
                    row.L1_Result = 'pass';
                  } else {
                    if (row.MICS_L1_Threshold == 'NULL') {
                      row.L1_Result = 'NA';
                    } else {
                      row.L1_Result = 'Fail';
                    }
                  }

                  if (row.KPI_Value < row.MICS_L2_Threshold) {
                    row.L2_Result = 'pass';
                  } else {
                    row.L2_Result = 'Fail';
                  }

                  if (row.KPI_Value < row.MICS_L3_Threshold) {
                    row.L3_Result = 'pass';
                  } else {
                    row.L3_Result = 'Fail';
                  }

                  for (let i = 0; i < product.length; i++) {
                    if (product[i].L1_Result == 'Fail') {
                      L[i] = true;
                    }
                    if (product[i].L2_Result == 'Fail') {
                      L[i] = true;
                    }
                    if (product[i].L3_Result == 'Fail') {
                      L[i] = true;
                    }
                  }
                  console.log(product);
                },
              })}
            />
          </div>
        </div>
      </div>
      <div>
        <p style={{ backgroundColor: '#FFBF00' }}>
          <strong
            style={{
              paddingLeft: '15px',
              fontSize: '22px',
              marginTop: '20px',

              borderRadius: '20px',
            }}
          >
            SECTION 3
          </strong>
        </p>
      </div>

      <Second L={L} />
    </>
  );
}

export default KPI;

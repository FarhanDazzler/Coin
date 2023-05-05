import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Table from '../../../../../components/UI/Table';
import Swal from 'sweetalert2';
import '../TableStyle.scss';

// geting data from redux
import { getMicsFrameworkSelector } from '../../../../../redux/MDM/MDM_Selectors';

import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const MicsFrameworkTable = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();
  const micsFramework = useSelector(getMicsFrameworkSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Previous_MICS',
      headerName: 'Previous Year MICS No',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Previous_MICS1',
      headerName: 'Previous Year-1 MICS No',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Category',
      headerName: 'Category',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Mega_Process',
      headerName: 'Mega Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Sub_Process',
      headerName: 'Sub Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'ABI_Key',
      headerName: 'ABI Key',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Ambev_Key',
      headerName: 'Ambev Key',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'FCPA',
      headerName: 'FCPA',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Frequency',
      headerName: 'Frequency',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Preventive_Detective',
      headerName: 'Preventive/Detective',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Automation',
      headerName: 'Automation',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Recommended_Level',
      headerName: 'Recommended Level',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Maturity_Relevant',
      headerName: 'Maturity Relevant',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'mics_weight',
      headerName: 'MICS Weight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Recommended_Standardization',
      headerName: 'Recommended Standardization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'ABI_DAG',
      headerName: 'ABI DAG',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'AmBev_DAG',
      headerName: 'AmBev DAG',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'B2B',
      headerName: 'B2B',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Fintech',
      headerName: 'Fintech',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'DTC',
      headerName: 'DTC',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_Split',
      headerName: 'Control Split',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Risk',
      headerName: 'Risk',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_name',
      headerName: 'Control Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'mics_L1desc',
      headerName: 'L1 Description',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'mics_L2desc',
      headerName: 'L2 Description',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'mics_L3desc',
      headerName: 'L3 Description',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Kpi_status',
      headerName: 'Kpi Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'L1_KPI',
      headerName: 'L1 KPI',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'L2_KPI',
      headerName: 'L2 KPI',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'L3_KPI',
      headerName: 'L3 KPI',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'BS_impact',
      headerName: 'Balance Sheet Impact',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'PnL_impact',
      headerName: 'P&L Impact',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Cash_flow_impact',
      headerName: 'Cash Flow Impact',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'testing_approach',
      headerName: 'Testing Approach',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'change_comment',
      headerName: 'Change Comment',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Change_Size',
      headerName: 'Change Size',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Reviewed',
      headerName: 'Reviewed',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      micsFramework.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [micsFramework.data]);

  const ActiveToolADD = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const ActiveToolEdit = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <EditIcon color="black" />
    </Tooltip>
  );

  const handleOnclickEdit = () => {
    // edit code
    console.log(tableData);
    if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one MICS Framework to edit at a time', 'error');
    } else if (editTableIndex.length == 1) {
      //if (!editTableIndex[0]) return;
      const filterData = tableData[editTableIndex[0]];

      const data = { title: 'Edit MICS Framework', modalType: 'edit', editTableData: filterData };
      history.push('/master-data-management/mics-framework/addNew', {
        data,
      });
    }
  };
  const handleOnclickAdd = () => {
    // Add code
    const data = { title: 'Add MICS Framework', modalType: 'add', editTableData: null };
    history.push('/master-data-management/mics-framework/addNew', { data });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>MICS Framework Table</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolEdit text="Free Text" />}
                    className="edit-button-mdm-table"
                    onClick={handleOnclickEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolADD text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAdd}
                  >
                    Add New
                  </Button>
                </div>
              </div>
            </div>
            <Table
              tableData={tableData}
              tableColumns={tableColumns}
              columns={tableColumns}
              setEditTableIndex={setEditTableIndex}
              loading={micsFramework.loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MicsFrameworkTable;

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import { useHistory, useLocation } from 'react-router-dom';
import Table2 from '../../../../../components/UI/Table/Table2';
import Swal from 'sweetalert2';
import '../TableStyle.scss';

// geting data from redux
import { getMicsFrameworkSelector } from '../../../../../redux/MDM/MDM_Selectors';

import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import MicsFrameworkTableFilter from './MicsFrameworkTableFilter';

const MicsFrameworkTable = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();
  const micsFramework = useSelector(getMicsFrameworkSelector);

  const [MICS_IDValue, setMICS_IDValue] = useState([]);
  const [mega_ProcessValue, setMega_ProcessValue] = useState([]);
  const [subProcessValue, setSubProcessValue] = useState([]);
  const [weightValue, setWeightValue] = useState([]);
  const [kpiStatusValue, setKpiStatusValue] = useState([]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Previous_MICS',
      id: 'Previous_MICS',
      header: 'Previous Year MICS No',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 190,
    },
    {
      accessorKey: 'Previous_MICS1',
      id: 'Previous_MICS1',
      header: 'Previous Year-1 MICS No',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 190,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 190,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'Category',
      id: 'Category',
      header: 'Category',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Mega_Process',
      id: 'Mega_Process',
      header: 'Mega Process',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 140,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'Sub_Process',
      id: 'Sub_Process',
      header: 'Sub Process',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 230,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'ABI_Key',
      id: 'ABI_Key',
      header: 'ABI Key',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Ambev_Key',
      id: 'Ambev_Key',
      header: 'Ambev Key',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'FCPA',
      id: 'FCPA',
      header: 'FCPA',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Frequency',
      id: 'Frequency',
      header: 'Frequency',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Preventive_Detective',
      id: 'Preventive_Detective',
      header: 'Preventive/Detective',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
    },
    {
      accessorKey: 'Automation',
      id: 'Automation',
      header: 'Automation',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 140,
    },
    {
      accessorKey: 'Recommended_Level',
      id: 'Recommended_Level',
      header: 'Recommended Level',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
    },
    {
      accessorKey: 'Maturity_Relevant',
      id: 'Maturity_Relevant',
      header: 'Maturity Relevant',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 140,
    },
    {
      accessorKey: 'mics_weight',
      id: 'mics_weight',
      header: 'MICS Weight',
      flex: 1,
      //filterVariant: 'range',
      size: 120,
    },
    {
      accessorKey: 'Recommended_Standardization',
      id: 'Recommended_Standardization',
      header: 'Recommended Standardization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 350,
    },
    {
      accessorKey: 'ABI_DAG',
      id: 'ABI_DAG',
      header: 'ABI DAG',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'AmBev_DAG',
      id: 'AmBev_DAG',
      header: 'AmBev DAG',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'B2B',
      id: 'B2B',
      header: 'B2B',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Fintech',
      id: 'Fintech',
      header: 'Fintech',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'DTC',
      id: 'DTC',
      header: 'DTC',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 140,
    },
    {
      accessorKey: 'Control_Split',
      id: 'Control_Split',
      header: 'Control Split',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 120,
    },
    {
      accessorKey: 'Risk',
      id: 'Risk',
      header: 'Risk',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 400,
    },
    {
      accessorKey: 'Control_name',
      id: 'Control_name',
      header: 'Control Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 350,
    },
    {
      accessorKey: 'Kpi_status',
      id: 'Kpi_status',
      header: 'Kpi Status',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 190,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'L1_KPI',
      id: 'L1_KPI',
      header: 'L1 KPI',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'L2_KPI',
      id: 'L2_KPI',
      header: 'L2 KPI',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'L3_KPI',
      id: 'L3_KPI',
      header: 'L3 KPI',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'BS_impact',
      id: 'BS_impact',
      header: 'Balance Sheet Impact',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
    },
    {
      accessorKey: 'PnL_impact',
      id: 'PnL_impact',
      header: 'P&L Impact',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 350,
    },
    {
      accessorKey: 'Cash_flow_impact',
      id: 'Cash_flow_impact',
      header: 'Cash Flow Impact',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 160,
    },
    {
      accessorKey: 'testing_approach',
      id: 'testing_approach',
      header: 'Testing Approach',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'change_comment',
      id: 'change_comment',
      header: 'Change Comment',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'Change_Size',
      id: 'Change_Size',
      header: 'Change Size',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 130,
    },
    {
      accessorKey: 'Reviewed',
      id: 'Reviewed',
      header: 'Reviewed',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Status',
      id: 'Status',
      header: 'Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'mics_L1desc',
      id: 'mics_L1desc',
      header: 'L1 Description ',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minSize: 100, //min size enforced during resizing
      maxSize: 500, //max size enforced during resizing
      size: 300, //medium column
      Cell: (row) => {
        return (
          <span>
            <p dangerouslySetInnerHTML={{ __html: row.row.original.mics_L1desc }} />
          </span>
        );
      },
    },
    {
      accessorKey: 'mics_L2desc',
      id: 'mics_L2desc',
      header: 'L2 Description ',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minSize: 100, //min size enforced during resizing
      maxSize: 500, //max size enforced during resizing
      size: 300, //medium column
      Cell: (row) => {
        return (
          <span>
            <p dangerouslySetInnerHTML={{ __html: row.row.original.mics_L2desc }} />
          </span>
        );
      },
    },
    {
      accessorKey: 'mics_L3desc',
      id: 'mics_L3desc',
      header: 'L3 Description ',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minSize: 100, //min size enforced during resizing
      maxSize: 500, //max size enforced during resizing
      size: 300, //medium column
      Cell: (row) => {
        return (
          <span>
            <p dangerouslySetInnerHTML={{ __html: row.row.original.mics_L3desc }} />
          </span>
        );
      },
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
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'You need to select from table in order to edit', 'error');
    } else if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one MICS Framework to edit at a time', 'error');
    } else if (editTableIndex.length == 1) {
      //if (!editTableIndex[0]) return;
      const filterData = tableData.find((data, i) => data.id === editTableIndex[0]);
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

  // object for Expanding Detail Panel
  const Is_Expanding_Detail_Panel = {
    Is_Expanding: true,
    Table_Name: 'MICS Framework Table',
  };

  useEffect(() => {
    const updateData = micsFramework.data?.filter((i) => {
      return (
        (MICS_IDValue?.length ? MICS_IDValue.includes(i.Control_ID) : true) &&
        (mega_ProcessValue?.length ? mega_ProcessValue.includes(i.Mega_Process) : true) &&
        (subProcessValue?.length ? subProcessValue.includes(i.Sub_Process) : true) &&
        (weightValue?.length ? weightValue.includes(i?.mics_weight?.toString()) : true) &&
        (kpiStatusValue?.length ? kpiStatusValue.includes(i.Kpi_status) : true)
      );
    });

    setTableData(
      updateData.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [MICS_IDValue, mega_ProcessValue, subProcessValue, weightValue, kpiStatusValue]);

  const filterData = (key) => {
    const kayValuesArray = micsFramework?.data?.map((d) => d[key].toString()) || [];
    const allData = [...new Set(kayValuesArray)];
    return allData.filter((d) => !!d);
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-global-filters">
              <MicsFrameworkTableFilter
                MICS_IDData={filterData('Control_ID')}
                MICS_IDValue={MICS_IDValue}
                setMICS_IDValue={setMICS_IDValue}
                mega_ProcessData={filterData('Mega_Process')}
                mega_ProcessValue={mega_ProcessValue}
                setMega_ProcessValue={setMega_ProcessValue}
                subProcessData={filterData('Sub_Process')}
                subProcessValue={subProcessValue}
                setSubProcessValue={setSubProcessValue}
                weightData={filterData('mics_weight')}
                weightValue={weightValue}
                setWeightValue={setWeightValue}
                kpiStatusData={filterData('Kpi_status')}
                kpiStatusValue={kpiStatusValue}
                setKpiStatusValue={setKpiStatusValue}
              />
            </div>
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>MICS Framework Table</span>
                </div>
                {localStorage.getItem('selected_Role') === 'Global internal control' && (
                  <div>
                    {/*<Button*/}
                    {/*  variant="outlined"*/}
                    {/*  size="small"*/}
                    {/*  startIcon={<ActiveToolEdit text="Free Text" />}*/}
                    {/*  className="edit-button-mdm-table"*/}
                    {/*  onClick={handleOnclickEdit}*/}
                    {/*>*/}
                    {/*  Edit*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*  variant="outlined"*/}
                    {/*  size="small"*/}
                    {/*  startIcon={<ActiveToolADD text="Free Text" />}*/}
                    {/*  className="add-button-mdm-table"*/}
                    {/*  onClick={handleOnclickAdd}*/}
                    {/*>*/}
                    {/*  Add New*/}
                    {/*</Button>*/}
                  </div>
                )}
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={micsFramework.loading}
              tableColumns={tableColumns}
              setEditTableIndex={setEditTableIndex}
              //Is_Expanding_Detail_Panel={Is_Expanding_Detail_Panel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MicsFrameworkTable;

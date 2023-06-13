import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../../components/UI/Table/Table2';
import './TableStyle.scss';
import Swal from 'sweetalert2';
// geting data from redux
import { getRlBuMasterdataSelector } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import Button from '../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import AssignModal from './AssignModal';
import CustomModal from '../../../../../../components/UI/CustomModal';
import { assignRlBuMasterdataSelector } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import { getRlBuMasterdata } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const BuMasterdataTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const buMasterdataState = useSelector(getRlBuMasterdataSelector);
  const assignRlBuMasterdataState = useSelector(assignRlBuMasterdataSelector);
  //console.log('buMasterdataState', buMasterdataState);

  useEffect(() => {
    dispatch(getRlBuMasterdata());
  }, []);
  // for closing POP after confirm
  useEffect(() => {
    setShowModal(false);
    dispatch(getRlBuMasterdata());
  }, [assignRlBuMasterdataState?.data]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Applicability',
      id: 'Applicability',
      header: 'Applicability',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Disclosure Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Finance_Director',
      id: 'Finance_Director',
      header: 'Finance Director',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'BU_Head',
      id: 'BU_Head',
      header: 'BU Head',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      buMasterdataState.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [buMasterdataState.data]);

  const ActiveToolAssign = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const handleOnclickAssign = () => {
    // Assign code
    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select table first to Assign', 'error');
    } else if (editTableIndex.length >= 1) {
      setAssignTableData(tableData.filter((data, i) => editTableIndex.includes(data.id)));
      setShowModal(true);
    }
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>BU Masterdata Management</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolAssign text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAssign}
                  >
                    Assign
                  </Button>
                </div>
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={buMasterdataState.loading}
              tableColumns={tableColumns}
              setEditTableIndex={setEditTableIndex}
            />
          </div>
        </div>
      </div>
      <CustomModal
        className="add-org"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title="Assign BU Master Data"
        bodyClassName="p-0"
      >
        <AssignModal setShowModal={setShowModal} assignTableData={assignTableData} />
      </CustomModal>
    </>
  );
};

export default BuMasterdataTable;

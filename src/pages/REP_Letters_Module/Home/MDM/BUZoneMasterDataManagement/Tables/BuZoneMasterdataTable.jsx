import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../../components/UI/Table/Table2';
import Swal from 'sweetalert2';
// geting data from redux
import Button from '../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import AssignModal from './AssignModal';
import CustomModal from '../../../../../../components/UI/CustomModal';
import {
  assignRlBuZoneMasterdataSelector,
  getRlBuZoneMasterdataSelector,
} from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import { getRlBuZoneMasterdata } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const BuZoneMasterdataTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const buZoneMasterdataState = useSelector(getRlBuZoneMasterdataSelector);
  const assignRlZoneBuMasterdataState = useSelector(assignRlBuZoneMasterdataSelector);
  //console.log('buMasterdataState', buMasterdataState);

  // for closing POP after confirm
  useEffect(() => {
    setShowModal(false);
    dispatch(getRlBuZoneMasterdata());
  }, [assignRlZoneBuMasterdataState?.data]);

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
    // {
    //   accessorKey: 'Applicability',
    //   id: 'Applicability',
    //   header: 'Applicability',
    //   flex: 1,
    //   columnDefType: 'data',
    //   cellClassName: 'dashboardCell',
    //   size: 100,
    // },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Head of Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP Finance',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Excom_Member',
      id: 'Excom_Member',
      header: 'Excom Member',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_Legal_Representative',
      id: 'Zone_Legal_Representative',
      header: 'Zone Legal Representative',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      buZoneMasterdataState.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [buZoneMasterdataState.data]);

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
                  <span style={{ paddingLeft: '16px' }}>Zone Masterdata Management</span>
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
              loading={buZoneMasterdataState.loading}
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
        title="Assign Zone Master Data"
        bodyClassName="p-0"
      >
        <AssignModal setShowModal={setShowModal} assignTableData={assignTableData} />
      </CustomModal>
    </>
  );
};

export default BuZoneMasterdataTable;

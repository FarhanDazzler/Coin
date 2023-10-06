import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../../components/UI/Table/Table2';
import './TableStyle.scss';
// geting data from redux
import {
  addRlFunctionalMasterdataSelector,
  assignRlFunctionalMasterdataSelector,
  getRlFunctionalMasterdataSelector,
} from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import Button from '../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import FunctionalMasterdataModal from './FunctionalMasterdataModal';
import CustomModal from '../../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';
import { getRlFunctionalMasterdata } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import AddFunctionalMasterdataModal from './AddFunctionalMasterdataModal';

const FunctionalMasterdataTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModel] = useState();

  const dispatch = useDispatch();

  const functionalMasterdataState = useSelector(getRlFunctionalMasterdataSelector);
  const assignRlFunctionalMasterdataState = useSelector(assignRlFunctionalMasterdataSelector);
  const addRlFunctionalMasterdataSelectorState = useSelector(addRlFunctionalMasterdataSelector);

  // for closing POP after confirm
  useEffect(() => {
    setShowModal(false);
    dispatch(getRlFunctionalMasterdata());
  }, [assignRlFunctionalMasterdataState?.data, addRlFunctionalMasterdataSelectorState?.data]);

  const class_to_apply = (item) => {
    let className = '';
    if (item.toUpperCase() === 'ACTIVE') {
      className = 'badge badge-success';
    }
    if (item.toUpperCase() === 'INACTIVE') {
      className = 'badge badge-red';
    }
    return className;
  };

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
      header: 'BU / Entity',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Functional',
      id: 'Functional',
      header: 'Functional',
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
      accessorKey: 'Recipient',
      id: 'Recipient',
      header: 'Recipient',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Recipient_Status',
      id: 'Recipient_Status',
      header: 'Recipient Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Recipient_Status)}>
            {row.row.original.Recipient_Status === '' ? 'N/A' : row.row.original.Recipient_Status}
          </span>
        );
      },
    },
    {
      accessorKey: 'Title_Position',
      id: 'Title_Position',
      header: 'Title/Position',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Zone_Control_Status',
      id: 'Zone_Control_Status',
      header: 'Zone Control Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Zone_Control_Status)}>
            {row.row.original.Zone_Control_Status === ''
              ? 'N/A'
              : row.row.original.Zone_Control_Status}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      functionalMasterdataState.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [functionalMasterdataState.data]);

  const ActiveToolAssign = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const handleOnclickAdd = () => {
    setModel('add');
    setShowModal(true);
  };

  const handleOnclickAssign = () => {
    // Assign code
    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select table first to Assign', 'error');
    } else if (editTableIndex.length >= 1) {
      setAssignTableData(tableData.filter((data, i) => editTableIndex.includes(data.id)));
      setModel('edit');
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            {/*<FilterButtons zone={removeDuplicates(zoneArray)} />*/}
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>Functional Masterdata Management</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolAssign text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAdd}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolAssign text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAssign}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={functionalMasterdataState.loading}
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
        title={modal === 'edit' ? 'Edit Functional Master Data' : 'Add Functional Master Data'}
        bodyClassName="p-0"
      >
        {modal === 'edit' ? (
          <FunctionalMasterdataModal
            setShowModal={setShowModal}
            assignTableData={assignTableData}
          />
        ) : (
          <AddFunctionalMasterdataModal setShowModal={setShowModal} />
        )}
      </CustomModal>
    </>
  );
};

export default FunctionalMasterdataTable;

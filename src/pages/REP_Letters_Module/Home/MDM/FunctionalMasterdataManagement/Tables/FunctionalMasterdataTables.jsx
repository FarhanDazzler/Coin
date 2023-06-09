import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../../components/UI/Table/Table2';
import './TableStyle.scss';
// geting data from redux
import { getRlFunctionalMasterdataSelector } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import Button from '../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import FunctionalMasterdataModal from './FunctionalMasterdataModal';
import CustomModal from '../../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';

const FunctionalMasterdataTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();

  const dispatch = useDispatch();

  const functionalMasterdataState = useSelector(getRlFunctionalMasterdataSelector);
  console.log('functionalMasterdataState', functionalMasterdataState);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone_Control',
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
      size: 90,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
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

  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );
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
    console.log(editTableData);
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'You need to select in table in order to edit', 'error');
    }
    if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one Organization to edit at a time', 'error');
    } else if (editTableIndex.length === 1) {
      console.log(editTableIndex, 'edit Table Index');
      setEditTableData(tableData.find((data, i) => data.id === editTableIndex[0]));
      console.log(editTableData, 'edit Table Data');
      setShowModal(true);
      setModalType('edit');
    }
  };
  const handleOnclickAdd = () => {
    setShowModal(true);
    setModalType('add');
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
        className="add-functionalmd"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title={modalType === 'add' ? 'Add Functional Masterdata' : 'Edit Functional Masterdata'}
        bodyClassName="p-0"
      >
        <FunctionalMasterdataModal
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          setEditTableData={setEditTableData}
          modalType={modalType}
        />
      </CustomModal>
    </>
  );
};

export default FunctionalMasterdataTable;

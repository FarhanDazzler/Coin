import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../components/UI/Table/Table2';
import '../TableStyle.scss';
import { getOrgStructuresSelector } from '../../../../../redux/MDM/MDM_Selectors';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import CustomModal from '../../../../../components/UI/CustomModal';
import OrgStructureModal from './OrgStructureModal';
import {
  addOrgStructureSelector,
  updateOrgStructureSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import { getOrgStructures, getOrgHierarchy } from '../../../../../redux/MDM/MDM_Action';
import Swal from 'sweetalert2';

const OrgStructuresTable = () => {
  const dispatch = useDispatch();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const addOrgState = useSelector(addOrgStructureSelector);
  const updateOrgState = useSelector(updateOrgStructureSelector);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();

  useEffect(() => {
    setShowModal(false);
    setModalType('');
    dispatch(getOrgStructures());
    dispatch(getOrgHierarchy());
  }, [addOrgState.data, updateOrgState?.data]);

  const orgStructures = useSelector(getOrgStructuresSelector);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Org_name',
      id: 'Org_name',
      header: 'Organization Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Org_code',
      id: 'Org_code',
      header: 'Organization Code',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Org_type',
      id: 'Org_type',
      header: 'Organization Type',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'parent_entity',
      id: 'parent_entity',
      header: 'Parent Entity',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 110,
    },
    {
      accessorKey: 'isReceiver',
      id: 'isReceiver',
      header: 'Is Receiver',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 110,
    },
    {
      accessorKey: 'isProvider',
      id: 'isProvider',
      header: 'Is Provider',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 110,
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
      accessorKey: 'Valid_from',
      id: 'Valid_from',
      header: 'Valid From',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Valid_to',
      id: 'Valid_to',
      header: 'Valid To',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      orgStructures.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [orgStructures.data]);

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
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'You need to select in table in order to edit', 'error');
    }
    if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one Organization to edit at a time', 'error');
    } else if (editTableIndex.length === 1) {
      console.log(editTableIndex, 'edit Table Index');
      setEditTableData(tableData.find((data, i) => i.toString() === editTableIndex[0]));
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
      <div className="container-fluid mt-5" id="ModifyOrganizations">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>
                    Create or modify an Organization within the Organization Hierarchy
                  </span>
                </div>
                <div>
                  <>
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
                  </>
                </div>
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={orgStructures.loading}
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
        title={modalType === 'add' ? 'Add Organization Hierarchy' : 'Edit Organization Hierarchy'}
        bodyClassName="p-0"
      >
        <OrgStructureModal
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          setEditTableData={setEditTableData}
          modalType={modalType}
        />
      </CustomModal>
    </>
  );
};

export default OrgStructuresTable;

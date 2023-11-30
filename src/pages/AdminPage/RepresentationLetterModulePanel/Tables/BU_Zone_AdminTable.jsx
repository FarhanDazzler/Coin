import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import Table2 from '../../../../components/UI/Table/Table2';
import Button from '../../../MDM/MDM_Tab_Buttons/Button';
import CustomModal from '../../../../components/UI/CustomModal';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// geting data from redux
import {
  get_BU_Zone_Roles,
  delete_BU_Zone_AdminRole,
} from '../../../../redux/AdminPage/AdminPageAction';
import BU_Zone_Model from './BU_Zone_Model.jsx';
import {
  get_BU_Zone_RolesSelector,
  add_BU_Zone_AdminRoleSelector,
  modify_BU_Zone_AdminRoleSelector,
  delete_BU_Zone_AdminRoleSelector,
} from '../../../../redux/AdminPage/AdminPageSelectors.js';

const BU_Zone_AdminTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editTableData, setEditTableData] = useState();

  const dispatch = useDispatch();

  //const getAll_Roles_data = useSelector(getAll_RolesSelector);
  const get_BU_Zone_RolesState = useSelector(get_BU_Zone_RolesSelector);
  const add_BU_Zone_AdminRoleState = useSelector(add_BU_Zone_AdminRoleSelector);
  const modify_BU_Zone_AdminRoleState = useSelector(modify_BU_Zone_AdminRoleSelector);
  const delete_BU_Zone_AdminRoleState = useSelector(delete_BU_Zone_AdminRoleSelector);

  useEffect(() => {
    dispatch(get_BU_Zone_Roles());
    setShowModal(false);
  }, [
    add_BU_Zone_AdminRoleState?.data,
    modify_BU_Zone_AdminRoleState?.data,
    delete_BU_Zone_AdminRoleState?.data,
  ]);

  const getAll_ZIC_Role = get_BU_Zone_RolesState?.data;

  // for closing POP up after confirm
  useEffect(() => {
    setShowModal(false);
  }, [getAll_ZIC_Role]);

  const handleAdd = () => {
    setShowModal(true);
    setModalType('add');
  };

  const handleEdit = (data) => {
    console.log(data, 'edit data');
    setEditTableData(data);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (data) => {
    if (data) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Selected role will be deleted?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gold',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, submit it!',
      }).then((res) => {
        if (res.isConfirmed) {
          let payload = {
            ZIC_OID: data.oid,
          };

          //console.log(payload, 'ZIC delete payload');
          dispatch(delete_BU_Zone_AdminRole(payload));
        }
      });
    }
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Role',
      id: 'Role',
      header: 'Role',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return <span className="golden-text">Zonal Internal Control</span>;
      },
    },
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },

    {
      accessorKey: 'Email',
      id: 'Email',
      header: 'Email',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    // {
    //   accessorKey: 'zic_oid',
    //   id: 'zic_oid',
    //   header: 'Object ID',
    //   flex: 1,
    //   columnDefType: 'data',
    //   cellClassName: 'dashboardCell',
    //   size: 90,
    // },
    {
      accessorKey: 'Actions',
      id: 'Actions',
      header: 'Actions',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 80,
      Cell: (row) => {
        return (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleEdit(row.row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.row.original)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      getAll_ZIC_Role?.map((i, index) => {
        return {
          id: getAll_ZIC_Role[index].oid,
          ...i,
        };
      }),
    );
  }, [getAll_ZIC_Role]);

  const ActiveToolAdd = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>
                    {' '}
                    Business Unit Zone IC Persona Role Table
                  </span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolAdd text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleAdd}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {tableData?.length && (
            <div className="col-12 col-lg-12">
              <Table2
                tableData={tableData}
                loading={get_BU_Zone_RolesState.loading}
                tableColumns={tableColumns}
              />
            </div>
          )}
        </div>
      </div>

      <CustomModal
        className="add-org"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title={
          modalType === 'add'
            ? 'Add individual for Business Unit Zone IC Persona'
            : 'Modify individual for Business Unit Zone IC Persona'
        }
        bodyClassName="p-0"
      >
        <BU_Zone_Model
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          setEditTableData={setEditTableData}
          modalType={modalType}
        />
      </CustomModal>
    </>
  );
};

export default BU_Zone_AdminTable;

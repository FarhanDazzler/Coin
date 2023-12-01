import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import Table2 from '../../../../components/UI/Table/Table2';
import Button from '../../../MDM/MDM_Tab_Buttons/Button';
import CustomModal from '../../../../components/UI/CustomModal';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// geting data from redux
import { getAll_Roles } from '../../../../redux/AdminPage/AdminPageAction';
//import { getAll_RolesSelector } from '../../../../redux/AdminPage/AdminPageSelectors.js';

import Functional_Model from './Functional_Model';
import { deleteAdminRole } from '../../../../redux/AdminPage/AdminPageAction';
import {
  getAll_RolesSelector,
  addAdminRoleSelector,
  modifyAdminRoleSelector,
  deleteAdminRoleSelector,
} from '../../../../redux/AdminPage/AdminPageSelectors.js';

const Functional_AdminTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editTableData, setEditTableData] = useState();

  const dispatch = useDispatch();

  //const getAll_Roles_data = useSelector(getAll_RolesSelector);
  const getAll_Roles_data = useSelector(getAll_RolesSelector);
  const addAdminRoleState = useSelector(addAdminRoleSelector);
  const modifyAdminRoleState = useSelector(modifyAdminRoleSelector);
  const deleteAdminRoleState = useSelector(deleteAdminRoleSelector);

  useEffect(() => {
    dispatch(getAll_Roles());
    setShowModal(false);
  }, [addAdminRoleState?.data, modifyAdminRoleState?.data, deleteAdminRoleState?.data]);

  const getAll_GIC_Role =
    getAll_Roles_data?.data?.length &&
    getAll_Roles_data?.data[1]?.length &&
    getAll_Roles_data?.data[1][1]?.Functioanl_Admins?.length &&
    getAll_Roles_data?.data[1][1]?.Functioanl_Admins[0]?.length &&
    getAll_Roles_data?.data[1][1]?.Functioanl_Admins[0];

  // for closing POP up after confirm
  useEffect(() => {
    setShowModal(false);
  }, [getAll_GIC_Role]);

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
            Module: 'REP_Admins',
            Zone: 'Functional',
            IC_Email: data.email,
            IC_OID: data.oid,
          };

          console.log(payload, 'Functional delete payload');
          dispatch(deleteAdminRole(payload));
        }
      });
    }
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'email',
      id: 'email',
      header: 'Email',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
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
      getAll_GIC_Role?.length &&
        getAll_GIC_Role?.map((i, index) => {
          return {
            id: getAll_GIC_Role[index].oid,
            ...i,
          };
        }),
    );
  }, [getAll_GIC_Role]);

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
                  <span style={{ paddingLeft: '16px' }}>Functional Global Persona Role Table</span>
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
                loading={getAll_Roles_data.loading}
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
            ? 'Add individual for Functional Global Persona'
            : 'Modify individual for Functional Global Persona'
        }
        bodyClassName="p-0"
      >
        <Functional_Model
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          setEditTableData={setEditTableData}
          modalType={modalType}
        />
      </CustomModal>
    </>
  );
};

export default Functional_AdminTable;

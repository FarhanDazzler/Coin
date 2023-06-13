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
import {
  getAll_RolesSelector,
  addAdminRoleSelector,
  modifyAdminRoleSelector,
  deleteAdminRoleSelector,
} from '../../../../redux/AdminPage/AdminPageSelectors.js';

import ZIC_Model from './ZIC_Model';
import GIC_Model from './GIC_Model';
import { deleteAdminRole } from '../../../../redux/AdminPage/AdminPageAction';

const GlobalInternalControlAdminTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editTableData, setEditTableData] = useState();

  const dispatch = useDispatch();
  // API Call using dispatch
  useEffect(() => {
    dispatch(getAll_Roles());
  }, []);

  const getAll_Roles_data = useSelector(getAll_RolesSelector);
  const addAdminRoleState = useSelector(addAdminRoleSelector);
  const modifyAdminRoleState = useSelector(modifyAdminRoleSelector);
  const deleteAdminRoleState = useSelector(deleteAdminRoleSelector);

  useEffect(() => {
    dispatch(getAll_Roles());
    setShowModal(false);
  }, [addAdminRoleState?.data, modifyAdminRoleState?.data, deleteAdminRoleState?.data]);

  const getAll_GIC_Role =
    getAll_Roles_data?.data[0]?.SA_Admins?.length &&
    getAll_Roles_data?.data[0]?.SA_Admins[0][0].Global_IC?.length &&
    getAll_Roles_data?.data[0]?.SA_Admins[0][0].Global_IC[0];

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
            Module: 'SA_Admins',
            Zone: 'Global',
            IC_Email: data.gic_email,
            IC_OID: data.gic_oid,
          };

          console.log(payload, 'GIC delete payload');
          dispatch(deleteAdminRole(payload));
        }
      });
    }
  };

  const TABLE_COLUMNS = [
    // {
    //   accessorKey: 'gic_oid',
    //   id: 'gic_oid',
    //   header: 'Object ID',
    //   flex: 1,
    //   columnDefType: 'data',
    //   cellClassName: 'dashboardCell',
    //   size: 90,
    // },
    {
      accessorKey: 'Role',
      id: 'Role',
      header: 'Role',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return <span className="golden-text">Global Internal Control</span>;
      },
    },
    {
      accessorKey: 'gic_email',
      id: 'gic_email',
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
      getAll_GIC_Role?.map((i, index) => {
        return {
          id: getAll_GIC_Role[index].gic_oid,
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
          {tableData?.length && (
            <div className="col-12 col-lg-12">
              <div className="mdm-table-button">
                <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                    <span style={{ paddingLeft: '16px' }}>Global Internal Control Role Table</span>
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
            ? 'Add individual for Global Internal Control'
            : 'Modify individual for Global Internal Control'
        }
        bodyClassName="p-0"
      >
        <GIC_Model
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          setEditTableData={setEditTableData}
          modalType={modalType}
        />
      </CustomModal>
    </>
  );
};

export default GlobalInternalControlAdminTable;

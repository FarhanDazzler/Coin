import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import EditIcon from '@mui/icons-material/Edit';
import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import {
  getApplicabilityAndAssignmentOfProviderOrganizationSelector,
  assignApplicabilityAndAssignmentOfProviderOrganizationSelector,
} from '../../../../../redux/MDM/MDM_Selectors';

import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';

import AssignModal from './AssignModal';
import EditModal from './EditModal';
import GlobalApprove from './GlobalApprove';
import CustomModal from '../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';

const ApplicabilityAndAssignmentOfProviderOrganizationTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGlobalApproveModal, setShowGlobalApproveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();

  const applicabilityAndAssignmentOfProviderOrganization = useSelector(
    getApplicabilityAndAssignmentOfProviderOrganizationSelector,
  );

  const assignApplicabilityAndAssignmentOfProviderOrganization = useSelector(
    assignApplicabilityAndAssignmentOfProviderOrganizationSelector,
  );

  // for closing POP after confirm
  useEffect(() => {
    setShowModal(false);
    setShowGlobalApproveModal(false);
    setShowEditModal(false);
  }, [
    applicabilityAndAssignmentOfProviderOrganization?.data,
    assignApplicabilityAndAssignmentOfProviderOrganization?.data,
  ]);

  const TABLE_COLUMNS = [
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    {
      field: 'Entity',
      headerName: 'Entity / Receiver',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 160,
    },
    {
      field: 'Entity_Control_ID_IsApplicable',
      headerName: 'Entity + Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      field: 'Is_applicable',
      headerName: 'Applicability',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 110,
    },
    {
      field: 'Provider_Entity',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'control_id_provider_entity',
      headerName: 'Control ID + Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      field: 'Reason_for_NA',
      headerName: 'Reason for NA',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Global_Approved',
      headerName: 'Global Approved',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Entity_Weight',
      headerName: 'Entity Weight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 140,
    },
    {
      field: 'is_SOX_scope',
      headerName: 'Is SOX scope',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 130,
    },
    {
      field: 'is_FSI_Entity',
      headerName: 'Is FSI Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 130,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      applicabilityAndAssignmentOfProviderOrganization.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [applicabilityAndAssignmentOfProviderOrganization.data]);

  const ActiveToolAssign = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const ActiveToolGlobalApprove = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const ActiveToolEdit = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <EditIcon color="black" />
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

  const handleOnclickGlobalApprove = () => {
    // Global Approve code

    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select table first to Approve', 'error');
    } else if (editTableIndex.length >= 1) {
      setAssignTableData(tableData.filter((data, i) => editTableIndex.includes(data.id)));
      setShowGlobalApproveModal(true);
    }
  };

  const handleOnclickEdit = () => {
    // Edit code

    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select table first to Edit', 'error');
    } else if (editTableIndex.length >= 1) {
      setAssignTableData(tableData.filter((data, i) => editTableIndex.includes(data.id)));
      setShowEditModal(true);
    }
  };
  console.log('@@@@@@@', tableData, tableColumns);
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
                    Applicability And Assignment Of ProviderOrganization Table
                  </span>
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
                    startIcon={<ActiveToolAssign text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAssign}
                  >
                    Assign Provider
                  </Button>
                  {localStorage.getItem('selected_Role') === 'Global internal control' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ActiveToolGlobalApprove text="Free Text" />}
                      className="add-button-mdm-table"
                      onClick={handleOnclickGlobalApprove}
                    >
                      Global Approved
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Table
              tableData={tableData}
              tableColumns={tableColumns}
              columns={tableColumns}
              setEditTableIndex={setEditTableIndex}
              loading={applicabilityAndAssignmentOfProviderOrganization.loading}
            />
          </div>
        </div>
      </div>
      <CustomModal
        className="add-org"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title="Assign Applicability And Assignment Of Provider Organization"
        bodyClassName="p-0"
      >
        <AssignModal setShowModal={setShowModal} assignTableData={assignTableData} />
      </CustomModal>
      <CustomModal
        className="add-org"
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        width={900}
        title="Edit"
        bodyClassName="p-0"
      >
        <EditModal setShowEditModal={setShowEditModal} assignTableData={assignTableData} />
      </CustomModal>
      <CustomModal
        className="add-org"
        open={showGlobalApproveModal}
        onClose={() => setShowGlobalApproveModal(false)}
        width={900}
        title="Global Approve"
        bodyClassName="p-0"
      >
        <GlobalApprove
          setShowGlobalApproveModal={setShowGlobalApproveModal}
          assignTableData={assignTableData}
        />
      </CustomModal>
    </>
  );
};

export default ApplicabilityAndAssignmentOfProviderOrganizationTable;

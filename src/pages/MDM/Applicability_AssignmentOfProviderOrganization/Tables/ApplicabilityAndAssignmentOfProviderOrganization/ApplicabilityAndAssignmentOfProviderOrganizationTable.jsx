import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';
import Table2 from '../../../../../components/UI/Table/Table2';

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
import CustomModal from '../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';

const ApplicabilityAndAssignmentOfProviderOrganizationTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
  }, [
    applicabilityAndAssignmentOfProviderOrganization.data?.message,
    assignApplicabilityAndAssignmentOfProviderOrganization?.data,
  ]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      header: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    {
      accessorKey: 'Entity',
      header: 'Receiver Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Entity_Control_ID_IsApplicable',
      header: 'Entity + Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      accessorKey: 'Is_applicable',
      header: 'Applicability',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 110,
    },
    {
      accessorKey: 'Provider_Entity',
      header: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'control_id_provider_entity',
      header: 'Control ID + Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      accessorKey: 'Reason_for_NA',
      header: 'Reason for NA',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Global_Approved',
      header: 'Global Approved',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Entity_Weight',
      header: 'Entity Weight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'is_SOX_scope',
      header: 'Is SOX scope',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'is_FSI_Entity',
      header: 'Is FSI Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
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

  const handleOnclickAssign = () => {
    console.log(editTableIndex, 'editTableIndex');
    // Assign code
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'You need to select table first to Assign', 'error');
    } else if (editTableIndex.length >= 1) {
      const filterData = tableData.filter((data, i) => editTableIndex.includes(i + ''));
      if (filterData?.length) {
        setAssignTableData(filterData);
        setShowModal(true);
      }
      //console.log(tableData.filter((data, i) => editTableIndex.includes(i + '')));
    }
  };

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
        title="Assign Applicability And Assignment Of ProviderOrganization"
        bodyClassName="p-0"
      >
        <AssignModal setShowModal={setShowModal} assignTableData={assignTableData} />
      </CustomModal>
    </>
  );
};

export default ApplicabilityAndAssignmentOfProviderOrganizationTable;

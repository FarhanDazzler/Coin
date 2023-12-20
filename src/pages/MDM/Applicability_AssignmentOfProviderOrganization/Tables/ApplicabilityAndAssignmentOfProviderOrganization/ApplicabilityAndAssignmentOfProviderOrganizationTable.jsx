import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import EditIcon from '@mui/icons-material/Edit';
import Table2 from '../../../../../components/UI/Table/Table2';
import '../TableStyle.scss';
// geting data from redux
import { getApplicabilityAndAssignmentOfProviderOrganization } from '../../../../../redux/MDM/MDM_Action';
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
import ApplicabilityAndAssignmentTableFilter from './ApplicabilityAndAssignmentTableFilter';
import { DotSpinner } from '@uiball/loaders';
import { ProductFeedback } from '@abi-ds-beerblocs/product-feedback-module-legacy';

const ApplicabilityAndAssignmentOfProviderOrganizationTable = ({ selectedZone }) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGlobalApproveModal, setShowGlobalApproveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [entityValue, setEntityValue] = useState([]);
  const [control_IDValue, setControl_IDValue] = useState([]);
  const [providerOrganizationValue, setProviderOrganizationValue] = useState([]);

  const { accounts } = useMsal();
  const [openNPS, setOpenNPS] = useState(false);

  const dispatch = useDispatch();

  const applicabilityAndAssignmentOfProviderOrganization = useSelector(
    getApplicabilityAndAssignmentOfProviderOrganizationSelector,
  );

  const assignApplicabilityAndAssignmentOfProviderOrganization = useSelector(
    assignApplicabilityAndAssignmentOfProviderOrganizationSelector,
  );

  // for closing POP after confirm
  useEffect(() => {
    if (applicabilityAndAssignmentOfProviderOrganization?.loading) {
      return;
    }
    setShowModal(false);
    setShowGlobalApproveModal(false);
    setShowEditModal(false);
    dispatch(
      getApplicabilityAndAssignmentOfProviderOrganization({
        zone: selectedZone,
      }),
    );
    setProviderOrganizationValue([]);
    setControl_IDValue([]);
    setEntityValue([]);

    if (assignApplicabilityAndAssignmentOfProviderOrganization.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [assignApplicabilityAndAssignmentOfProviderOrganization?.data]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 90,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'Entity',
      id: 'Entity',
      header: 'Entity / Receiver',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 200,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 160,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'Entity_Control_ID_IsApplicable',
      id: 'Entity_Control_ID_IsApplicable',
      header: 'Entity + Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'Is_applicable',
      id: 'Is_applicable',
      header: 'Applicability',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 110,
    },
    {
      accessorKey: 'Provider_Entity',
      id: 'Provider_Entity',
      header: 'Provider Organization',
      flex: 1,
      //filterFn: 'arrIncludesSome',
      size: 230,
      //filterVariant: 'multi-select',
    },
    {
      accessorKey: 'control_id_provider_entity',
      id: 'control_id_provider_entity',
      header: 'Provider Organization + Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'Reason_for_NA',
      id: 'Reason_for_NA',
      header: 'Reason for NA',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Global_Approved',
      id: 'Global_Approved',
      header: 'Global Approved',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'is_SOX_scope',
      id: 'is_SOX_scope',
      header: 'Is SOX scope',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 130,
    },
    {
      accessorKey: 'is_FSI_Entity',
      id: 'is_FSI_Entity',
      header: 'Is FSI Entity',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 130,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(applicabilityAndAssignmentOfProviderOrganization.data);
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

  useEffect(() => {
    const updateData = applicabilityAndAssignmentOfProviderOrganization?.data?.filter((i) => {
      return (
        (entityValue?.length ? entityValue.includes(i.Entity) : true) &&
        (control_IDValue?.length ? control_IDValue.includes(i.Control_ID) : true) &&
        (providerOrganizationValue?.length
          ? providerOrganizationValue.includes(i.Provider_Entity)
          : true)
      );
    });

    setTableData(updateData);
  }, [entityValue, control_IDValue, providerOrganizationValue]);

  const filterData = (key) => {
    const kayValuesArray =
      applicabilityAndAssignmentOfProviderOrganization?.data?.map((d) => d[key]) || [];
    const allData = [...new Set(kayValuesArray)];
    return allData.filter((d) => !!d);
  };

  return (
    <>
      <ProductFeedback
        env={process.env.REACT_APP_STAGE}
        apiKey={''}
        token={localStorage.getItem('nps-auth-token')}
        feedbackMetadata={{
          Activity:
            'IC Has done MDM modification in Applicability and Assignment of Provider Organization table',
          Created_By: {
            Email: accounts[0]?.username,
            name: accounts[0]?.name ? accounts[0].name : '',
          },
        }}
        productId={process.env.REACT_APP_NPS_PRODUCT_ID}
        productActivityId="nps_score_provided_IC"
        modalOpened={openNPS}
        setModalOpened={setOpenNPS}
      />
      {assignApplicabilityAndAssignmentOfProviderOrganization.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">Please wait a moment while we finalize the process</p>
        </div>
      ) : (
        <>
          <div className="container-fluid mt-5">
            <div className="row pt-5">
              <div className="col-12 col-lg-12">
                <div className="mdm-table-global-filters">
                  <ApplicabilityAndAssignmentTableFilter
                    //className={'mb-4'}
                    entityData={filterData('Entity')}
                    entityValue={entityValue}
                    setEntityValue={setEntityValue}
                    control_IDData={filterData('Control_ID')}
                    control_IDValue={control_IDValue}
                    setControl_IDValue={setControl_IDValue}
                    providerOrganizationData={filterData('Provider_Entity')}
                    providerOrganizationValue={providerOrganizationValue}
                    setProviderOrganizationValue={setProviderOrganizationValue}
                  />
                </div>
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
                        Applicability and Assign Provider
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
                <Table2
                  tableData={tableData}
                  loading={applicabilityAndAssignmentOfProviderOrganization.loading}
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
      )}
    </>
  );
};

export default ApplicabilityAndAssignmentOfProviderOrganizationTable;

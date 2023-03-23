import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getApplicabilityAndAssignmentOfProviderOrganizationSelector } from '../../../../../redux/MDM/MDM_Selectors';

const ApplicabilityAndAssignmentOfProviderOrganizationTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const applicabilityAndAssignmentOfProviderOrganization = useSelector(
    getApplicabilityAndAssignmentOfProviderOrganizationSelector,
  );

  const TABLE_COLUMNS = [
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Entity',
      headerName: 'Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Entity_Control_ID_IsApplicable',
      headerName: 'Entity*Control_ID*Is_applicable',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Is_applicable',
      headerName: 'Is Applicable',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
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
      minWidth: 200,
    },
    {
      field: 'Entity_Weight',
      headerName: 'Weight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'is_SOX_scope',
      headerName: 'Is SOX scope',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'is_FSI_Entity',
      headerName: 'Is FSI Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'control_id_provider_entity',
      headerName: 'control_id*provider_entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Provider_Entity',
      headerName: 'Provider Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_from',
      headerName: 'Valid From',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_to',
      headerName: 'Valid To',
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

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Applicability & Assignment of Provider Organization
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicabilityAndAssignmentOfProviderOrganizationTable;

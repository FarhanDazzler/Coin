import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getOrgHierarchySelector } from '../../../../../redux/MDM/MDM_Selectors';

const OrgHierarchyTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const orgHierarchy = useSelector(getOrgHierarchySelector);

  const TABLE_COLUMNS = [
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'BU',
      headerName: 'BU',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'country_entity',
      headerName: 'Country/Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'cognos_entity',
      headerName: 'Cognos_Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'sap_company_code',
      headerName: 'Sap_Company_Code',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'plant',
      headerName: 'Plant',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      orgHierarchy.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [orgHierarchy.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Organization Hierarchy
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgHierarchyTable;

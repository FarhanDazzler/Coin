import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';
import { getOrgStructuresSelector } from '../../../../../redux/MDM/MDM_Selectors';

const OrgStructuresTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();
  const orgStructures = useSelector(getOrgStructuresSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Org_type',
      headerName: 'Org_type',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'parent_entity',
      headerName: 'Parent Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'isReceiver',
      headerName: 'isReceiver',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'isProvider',
      headerName: 'isProvider',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Category',
      headerName: 'Category',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Org_name',
      headerName: 'Org_Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_from',
      headerName: 'Valid_from',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_to',
      headerName: 'Valid_to',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(orgStructures.data);
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Create or Modify Organizations
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgStructuresTable;

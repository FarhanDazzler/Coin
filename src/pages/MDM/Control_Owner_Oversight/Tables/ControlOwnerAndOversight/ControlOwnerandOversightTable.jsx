import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getControlOwnerAndOversightSelector } from '../../../../../redux/MDM/MDM_Selectors';

const ControlOwnerAndOversightTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const controlOwnerAndOversight = useSelector(getControlOwnerAndOversightSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'provider_entity',
      headerName: 'Provider Org',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'valid_from',
      headerName: 'Valid From',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'valid_to',
      headerName: 'Valid To',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'local_control_description',
      headerName: 'Local Control Desc(LCD)',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'cowner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'coversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      controlOwnerAndOversight.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [controlOwnerAndOversight.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Control Owner & Control Oversight
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlOwnerAndOversightTable;

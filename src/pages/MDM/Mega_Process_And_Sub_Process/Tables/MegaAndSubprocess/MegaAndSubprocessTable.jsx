import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getMegaAndSubprocessSelector } from '../../../../../redux/MDM/MDM_Selectors';

const MegaAndSubprocessTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const megaAndSubprocess = useSelector(getMegaAndSubprocessSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Type_of_Process',
      headerName: 'Type of Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Parent_Process',
      headerName: 'Parent Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Prefix',
      headerName: 'Prefix',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Name_2',
      headerName: 'Name 2',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Name_Detailed_Name',
      headerName: 'Name - Detailed Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      megaAndSubprocess.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [megaAndSubprocess.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Create or Modify Mega Process & Sub Process
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaAndSubprocessTable;

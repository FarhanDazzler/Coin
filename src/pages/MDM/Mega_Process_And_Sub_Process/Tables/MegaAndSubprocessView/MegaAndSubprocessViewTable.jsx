import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';
import { getMegaAndSubprocessViewSelector } from '../../../../../redux/MDM/MDM_Selectors';

const MegaAndSubprocessViewTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const megaAndSubprocessView = useSelector(getMegaAndSubprocessViewSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Mega_Process_Abbreviation',
      headerName: 'Mega Process Abbreviation',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Mega_Process_Name',
      headerName: 'Mega Process Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Sub_Process_Abbreviation',
      headerName: 'Sub Process Abbreviation',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Sub_Process_Name',
      headerName: 'Sub Process Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      megaAndSubprocessView.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [megaAndSubprocessView.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading">
                <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                Mega Process & Sub-Process Master Data
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaAndSubprocessViewTable;

import React, { useEffect, useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TABLE_ROES } from '../../../components/HomePage/HomePageTable/constant';
import Table from '../../../components/UI/Table';
import Button from '../../../components/UI/Button';

const QuestionBankTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const TABLE_COLUMNS = [
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'Provider_Org',
      headerName: 'Provider Org',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      renderCell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleControlIDClick(row.row.Control_ID)}
          >
            {row.row.Control_ID}
          </span>
        );
      },
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      renderCell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.Status}</span>;
      },
    },
    {
      field: 'Co_Owner',
      headerName: 'Co Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Co_Oversight',
      headerName: 'Co Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  const handleControlIDClick = (id) => {
    // TODO: Show modal new page
    // history.push(`${history.location.pathname}?Control_ID=${id}`);
  };

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(TABLE_ROES);
  }, []);

  return (
    <div>
      {/*<div className="d-flex justify-content-end mb-5 mt-5">
        <Button
          size="large"
          startIcon={<VisibilityOutlinedIcon style={{ color: 'white' }} />}
          className="ml-4 dark-btn"
        >
          View All
        </Button>
  </div> */}
      <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
    </div>
  );
};

export default QuestionBankTable;

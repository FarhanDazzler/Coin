import React, { useEffect, useState } from 'react';
import Table2 from '../../UI/Table/Table2';

const SummaryViewTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const dynamicSubColumns = []; // An array to store dynamically generated sub-columns

  // Generate sub-columns dynamically (for example, based on an API response)
  for (let i = 1; i <= 50; i++) {
    dynamicSubColumns.push({
      accessorKey: `${i}`,
      id: `${i}`,
      header: `${i}`,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 50,
    });
  }
  const dynamicSubValue = []; // An array to store dynamically generated sub-columns

  // Generate sub-columns dynamically (for example, based on an API response)
  for (let i = 1; i <= 50; i++) {
    dynamicSubValue.push({
      i: 'yes',
    });
  }

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Entity_Id',
      id: 'Entity_Id',
      header: 'Entity Id',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      header: 'Questions',
      columns: dynamicSubColumns,
    },
    {
      accessorKey: 'Total',
      header: 'Total',
      columns: [
        {
          accessorKey: 'yes',
          id: 'yes',
          header: 'Yes',
          flex: 1,
          columnDefType: 'data',
          cellClassName: 'dashboardCell',
          size: 120,
        },
        {
          accessorKey: 'no',
          id: 'no',
          header: 'No',
          flex: 1,
          columnDefType: 'data',
          cellClassName: 'dashboardCell',
          size: 120,
        },
        {
          accessorKey: 'na',
          id: 'na',
          header: 'NA',
          flex: 1,
          columnDefType: 'data',
          cellClassName: 'dashboardCell',
          size: 120,
        },
        {
          accessorKey: 'total',
          id: 'total',
          header: 'Total',
          flex: 1,
          columnDefType: 'data',
          cellClassName: 'dashboardCell',
          size: 120,
        },
      ],
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData([
      { Entity_Id: 1008, 1: 'yes', yes: 1, no: 0, na: 0, total: 1 },
      { Entity_Id: 1009, 1: 'yes', yes: 1, no: 0, na: 0, total: 1 },
      { Entity_Id: 1010, 1: 'yes', yes: 1, no: 0, na: 0, total: 1 },
      { Entity_Id: 1011, 1: 'yes', yes: 1, no: 0, na: 0, total: 1 },
      { Entity_Id: 1012, 1: 'yes', yes: 1, no: 0, na: 0, total: 1 },
    ]);
  }, []);

  return (
    <div>
      <div className="container-fluid pt-5">
        <Table2
          tableColumns={tableColumns}
          tableData={tableData}
          initialState={{
            columnPinning: { left: ['Entity_Id'], right: ['yes', 'no', 'na', 'total', 'Total'] },
          }}
        />
      </div>
    </div>
  );
};

export default SummaryViewTable;

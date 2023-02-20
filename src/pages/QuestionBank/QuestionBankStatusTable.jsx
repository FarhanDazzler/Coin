import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../assets/styles/custom.css';
import {
  class_to_apply,
  QuestionBank_Landing_page_data,
} from '../../components/HomePage/HomePageTable/constant';
import { useEffect, useState } from 'react';
import '../../components/HomePage/HomePageTable/tableStyles.scss';

const QuestionBankLandingPageTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  const TABLE_COLUMNS = [
    {
      field: 'Mega_Process',
      headerName: 'Mega Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 70,
    },
    {
      field: 'Sub_Process',
      headerName: 'Sub Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
    },
    {
      field: 'Control_Name',
      headerName: 'Control Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(QuestionBank_Landing_page_data);
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <DataGrid
              sx={{ width: '100%' }}
              rows={tableData}
              className="remove-search-boarder"
              componentsProps={{
                toolbar: { showQuickFilter: true },
              }}
              components={{
                Toolbar: GridToolbar,
              }}
              columns={tableColumns}
              autoHeight
              classes={{
                root: 'main-table-wrapper',
                footerContainer: 'main-table-wrapper-footer',
                columnHeaderTitleContainer: 'justify-content-center',
                iconSeparator: 'opacity-0',
                toolbarContainer: 'table-toolbar-wrapper',
                panel: 'table-panel-wrapper',
                panelHeader: '4564',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBankLandingPageTable;

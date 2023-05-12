import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';
import {
  getMegaAndSubprocessViewSelector,
  megaAndSubprocessManageButtonSelector,
} from '../../../../../redux/MDM/MDM_Selectors';

import { megaAndSubprocessManageButton } from '../../../../../redux/MDM/MDM_Action';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';

const MegaAndSubprocessViewTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const megaAndSubprocessView = useSelector(getMegaAndSubprocessViewSelector);
  const megaAndSubprocessManageButtonState = useSelector(megaAndSubprocessManageButtonSelector);

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

  const handleOnclickTableUnhide = () => {
    dispatch(megaAndSubprocessManageButton(!megaAndSubprocessManageButtonState));
  };
  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>
                    {' '}
                    Mega Process & Sub-Process Master Data
                  </span>
                </div>
                {localStorage.getItem('selected_Role') === 'Global internal control' && (
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ActiveTool text="Free Text" />}
                      className="active-tab-button"
                      onClick={handleOnclickTableUnhide}
                    >
                      Manage Mega & Sub Processes
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Table
              tableData={tableData}
              loading={megaAndSubprocessView.loading}
              tableColumns={tableColumns}
              columns={tableColumns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaAndSubprocessViewTable;

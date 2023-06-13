import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../../../components/UI/Table/Table2';
import '../TableStyle.scss';
// geting data from redux
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import { getRlOrgHierarchySelector } from '../../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';

const OrgHierarchyTable = ({setRlOrgManageButtonState}) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const orgHierarchy = useSelector(getRlOrgHierarchySelector);


  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Cognos_Code',
      id: 'Cognos_Code',
      header: 'Cognos Code',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Cognos_Entity_Name',
      id: 'Cognos_Entity_Name',
      header: 'Cognos Entity Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
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
  }, []);
  const handleOnclickTableUnhide = () => {
    setRlOrgManageButtonState(true);
    setTimeout(() => {
      const dom = document.getElementById('RlModifyOrganizations');
      if (dom) {
        dom.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      }
    }, 500);
  };

  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );


  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            {/*<FilterButtons zone={removeDuplicates(zoneArray)} />*/}
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>Organization Hierarchy</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveTool text="Free Text" />}
                    className="active-tab-button"
                    onClick={handleOnclickTableUnhide}
                  >
                    Manage Organization Hierarchy
                  </Button>
                </div>
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={orgHierarchy.loading}
              tableColumns={tableColumns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgHierarchyTable;

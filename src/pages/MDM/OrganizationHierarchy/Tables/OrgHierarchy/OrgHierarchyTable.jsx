import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import {
  getOrgHierarchySelector,
  orgManageButtonSelector,
} from '../../../../../redux/MDM/MDM_Selectors';

import { Group } from '@mantine/core';
import MultiSelectButton from '../../../../../components/Buttons/MultiSelect/MultiSelectButtonComponents.js';

import { orgManageButton } from '../../../../../redux/MDM/MDM_Action';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';

const FilterButtons = (props) => {
  return (
    <div>
      <Group spacing="xs">
        <MultiSelectButton data={props.zone} label="Zone" placeholder="Select your option" />
      </Group>
    </div>
  );
};

const OrgHierarchyTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const orgHierarchy = useSelector(getOrgHierarchySelector);
  const orgManageButtonState = useSelector(orgManageButtonSelector);

  const TABLE_COLUMNS = [
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 80,
    },
    {
      field: 'BU',
      headerName: 'BU',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 230,
    },
    {
      field: 'country_entity',
      headerName: 'Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    {
      field: 'cognos_entity',
      headerName: 'Cognos',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    {
      field: 'sap_company_code',
      headerName: 'SAP / ERP',
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

  const handleOnclickTableUnhide = () => {
    dispatch(orgManageButton(!orgManageButtonState));
    setTimeout(() => {
      const dom = document.getElementById('ModifyOrganizations');
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

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const zoneArray = orgHierarchy.data.map((i) => i.zone);
  //zoneArray = removeDuplicates(zoneArray);

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
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgHierarchyTable;

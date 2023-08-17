import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../components/UI/Table/Table2';
import '../TableStyle.scss';
// geting data from redux
import {
  getOrgHierarchySelector,
  orgManageButtonSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import { orgManageButton } from '../../../../../redux/MDM/MDM_Action';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Tooltip from '@mui/material/Tooltip';
import OrgHierarchyTableFilterButtons from './OrgHierarchyTableFilterButtons';
import { updateOrgStructureSelector, addOrgStructureSelector } from '../../../../../redux/MDM/MDM_Selectors';

const OrgHierarchyTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const [zoneValue, setZoneValue] = useState([]);
  const [entityValue, setEntityValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const addOrgState = useSelector(addOrgStructureSelector);
  const updateOrgState = useSelector(updateOrgStructureSelector);
  const orgHierarchy = useSelector(getOrgHierarchySelector);
  const orgManageButtonState = useSelector(orgManageButtonSelector);
  useEffect(() => {
    setBUValue([]);
    setEntityValue([]);
    setZoneValue([]);
  }, [addOrgState.data, updateOrgState?.data]);
  const TABLE_COLUMNS = [
    {
      accessorKey: 'zone',
      id: 'zone',
      header: 'Zone',
      flex: 1,
      filterFn: 'arrIncludesSome',
      size: 90,
      filterVariant: 'multi-select',
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'Business Unit',
      flex: 1,
      filterFn: 'arrIncludesSome',
      size: 230,
      filterVariant: 'multi-select',
    },
    {
      accessorKey: 'country_entity',
      id: 'country_entity',
      header: 'Entity',
      flex: 1,
      filterFn: 'arrIncludesSome',
      size: 90,
      filterVariant: 'multi-select',
    },
    {
      accessorKey: 'cognos_entity',
      id: 'cognos_entity',
      header: 'Cognos',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'sap_company_code',
      id: 'sap_company_code',
      header: 'SAP / ERP',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'plant',
      id: 'plant',
      header: 'Plant',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
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

  useEffect(() => {
    const updateData = orgHierarchy.data.filter((i) => {
      return (
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.zone) : true) &&
        (entityValue?.length ? entityValue.includes(i.country_entity) : true)
      );
    });

    setTableData(
      updateData.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [zoneValue, entityValue, buValue]);

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

  const filterData = (key) => {
    const kayValuesArray = orgHierarchy?.data?.map((d) => d[key]) || [];
    const allData = [...new Set(kayValuesArray)];
    return allData.filter((d) => !!d);
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-global-filters">
              <OrgHierarchyTableFilterButtons
                zone={removeDuplicates(zoneArray)}
                zoneData={filterData('zone')}
                zoneValue={zoneValue}
                setZoneValue={setZoneValue}
                entityData={filterData('country_entity')}
                entityValue={entityValue}
                setEntityValue={setEntityValue}
                BUData={filterData('BU')}
                buValue={buValue}
                setBUValue={setBUValue}
              />
            </div>
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

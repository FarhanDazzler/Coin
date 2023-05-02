import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import Swal from 'sweetalert2';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Table from '../../../../components/UI/Table';
import NoDataPlaceholder from '../../../../components/NoDataPlaceholder';
import { getDashBoardData } from '../../../../redux/DashBoard/DashBoardAction';
import { getDashBoardDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import Button from '../../../../components/UI/Button';
import PageWrapper from '../../../../components/wrappers/PageWrapper';

// Filter buttons
const FilterButtons = ({
  year,
  assessment_Cycle,
  Zone,
  BU,
  Receiver,
  Provider,
  yearValue,
  assessmentCycleValue,
  zoneValue,
  buValue,
  receiverValue,
  providerValue,
  setZoneValue,
  setBUValue,
  setReceiverValue,
  setProviderValue,
  setYearValue,
  setAssessmentCycleValue,
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <div>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={year}
          label={<span className="mantine-MultiSelect-label">{'Year'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={yearValue}
          onChange={(e) => {
            setYearValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={assessment_Cycle}
          label={<span className="mantine-MultiSelect-label">{'Assessment Cycle'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={assessmentCycleValue}
          onChange={(e) => {
            setAssessmentCycleValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Zone}
          label={<span className="mantine-MultiSelect-label">{'Zone'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={zoneValue}
          onChange={(e) => {
            setZoneValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={BU}
          label={<span className="mantine-MultiSelect-label">{'BU'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={buValue}
          onChange={(e) => {
            setBUValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Receiver}
          label={<span className="mantine-MultiSelect-label">{'Receiver Organization'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={receiverValue}
          onChange={(e) => {
            setReceiverValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Provider}
          label={<span className="mantine-MultiSelect-label">{'Provider Organization'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={providerValue}
          onChange={(e) => {
            setProviderValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

const InternalControlTable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  useEffect(() => {
    //code for getting Internal Control Home Page table data
    dispatch(
      getDashBoardData({
        email: accounts[0]?.username,
      }),
    );
  }, []);

  const getDashBoardDataState = useSelector(getDashBoardDataSelector);

  useEffect(() => {
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
      return setTableData(tableDataArray);
    }

    setTableData(
      tableDataArray.filter((i) => {
        return (
          (yearValue?.length ? yearValue.includes(i.Year) : true) &&
          (assessmentCycleValue?.length
            ? assessmentCycleValue.includes(i.Assessment_Cycle) &&
              (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
              (buValue?.length ? buValue.includes(i.BU) : true) &&
              (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
              (providerValue?.length ? providerValue.includes(i.Provider) : true)
            : true)
        );
      }),
    );
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, receiverValue, providerValue]);

  const TABLE_COLUMNS = [
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
    },
    {
      field: 'Receiver',
      headerName: 'Receiver Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Provider',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
    },
    {
      field: 'KPI_Result',
      headerName: 'KPI Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Assessment_Result',
      headerName: 'Assessment Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Compliance_Result',
      headerName: 'Compliance_Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Control_Owner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_Oversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Assessment_Cycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Year',
      headerName: 'Year',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = getDashBoardDataState?.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getDashBoardDataState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const Zone = getDashBoardDataState?.data.map((i) => i.Zone);
  const BU = getDashBoardDataState?.data.map((i) => i.BU);
  const Receiver = getDashBoardDataState?.data.map((i) => i.Receiver);
  const Provider = getDashBoardDataState?.data.map((i) => i.Provider);
  const year = getDashBoardDataState?.data.map((i) => i.Year);
  const assessment_Cycle = getDashBoardDataState?.data.map((i) => i.Assessment_Cycle);

  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
              <div className="container mt-5">
                <div className="row">
                  <div className="col col-lg-12">
                    <Group spacing="xs" className="actions-button-wrapper">
                      <FilterButtons
                        year={removeDuplicates(year)}
                        assessment_Cycle={removeDuplicates(assessment_Cycle)}
                        Zone={removeDuplicates(Zone)}
                        BU={removeDuplicates(BU)}
                        Receiver={removeDuplicates(Receiver)}
                        Provider={removeDuplicates(Provider)}
                        yearValue={yearValue}
                        assessmentCycleValue={assessmentCycleValue}
                        zoneValue={zoneValue}
                        buValue={buValue}
                        receiverValue={receiverValue}
                        providerValue={providerValue}
                        setYearValue={setYearValue}
                        setAssessmentCycleValue={setAssessmentCycleValue}
                        setZoneValue={setZoneValue}
                        setBUValue={setBUValue}
                        setReceiverValue={setReceiverValue}
                        setProviderValue={setProviderValue}
                      />
                    </Group>
                  </div>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  {tableData.length > 0 ? (
                    <Table
                      tableData={tableData}
                      tableColumns={tableColumns}
                      columns={tableColumns}
                      setEditTableIndex={setEditTableIndex}
                    />
                  ) : (
                    <NoDataPlaceholder />
                  )}
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-end">
                    <div>
                      <Button
                        size="large"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => {
                          history.push('/assessmentbank');
                        }}
                      >
                        Go Back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default InternalControlTable;

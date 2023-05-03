import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../assets/styles/custom.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import Table from '../../../components/UI/Table';
import NoDataPlaceholder from '../../../components/NoDataPlaceholder';
import {
  getAssessmentDetailsTableData,
  recallAssessment,
  reTriggerAssessment,
} from '../../../redux/AssessmentBank/AssessmentBankAction';
import { getAssessmentDetailsTableDataSelector } from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import Swal from 'sweetalert2';
import Button from '../../../components/UI/Button';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Filter buttons
const FilterButtons = ({
  Zone,
  BU,
  Receiver,
  Provider,
  Mega_Process,
  zoneValue,
  buValue,
  receiverValue,
  providerValue,
  megaProcessValue,
  setZoneValue,
  setBUValue,
  setReceiverValue,
  setProviderValue,
  setMegaProcessValue,
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <div>
      <Group spacing="xs">
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
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Mega_Process}
          label={<span className="mantine-MultiSelect-label">{'Mega Process'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={megaProcessValue}
          onChange={(e) => {
            setMegaProcessValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

const AssessmentDetailsTableData = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();
  //console.log(editTableIndex);

  useEffect(() => {
    //code for opening second table in pop up
    let params = {
      assessmentName: props.location.state.data?.SurveyName,
    };
    dispatch(getAssessmentDetailsTableData(params));
  }, [props.location.state.data?.SurveyName]);

  // multi choice user input State for filters button
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);
  const [megaProcessValue, setMegaProcessValue] = useState([]);

  const getAssessmentDetailsTableDataState = useSelector(getAssessmentDetailsTableDataSelector);

  useEffect(() => {
    if (
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length &&
      !megaProcessValue.length
    ) {
      return setTableData(tableDataArray);
    }

    setTableData(
      tableDataArray.filter((i) => {
        return (
          (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
          (buValue?.length ? buValue.includes(i.BU) : true) &&
          (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
          (providerValue?.length ? providerValue.includes(i.Provider) : true) &&
          (megaProcessValue?.length ? megaProcessValue.includes(i.Mega_Process) : true)
        );
      }),
    );
  }, [zoneValue, buValue, receiverValue, providerValue, megaProcessValue]);

  const TABLE_COLUMNS = [
    {
      field: 'Survey_Name',
      headerName: 'Assessment Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
      renderCell: (row) => {
        return <span className={'text-yellow cursor-pointer'}>{row.row.Control_ID}</span>;
      },
    },
    {
      field: 'Receiver',
      headerName: 'Receiver Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Provider',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Control_Owner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Control_Oversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Assessment_Cycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Survey_Status',
      headerName: 'Survey Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = getAssessmentDetailsTableDataState?.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getAssessmentDetailsTableDataState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const Zone = getAssessmentDetailsTableDataState?.data.map((i) => i.Zone);
  const BU = getAssessmentDetailsTableDataState?.data.map((i) => i.BU);
  const Receiver = getAssessmentDetailsTableDataState?.data.map((i) => i.Receiver);
  const Provider = getAssessmentDetailsTableDataState?.data.map((i) => i.Provider);
  const Mega_Process = getAssessmentDetailsTableDataState?.data.map((i) => i.Mega_Process);

  const handelRecall = () => {
    //code for Recall Assessment
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'Please select atleast Assessment one for Recalling', 'error');
    } else if (editTableIndex.length >= 1) {
      console.log(editTableIndex, 'editTableIndex');
      const data = tableData.filter((data, i) => editTableIndex.includes(data.id));
      //setEditTableData(data);
      console.log('@@@@@@@@@', data);

      let payload = {
        Assessment_ids: data,
        Modified_By: {
          Email: accounts[0]?.username,
          name: accounts[0]?.name ? accounts[0].name : '',
        },
      };
      console.log(payload, 'payload for Recall');
      dispatch(recallAssessment(payload));
    }
  };

  const handelTrigger = () => {
    //code for Triggering Assessment
    const data = tableData?.filter(
      (data, i) => editTableIndex?.includes(data.id) && data.Survey_Status === 'Recalled',
    );
    if (editTableIndex.length === 0 || !data.length) {
      Swal.fire(
        'Oops...',
        'Please select only Recalled Assessments from table for Re-Triggering',
        'error',
      );
    } else if (editTableIndex.length >= 1) {
      console.log(editTableIndex, 'editTableIndex');
      //setEditTableData(data);
      console.log('@@@@@@@@@', data);

      let payload = {
        Assessment_ids: data,
        Modified_By: {
          Email: accounts[0]?.username,
          name: accounts[0]?.name ? accounts[0].name : '',
        },
      };
      console.log(payload, 'payload for Re-Trigger');
      dispatch(reTriggerAssessment(payload));
    }
  };

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
                      <Button
                        size="large"
                        startIcon={<SettingsBackupRestoreOutlinedIcon />}
                        onClick={handelRecall}
                      >
                        Batch Recall
                      </Button>
                      <Button
                        size="large"
                        startIcon={<CampaignOutlinedIcon />}
                        onClick={handelTrigger}
                      >
                        Batch Re-Trigger
                      </Button>
                    </Group>
                  </div>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="col col-lg-12">
                    <Group spacing="xs" className="actions-button-wrapper">
                      <FilterButtons
                        Zone={removeDuplicates(Zone)}
                        BU={removeDuplicates(BU)}
                        Receiver={removeDuplicates(Receiver)}
                        Provider={removeDuplicates(Provider)}
                        Mega_Process={removeDuplicates(Mega_Process)}
                        zoneValue={zoneValue}
                        buValue={buValue}
                        receiverValue={receiverValue}
                        providerValue={providerValue}
                        megaProcessValue={megaProcessValue}
                        setZoneValue={setZoneValue}
                        setBUValue={setBUValue}
                        setReceiverValue={setReceiverValue}
                        setProviderValue={setProviderValue}
                        setMegaProcessValue={setMegaProcessValue}
                      />
                    </Group>
                  </div>
                </div>
              </div>

              <div className="container mt-5">
                <div className="row">
                  {tableData?.length > 0 ? (
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

export default AssessmentDetailsTableData;

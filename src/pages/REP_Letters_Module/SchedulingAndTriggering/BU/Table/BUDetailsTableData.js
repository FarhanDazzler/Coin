import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../../assets/styles/custom.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import Table2 from '../../../../../components/UI/Table/Table2';
import NoDataLetterPlaceholder from './NoDataPlaceHolder';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import Swal from 'sweetalert2';
import Button from '../../../../../components/UI/Button';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import {
  getRlBuLetterData,
  recallBuLetter,
  reTriggerBuLetter,
} from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';
import { getBudataSelector } from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';

const BUDetailsTableData = (props) => {
  console.log('props', props);
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();
  const getBudataState = useSelector(getBudataSelector);
  //console.log(editTableIndex);

  useEffect(() => {
    //code for opening second table in pop up
    let params = {
      Title: props.location.state.data?.Tilte,
      Created_On: props.location.state.data?.Created_On,
      Created_By: props.location.state.data?.Created_By,
      Assessment_Cycle: props.location.state.data?.Assessment_Cycle,
      Year: props.location.state.data?.Year,
    };
    dispatch(getRlBuLetterData(params));
  }, [
    props.location.state.data?.Tilte,
    props.location.state.data?.Created_On,
    props.location.state.data?.Created_By,
    props.location.state.data?.Assessment_Cycle,
    props.location.state.data?.Year,
  ]);

  useEffect(() => {}, []);

  const class_to_apply = (item) => {
    let className = '';
    if (item.toUpperCase() === 'ACTIVE') {
      className = 'badge badge-success';
    }
    if (item.toUpperCase() === 'INACTIVE') {
      className = 'badge badge-red';
    }
    return className;
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'BU_Head',
      id: 'BU_Head',
      header: 'BU Head',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    
    {
      accessorKey: 'Survey_Status',
      id: 'Survey_Status',
      header: 'Survey Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Disclosure Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Entity',
      id: 'Entity',
      header: 'Entity',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Title',
      id: 'Title',
      header: 'Title',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Finance_Director',
      id: 'Finance_Director',
      header: 'Finance Director',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Year',
      id: 'Year',
      header: 'Year',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },

  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = getBudataState?.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getBudataState?.data]);

  const handelRecall = () => {
    //code for Recall Assessment
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'Please select atleast one Letter for Recalling', 'error');
    } else if (editTableIndex.length >= 1) {
      console.log(editTableIndex, 'editTableIndex');
      let tableId = [];
      editTableIndex.map((data, i) => {
        let dataa = {
          id: null,
        };
        dataa.id = data;
        tableId.push(dataa);
      });
      console.log('tableId', tableId);
      //setEditTableData(data);

      let payload = {
        params: {
          Assessment_ids: tableId,
          Modified_By: {
            Email: accounts[0]?.username,
            name: accounts[0]?.name ? accounts[0].name : '',
          },
        },
        body: {
          Title: props.location.state.data?.Tilte,
          Created_On: props.location.state.data?.Created_On,
          Created_By: props.location.state.data?.Created_By,
          Assessment_Cycle: props.location.state.data?.Assessment_Cycle,
          Year: props.location.state.data?.Year,
        },
      };
      console.log(payload, 'payload for Recall');
      dispatch(recallBuLetter(payload));
    }
  };

  const handelTrigger = () => {
    //code for Triggering Assessment
    const dataUP = tableData?.filter(
      (data, i) => editTableIndex?.includes(data.id) && data.Survey_Status !== 'Recalled',
    );
    console.log("dataUP", dataUP);
    if (editTableIndex.length === 0 || dataUP.length !== 0) {
        console.log("hi")
      Swal.fire(
        'Oops...',
        'Please select only Recalled Letter from table for Re-Triggering',
        'error',
      );
    } else if (editTableIndex.length >= 1) {
      const data = tableData?.filter(
        (data, i) => editTableIndex?.includes(data.id) && data.Survey_Status === 'Recalled',
      );
      console.log(data);
      if (data.length) {
        let tableId = [];
        editTableIndex.map((data, i) => {
          let dataa = {
            id: null,
          };
          dataa.id = data;
          tableId.push(dataa);
        });
        console.log('tableId', tableId);
        //setEditTableData(data);

        let payload = {
          params: {
            Assessment_ids: tableId,
            Modified_By: {
              Email: accounts[0]?.username,
              name: accounts[0]?.name ? accounts[0].name : '',
            },
          },
          body: {
            Title: props.location.state.data?.Tilte,
            Created_On: props.location.state.data?.Created_On,
            Created_By: props.location.state.data?.Created_By,
            Assessment_Cycle: props.location.state.data?.Assessment_Cycle,
            Year: props.location.state.data?.Year,
          },
        };
        console.log(payload, 'payload for Re-Trigger');
        dispatch(reTriggerBuLetter(payload));
      }
    }
  };
  return (
    <PageWrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col-12 col-lg-12">
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

            <div className="container-fluid mt-5">
              <div className="row">
                {tableData?.length > 0 ? (
                  <Table2
                    tableData={tableData}
                    loading={getBudataSelector.loading}
                    tableColumns={tableColumns}
                    setEditTableIndex={setEditTableIndex}
                  />
                ) : (
                  <NoDataLetterPlaceholder />
                )}
              </div>
            </div>

            <div className="container-fluid mt-5">
              <div className="row">
                <div className="d-flex align-items-center justify-content-end">
                  <div>
                    <Button
                      size="large"
                      startIcon={<ArrowBackIosIcon />}
                      onClick={() => {
                        history.push('/REP-Letters/scheduling-and-triggering');
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
  );
};

export default BUDetailsTableData;

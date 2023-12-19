import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import { useMsal } from '@azure/msal-react';
import Table from '../../../../../components/UI/Table';
import Table2 from '../../../../../components/UI/Table/Table2';

import '../TableStyle.scss';

// geting data from redux
import { getMegaAndSubprocessSelector } from '../../../../../redux/MDM/MDM_Selectors';

import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

import CustomModal from '../../../../../components/UI/CustomModal';
import MegaAndSubprocessModal from './MegaAndSubprocessModal';
import {
  addMegaAndSubprocessSelector,
  updateMegaAndSubprocessSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import {
  getMegaAndSubprocessView,
  getMegaAndSubprocess,
} from '../../../../../redux/MDM/MDM_Action';
import Swal from 'sweetalert2';
import ProductFeedback from '../../../../../components/NPSFeedbackModule/ProductFeedback/ProductFeedback.js';

const MegaAndSubprocessTable = () => {
  const dispatch = useDispatch();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const addMegaAndSubprocessState = useSelector(addMegaAndSubprocessSelector);
  const updateMegaAndSubprocessState = useSelector(updateMegaAndSubprocessSelector);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();
  const { accounts } = useMsal();
  const [openNPS, setOpenNPS] = useState(false);

  useEffect(() => {
    if (addMegaAndSubprocessState || updateMegaAndSubprocessState) {
      setShowModal(false);
      setModalType('');
      dispatch(getMegaAndSubprocessView());
      dispatch(getMegaAndSubprocess());
    }
  }, [addMegaAndSubprocessState.data, updateMegaAndSubprocessState.data]);

  // to open NPS feedback modal
  useEffect(() => {
    if (addMegaAndSubprocessState.success || updateMegaAndSubprocessState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [addMegaAndSubprocessState, updateMegaAndSubprocessState]);

  const megaAndSubprocess = useSelector(getMegaAndSubprocessSelector);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Type_of_Process',
      id: 'Type_of_Process',
      header: 'Type of Process',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      //size: 200,
    },
    {
      accessorKey: 'Parent_Process',
      id: 'Parent_Process',
      header: 'Parent Process',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      //size: 200,
    },
    {
      accessorKey: 'Prefix',
      id: 'Prefix',
      header: 'Prefix',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      //size: 200,
    },
    {
      accessorKey: 'Name_2',
      id: 'Name_2',
      header: 'Name 2',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      //size: 200,
    },
    {
      accessorKey: 'Name_Detailed_Name',
      id: 'Name_Detailed_Name',
      header: 'Name - Detailed Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      //size: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      megaAndSubprocess.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [megaAndSubprocess.data]);

  const ActiveToolADD = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const ActiveToolEdit = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <EditIcon color="black" />
    </Tooltip>
  );

  const handleOnclickEdit = () => {
    // edit code
    //console.log(tableData);
    if (editTableIndex.length === 0) {
      Swal.fire('Oops...', 'You need to select from table in order to edit', 'error');
    } else if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one Mega and Subprocess to edit at a time', 'error');
    } else if (editTableIndex.length == 1) {
      const data = tableData.find((data, i) => data.id === editTableIndex[0]);
      setEditTableData(data);
      setShowModal(true);
      setModalType('edit');
    }
  };
  const handleOnclickAdd = () => {
    // Add code
    setShowModal(true);
    setModalType('add');
  };

  return (
    <>
      <ProductFeedback
        env={process.env.REACT_APP_STAGE}
        apiKey={''}
        token={localStorage.getItem('nps-auth-token')}
        feedbackMetadata={{
          Activity: 'IC Has done MDM modification for Mega and Subprocess',
          Created_By: {
            Email: accounts[0]?.username,
            name: accounts[0]?.name ? accounts[0].name : '',
          },
        }}
        productId={process.env.REACT_APP_NPS_PRODUCT_ID}
        productActivityId="nps_score_provided_IC"
        modalOpened={openNPS}
        setModalOpened={setOpenNPS}
      />
      <div className="container-fluid mt-5" id="MegaAndSubprocessManage">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>
                    Mega Process & Sub-Process Master Data
                  </span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolEdit text="Free Text" />}
                    className="edit-button-mdm-table"
                    onClick={handleOnclickEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolADD text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAdd}
                  >
                    Add New
                  </Button>
                </div>
              </div>
            </div>
            <Table2
              tableData={tableData}
              loading={megaAndSubprocess.loading}
              tableColumns={tableColumns}
              setEditTableIndex={setEditTableIndex}
            />
          </div>
        </div>
      </div>
      <CustomModal
        className="add-org"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title={modalType === 'add' ? 'Add Mega And Subprocess' : 'Edit Mega And Subprocess'}
        bodyClassName="p-0"
      >
        <MegaAndSubprocessModal
          setShowModal={setShowModal}
          ediatbleData={editTableData}
          modalType={modalType}
          setEditTableData={setEditTableData}
        />
      </CustomModal>
    </>
  );
};

export default MegaAndSubprocessTable;

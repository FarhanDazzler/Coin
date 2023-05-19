import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getMegaAndSubprocessSelector } from '../../../../../redux/MDM/MDM_Selectors';

import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
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
  console.log(editTableIndex);
  console.log(addMegaAndSubprocessState);

  useEffect(() => {
    if (addMegaAndSubprocessState || updateMegaAndSubprocessState) {
      setShowModal(false);
      setModalType('');
      dispatch(getMegaAndSubprocessView());
      dispatch(getMegaAndSubprocess());
    }
  }, [addMegaAndSubprocessState.data, updateMegaAndSubprocessState.data]);

  const megaAndSubprocess = useSelector(getMegaAndSubprocessSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Type_of_Process',
      headerName: 'Type of Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Parent_Process',
      headerName: 'Parent Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Prefix',
      headerName: 'Prefix',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Name_2',
      headerName: 'Name 2',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Name_Detailed_Name',
      headerName: 'Name - Detailed Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
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
    console.log(tableData);
    if (editTableIndex.length > 1) {
      Swal.fire('Oops...', 'You can only allow one Mega and Subprocess to edit at a time', 'error');
    } else if (editTableIndex.length == 1) {
      console.log(editTableIndex, 'editTableIndex');
      const data = tableData.find((data, i) => data.id === editTableIndex[0]);
      setEditTableData(data);
      console.log('@@@@@@@@@', data);
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
      <div className="container mt-5" id='MegaAndSubprocessManage'>
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
            <Table
              tableData={tableData}
              tableColumns={tableColumns}
              columns={tableColumns}
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

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';
import { getOrgStructuresSelector } from '../../../../../redux/MDM/MDM_Selectors';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import OrgStructureModal from './OrgStructureModal';
import { addOrgStructureSelector } from '../../../../../redux/MDM/MDM_Selectors';

const OrgStructuresTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const addOrgState = useSelector(addOrgStructureSelector);
  console.log(addOrgState);
  useEffect(() => {
    if(addOrgState){
      setShowModal(false);
    setModalType("");
    }
  }, [addOrgState])
  const dispatch = useDispatch();

  const orgStructures = useSelector(getOrgStructuresSelector);

  const TABLE_COLUMNS = [
    {
      field: 'Org_type',
      headerName: 'Org_type',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'parent_entity',
      headerName: 'Parent Entity',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'isReceiver',
      headerName: 'isReceiver',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'isProvider',
      headerName: 'isProvider',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Category',
      headerName: 'Category',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Org_name',
      headerName: 'Org_Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_from',
      headerName: 'Valid_from',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Valid_to',
      headerName: 'Valid_to',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      orgStructures.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [orgStructures.data]);

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
    setShowModal(true);
    setModalType("edit");
  };
  const handleOnclickAdd = () => {
    setShowModal(true);
    setModalType("add");
  };
 

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>Create or Modify Organizations</span>
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
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
      <CustomModal
        className='add-org'
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title={modalType === "add" ? "Add Organization Hierarchy" : "Edit Organization Hierarchy"}
        bodyClassName="p-0"
      >
       <OrgStructureModal />
      </CustomModal>
    </>
  );
};

export default OrgStructuresTable;

import React, { useEffect, useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TABLE_ROES } from '../../../components/HomePage/HomePageTable/constant';
import Table from '../../../components/UI/Table';
import Button from '../../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import './TableStyle.scss';
import CustomModal from '../../../components/UI/CustomModal';
import ControlidTableModal from './ControlidTableModal';

// geting data from redux
import { getRepositoryOfControlIDSelector } from '../../../redux/Questions/QuestionsSelectors';

const QuestionBankTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedControlId, setSelectedControlId] = useState();

  const repositoryOfControlID = useSelector(getRepositoryOfControlIDSelector);
  console.log(repositoryOfControlID, 'Table data');

  const handleControlIDClick = (id) => {
    console.log(id);
    setShowModal(true);
    setSelectedControlId(id);
    // TODO: Show modal new page
    // history.push(`${history.location.pathname}?Control_ID=${id}`);
  };

  const TABLE_COLUMNS = [
    {
      field: 'Mega_Process',
      headerName: 'Mega Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Sub_Process',
      headerName: 'Sub Process',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      renderCell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleControlIDClick(row.row.Control_ID)}
          >
            {row.row.Control_ID}
          </span>
        );
      },
    },
    {
      field: 'Control_Name',
      headerName: 'Control Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      repositoryOfControlID.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [repositoryOfControlID.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="questionBank-table-button">
              <div className="table-heading">Repository of Control IDs</div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
      <CustomModal
        className="schedule-survey"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title={`Questions for ${selectedControlId}`}
      >
        <ControlidTableModal selectedControlId={selectedControlId} handleClose={() => setShowModal(false)}/>
      </CustomModal>
    </>
  );
};

export default QuestionBankTable;

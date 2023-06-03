import React, { useEffect, useState } from 'react';
import Table from '../../../components/UI/Table';
import Table2 from '../../../components/UI/Table/Table2';
import { useSelector } from 'react-redux';
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
      accessorKey: 'Mega_Process',
      id: 'Mega_Process',
      header: 'Mega Process',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Sub_Process',
      id: 'Sub_Process',
      header: 'Sub Process',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleControlIDClick(row.row.original.Control_ID)}
          >
            {row.row.original.Control_ID}
          </span>
        );
      },
    },
    {
      accessorKey: 'Control_Name',
      id: 'Control_Name',
      header: 'Control Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
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
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <div className="questionBank-table-button">
              <div className="table-heading">Repository of Control IDs</div>
            </div>
            <Table2
              tableData={tableData}
              loading={repositoryOfControlID.loading}
              tableColumns={tableColumns}
            />
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
        <ControlidTableModal
          selectedControlId={selectedControlId}
          handleClose={() => setShowModal(false)}
        />
      </CustomModal>
    </>
  );
};

export default QuestionBankTable;

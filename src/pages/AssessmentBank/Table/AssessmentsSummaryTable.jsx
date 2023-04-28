import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../assets/styles/custom.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/UI/Table';
import NoDataPlaceholder from '../../../components/NoDataPlaceholder';
import {
  getAssessmentsSummaryTable,
  getAssessmentDetailsTableData,
} from '../../../redux/AssessmentBank/AssessmentBankAction';
import { getAssessmentsSummaryTableSelector } from '../../../redux/AssessmentBank/AssessmentBankSelectors';

const AssessmentsSummaryTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getAssessmentsSummaryTable());
  }, []);

  const getAssessmentsSummaryTableState = useSelector(getAssessmentsSummaryTableSelector);

  const handleSurveyNameClick = (Survey_Name) => {
    //code for opening second table in pop up
    let params = {
      assessmentName: Survey_Name,
    };
    dispatch(getAssessmentDetailsTableData(params));
  };
  const TABLE_COLUMNS = [
    {
      field: 'Survey_Name',
      headerName: 'Assessment Name',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
      renderCell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleSurveyNameClick(row.row.Survey_Name)}
          >
            {row.row.Survey_Name}
          </span>
        );
      },
    },
    {
      field: 'Created_On',
      headerName: 'Created On',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Created_By',
      headerName: 'Created By',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
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
      minWidth: 100,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      getAssessmentsSummaryTableState.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [getAssessmentsSummaryTableState.data]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-lg-12">
            {tableData.length > 0 ? (
              <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
            ) : (
              <NoDataPlaceholder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentsSummaryTable;

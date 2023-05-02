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
import {
  getAssessmentsSummaryTableSelector,
  getAssessmentDetailsTableDataSelector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import PageWrapper from '../../../components/wrappers/PageWrapper';

// Filter buttons
const FilterButtons = ({
  year,
  assessment_Cycle,
  yearValue,
  assessmentCycleValue,
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
      </Group>
    </div>
  );
};

const AssessmentsSummaryTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);

  useEffect(() => {
    dispatch(getAssessmentsSummaryTable());
  }, []);

  const getAssessmentsSummaryTableState = useSelector(getAssessmentsSummaryTableSelector);

  useEffect(() => {
    if (!yearValue.length && !assessmentCycleValue.length) {
      return setTableData(tableDataArray);
    }

    setTableData(
      tableDataArray.filter((i) => {
        return (
          (yearValue?.length ? yearValue.includes(i.Year) : true) &&
          (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true)
        );
      }),
    );
  }, [yearValue, assessmentCycleValue]);

  const handleSurveyNameClick = (Survey_Name) => {
    //code for opening second table in pop up
    const data = { SurveyName: Survey_Name };
    history.push('/assessmentbank/assessment-details', { data });
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
    const updatedData = getAssessmentsSummaryTableState?.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getAssessmentsSummaryTableState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const year = getAssessmentsSummaryTableState?.data.map((i) => i.Year);
  const assessment_Cycle = getAssessmentsSummaryTableState?.data.map((i) => i.Assessment_Cycle);

  return (
    <>
      <PageWrapper>
        <div className="container mt-5">
          <div className="row">
            <div className="col col-lg-12">
              <div className="mdm-table-global-filters">
                <FilterButtons
                  year={removeDuplicates(year)}
                  assessment_Cycle={removeDuplicates(assessment_Cycle)}
                  yearValue={yearValue}
                  assessmentCycleValue={assessmentCycleValue}
                  setYearValue={setYearValue}
                  setAssessmentCycleValue={setAssessmentCycleValue}
                />
              </div>
              <>
                {tableData.length > 0 ? (
                  <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
                ) : (
                  <NoDataPlaceholder />
                )}
              </>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default AssessmentsSummaryTable;

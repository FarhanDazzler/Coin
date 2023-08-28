import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../../assets/styles/custom.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table2 from '../../../../../components/UI/Table/Table2';
import NoDataLetterPlaceholder from './NoDataPlaceHolder';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import { getRlAllBuLetterData } from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';
import { getAllBuLetterdataSelector } from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';

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

const BULetterSummaryTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const getAllBuLetterdataState = useSelector(getAllBuLetterdataSelector);

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);

  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);

  useEffect(() => {
    console.log("Hi there");
    dispatch(getRlAllBuLetterData())
  }, []);


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

  const handleSurveyNameClick = (Title, Created_On, Created_By, Assessment_Cycle, Year) => {
    console.log(Function, "Function")
    //code for opening second table in pop up
    const data = {
      Tilte: Title,
      Created_On: Created_On,
      Created_By: Created_By,
      Assessment_Cycle: Assessment_Cycle,
      Year: Year,
    };
    history.push('/REP-Letters/scheduling-and-triggering/bu-letter-details', { data });
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Title',
      id: 'Title',
      header: 'Title',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() =>
              handleSurveyNameClick(
                row.row.original.Title,
                row.row.original.Created_On,
                row.row.original.Created_By,
                row.row.original.Assessment_Cycle,
                row.row.original.Year,
              )
            }
          >
            {row.row.original.Title}
          </span>
        );
      },
    },
    {
      accessorKey: 'Created_On',
      id: 'Created_On',
      header: 'Created On',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Created_By',
      id: 'Created_By',
      header: 'Created By',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Year',
      id: 'Year',
      header: 'Year',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = getAllBuLetterdataState?.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getAllBuLetterdataState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
 // Arrays for showing data on filters
 const year = getAllBuLetterdataState?.data.map((i) => i.Year);
 const assessment_Cycle = getAllBuLetterdataState?.data.map((i) => i.Assessment_Cycle);

  return (
    <>
      <div className="mt-5">
        <div className="row">
          <div className="col-12 col-lg-12">
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
              {tableData?.length > 0 ? (
                <Table2
                  tableData={tableData}
                  tableColumns={tableColumns}
                  loading={getAllBuLetterdataState.loading}
                />
              ) : (
                <NoDataLetterPlaceholder />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default BULetterSummaryTable;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_previous_assessment_result } from '../../../redux/Assessments/AssessmentAction';
import { useParams } from 'react-router';
import {
  get_previous_assessment_resultSelector,
  last_previous_assessment_resultSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import { Loader } from '@mantine/core';
import Table2 from '../../../components/UI/Table/Table2';

const PreviousResultsOnCoin = () => {
  const dispatch = useDispatch();
  const { control_id } = useParams();
  const params = new URL(document.location).searchParams;
  const Provider = decodeURIComponent(params.get('Provider'));
  const { data } = useSelector(get_previous_assessment_resultSelector);
  const lastId = useSelector(last_previous_assessment_resultSelector);
  console.log({ previous_assessment_result: lastId });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (lastId?.control_id !== control_id) {
      setLoading(true);
    }

    const payload = {
      control_id,
      provider: Provider,
      events: {
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      },
    };
    dispatch(get_previous_assessment_result(payload));
  }, []);

  const tableColumns = [
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 120,
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
    {
      accessorKey: 'KPI_Result',
      id: 'KPI_Result',
      header: 'KPI Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Assessment_Result',
      id: 'Assessment_Result',
      header: 'Assessment Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Compliance_Result',
      id: 'Compliance_Result',
      header: 'Compliance Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="d-flex w-100 align-items-center justify-content-center py-5 my-5">
          <Loader color="#d3a306" />
        </div>
      ) : (
        <div>
          <Table2
            isShowExportActionPlan={false}
            tableData={data || []}
            loading={loading}
            tableColumns={tableColumns}
          />
        </div>
      )}
    </div>
  );
};

export default PreviousResultsOnCoin;

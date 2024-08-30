//ControlOwnerTable
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Group, MultiSelect, Badge } from '@mantine/core';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Table2 from '../../../components/UI/Table/Table2';
import TableLoader from '../../../components/UI/TableLoader';
import Button from '../../../components/UI/Button';
import { getControlOwnerTableData } from '../../../redux/DashBoard/DashBoardAction';
import { getControlOwnerDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';
import {
  clearLatestDraftResponse,
  resetBlockAssessment,
} from '../../../redux/Assessments/AssessmentAction';
import { useQuery, stringToArray } from '../../../hooks/useQuery';
import ClearFilter from '../../../components/UI/ClearFilter';

const Badge_apply = ({ data }) => {
  if (data.toUpperCase() === 'PASS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'COMPLETE' || data === 'UNDER REVIEW') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'SUBMITED' || data === 'UNDER REVIEWS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'FAIL') {
    return (
      <Badge color="red" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'IN PROGRESS') {
    return (
      <Badge color="orange" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'NOT STARTED' || data === 'UNDER REVIEW') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'N/A' || data.toUpperCase() === 'NA') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
};

// Filter buttons
const FilterMultiSelect = ({ data, label, value, onChange }) => {
  const { t } = useTranslation();
  const [searchValue, onSearchChange] = useState('');
  return (
    <MultiSelect
      className="mantine-MultiSelect-wrapper"
      data={data}
      label={<span className="mantine-MultiSelect-label">{label}</span>}
      placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
      searchable
      limit={20}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      nothingFound="Nothing found"
      clearButtonLabel="Clear selection"
      clearable
      value={value}
      onChange={onChange}
      radius="xl"
      variant="filled"
      size="xs"
    />
  );
};

const ControlOwnerTable = ({
  tableName,
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  receiverValue,
  setReceiverValue,
  providerValue,
  setProviderValue,
  handleResetState,
}) => {
  const { t } = useTranslation();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');
  const history = useHistory();
  const { search } = useLocation();
  const params = useQuery();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);

  function getCurrentAssessmentCycle() {
    // Get the current date
    const today = new Date();
    const currentYear = today.getFullYear();

    // Check if the current date falls between February 1st and April 30th
    if (new Date(currentYear, 1, 1) <= today && today < new Date(currentYear, 4, 1)) {
      return 'Assessment Cycle 1';
    }
    // Check if the current date falls between May 1st and July 31st
    else if (new Date(currentYear, 4, 1) <= today && today < new Date(currentYear, 7, 1)) {
      return 'Assessment Cycle 2';
    }
    // Check if the current date falls between August 1st and October 31st
    else if (new Date(currentYear, 7, 1) <= today && today < new Date(currentYear, 10, 1)) {
      return 'Assessment Cycle 3';
    }
    // Check if the current date falls between November 1st and January 31st
    else if (new Date(currentYear, 10, 1) <= today || today < new Date(currentYear, 1, 1)) {
      // If the current month is January, return the previous year and Q4
      if (today.getMonth() == 0) {
        return 'Assessment Cycle 4';
      } else {
        return 'Assessment Cycle 4';
      }
    } else {
      return 'Invalid date';
    }
  }

  const initialYear =
    new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2
      ? [String(new Date().getFullYear() - 1)]
      : [String(new Date().getFullYear())];

  //var currentMonth = new Date().getMonth() + 1;
  // Adding 1 because getMonth() returns zero-based month (0-11)
  const [yearValue, setYearValue] = useState(
    params?.filterYear ? stringToArray(params?.filterYear) : initialYear,
  );

  const [assessmentCycleValue, setAssessmentCycleValue] = useState(
    params?.filterCycle ? stringToArray(params?.filterCycle) : [getCurrentAssessmentCycle()],
  );
  const filterRef = useRef({ yearValue, assessmentCycleValue, zoneValue, buValue, providerValue });

  const handleClearState = () => {
    setYearValue(initialYear);
    setAssessmentCycleValue([getCurrentAssessmentCycle()]);
    if (handleResetState) handleResetState();
  };

  const controlOwnerData = useMemo(() => {
    return loginUserRole === 'Control Owner'
      ? getControlOwnerData.data[0]?.cOwnerData || []
      : getControlOwnerData.data[1]?.cOverSightData || [];
  }, [getControlOwnerData.data, loginUserRole]);

  useEffect(() => {
    if (yearValue.length > 0) {
      const payload = {
        assessmentCycle: assessmentCycleValue,
        year: yearValue,
      };
      //toast.error('Please select year in filter.');
      dispatch(getControlOwnerTableData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }

    // dispatch(
    //   getControlOwnerTableData({
    //     email: accounts[0]?.username,
    //     User_oid: accounts[0]?.idTokenClaims.oid,
    //   }),
    // );
    setTableColumns(TABLE_COLUMNS);
  }, [assessmentCycleValue, yearValue, token]);

  const isClearButtonDisabled = useMemo(() => {
    const paramsKeyLength = Object.keys(params).length;
    if (paramsKeyLength === 2) {
      if (
        params.filterYear === initialYear[0] &&
        params.filterCycle === getCurrentAssessmentCycle()
      ) {
        return true;
      }
    }
    return false;
  }, [params]);

  // function for accessing form on the basis of current assessment cycle and year.
  // Attempt button will be visible only for current assessment cycle and year in action column.
  const isFormAccessible = (assessmentCycle, year) => {
    const currentAssessmentCycle = getCurrentAssessmentCycle();
    const currentYear =
      new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2
        ? String(new Date().getFullYear() - 1)
        : String(new Date().getFullYear());

    if (currentAssessmentCycle == assessmentCycle && currentYear == year) {
      return true;
    }
    return false;
  };

  const actionHeader = t('selfAssessment.homePage.controleOwner.Table.actions_button');

  const handleRedirect = useCallback(
    ({ row }) => {
      dispatch(clearLatestDraftResponse());
      dispatch(resetBlockAssessment({ blockType: 'getResponse' }));
      dispatch(resetBlockAssessment({ blockType: 'getLatestDraft' }));

      const original = row.row.original;
      const paramsSearch = new URLSearchParams();

      // Add original values to paramss
      paramsSearch.set('id', original.id);
      paramsSearch.set('Provider', original.Provider);
      paramsSearch.set('Receiver', original.Receiver);
      paramsSearch.set('coOwner', original.Control_Owner);
      paramsSearch.set('Control_Oversight', original.Control_Oversight);
      paramsSearch.set('KPI_To', original.KPI_To);
      paramsSearch.set('KPI_From', original.KPI_From);
      paramsSearch.set('BU', original.BU);
      paramsSearch.set('Year', original.Year);
      paramsSearch.set('Assessment_Cycle', original.Assessment_Cycle);
      paramsSearch.set('Question_Bank', original.Question_Bank);

      // Add only the local state values if they exist
      if (filterRef.current.yearValue?.length > 0)
        paramsSearch.set('filterYear', filterRef.current.yearValue);
      if (filterRef.current.assessmentCycleValue?.length > 0)
        paramsSearch.set('filterCycle', filterRef.current.assessmentCycleValue);
      if (filterRef.current.zoneValue?.length > 0)
        paramsSearch.set('filterZone', filterRef.current.zoneValue);
      if (filterRef.current.buValue?.length > 0)
        paramsSearch.set('filterBU', filterRef.current.buValue);
      if (filterRef.current.providerValue?.length > 0)
        paramsSearch.set('filterProvider', filterRef.current.providerValue);

      // Construct the final URL
      const url = `/Assessments/${original.Control_ID}?${paramsSearch.toString()}`;

      // Navigate to the new URL with the combined query parameters
      history.push(url);
    },
    [yearValue, assessmentCycleValue, zoneValue, buValue, providerValue],
  );

  const TABLE_COLUMNS = useMemo(() => {
    return [
      {
        accessorKey: 'Action',
        id: 'Action',
        header: actionHeader,
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 210,
        Cell: (row) => {
          return (
            <div>
              {row.row.original.Status === 'Completed' && (
                <Button
                  className="mr-2"
                  onClick={() => {
                    dispatch(clearLatestDraftResponse());
                    dispatch(resetBlockAssessment({ blockType: 'getResponse' }));
                    dispatch(resetBlockAssessment({ blockType: 'getLatestDraft' }));

                    const original = row.row.original;
                    const paramsSearch = new URLSearchParams();

                    // Add existing values to params
                    paramsSearch.set('id', original.id);
                    paramsSearch.set('Provider', original.Provider);
                    paramsSearch.set('Receiver', original.Receiver);
                    paramsSearch.set('coOwner', original.Control_Owner);
                    paramsSearch.set('Control_Oversight', original.Control_Oversight);
                    paramsSearch.set('KPI_To', original.KPI_To);
                    paramsSearch.set('KPI_From', original.KPI_From);
                    paramsSearch.set('BU', original.BU);
                    paramsSearch.set('Year', original.Year);
                    paramsSearch.set('Assessment_Cycle', original.Assessment_Cycle);
                    paramsSearch.set('Question_Bank', original.Question_Bank);

                    // Add filter values to params if they exist
                    if (yearValue?.length > 0) paramsSearch.set('filterYear', yearValue);
                    if (assessmentCycleValue?.length > 0)
                      paramsSearch.set('filterCycle', assessmentCycleValue);
                    if (zoneValue?.length > 0) paramsSearch.set('filterZone', zoneValue);
                    if (buValue?.length > 0) paramsSearch.set('filterBU', buValue);
                    if (providerValue?.length > 0)
                      paramsSearch.set('filterProvider', providerValue);

                    // Construct the final URL
                    const url = `/review/${original.Control_ID}?${paramsSearch.toString()}`;

                    history.push(url);
                  }}
                >
                  {t('selfAssessment.homePage.controleOwner.Table.review_button')}
                </Button>
              )}
              {isFormAccessible(row.row.original.Assessment_Cycle, row.row.original.Year) &&
                ['Not started', 'Re-assessed', 'Drafted'].includes(row.row.original.Status) && (
                  <Button
                    onClick={() => {
                      handleRedirect({ row });
                    }}
                  >
                    {t('selfAssessment.homePage.controleOwner.Table.take_assessment_button')}
                  </Button>
                )}
            </div>
          );
        },
      },
      {
        accessorKey: 'Zone',
        id: 'Zone',
        header: 'Zone',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 90,
      },
      {
        accessorKey: 'Control_ID',
        id: 'Control_ID',
        header: 'Control ID',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 140,
        Cell: (row) => {
          return <span className={'text-yellow'}>{row.row.original.Control_ID}</span>;
        },
      },
      {
        accessorKey: 'Provider',
        id: 'Provider',
        header: 'Provider Organization',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 90,
      },
      {
        accessorKey: 'Status',
        id: 'Status',
        header: 'Status',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 120,
        Cell: (row) => {
          return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
        },
      },
      {
        accessorKey: 'KPI_Result',
        id: 'KPI_Result',
        header: 'KPI Result',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 100,
        Cell: (row) => {
          return <Badge_apply data={row.row.original.KPI_Result} />;
        },
      },
      {
        accessorKey: 'Assessment_Result',
        id: 'Assessment_Result',
        header: 'Assessment Result',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 150,
        Cell: (row) => {
          return <Badge_apply data={row.row.original.Assessment_Result} />;
        },
      },
      {
        accessorKey: 'Compliance_Result',
        id: 'Compliance_Result',
        header: 'Compliance Result',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 150,
        Cell: (row) => {
          return <Badge_apply data={row.row.original.Compliance_Result} />;
        },
      },
      {
        accessorKey: 'Control_Owner',
        id: 'Control_Owner',
        header: 'Control Owner',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 200,
      },
      {
        accessorKey: 'Control_Oversight',
        id: 'Control_Oversight',
        header: 'Control Oversight',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 250,
      },
      {
        accessorKey: 'Assessment_Cycle',
        id: 'Assessment_Cycle',
        header: 'Assessment Cycle',
        flex: 1,
        columnDefType: 'data',
        cellClassName: 'dashboardCell',
        size: 150,
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
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, providerValue]);

  // Memoize static data to prevent re-creation on every render
  const Zone = useMemo(() => controlOwnerData?.map((i) => i.Zone), [controlOwnerData]);
  const BU = useMemo(() => controlOwnerData?.map((i) => i.BU), [controlOwnerData]);
  const Provider = useMemo(() => controlOwnerData?.map((i) => i.Provider), [controlOwnerData]);

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (!controlOwnerData.length) return setTableDataArray([]);
    if (!zoneValue.length && !buValue.length && !receiverValue.length && !providerValue.length) {
      return setTableDataArray(controlOwnerData);
    }
    const updatedData = controlOwnerData.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [zoneValue, buValue, receiverValue, providerValue, controlOwnerData, loginUserRole]);

  function getYearsData() {
    var currentYear = new Date().getFullYear();
    var previousYear = currentYear - 1;
    var yearBeforePrevious = previousYear - 1;

    var yearsArray = [
      { value: currentYear.toString(), label: currentYear.toString() },
      { value: previousYear.toString(), label: previousYear.toString() },
      { value: yearBeforePrevious.toString(), label: yearBeforePrevious.toString() },
    ];

    return yearsArray;
  }

  console.log('assessmentCycleValue', assessmentCycleValue, zoneValue, providerValue, buValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Update or remove the year parameter
    if (yearValue) {
      params.set('filterYear', yearValue.toString());
    } else {
      params.delete('filterYear');
    }

    // Update or remove the assessment cycle parameter
    if (assessmentCycleValue?.length > 0) {
      params.set('filterCycle', assessmentCycleValue.toString());
    } else {
      params.delete('filterCycle');
    }

    // Update or remove the zone parameter
    if (zoneValue?.length > 0) {
      params.set('filterZone', zoneValue);
    } else {
      params.delete('filterZone');
    }

    // Update or remove the BU parameter
    if (buValue?.length > 0) {
      params.set('filterBU', buValue);
    } else {
      params.delete('filterBU');
    }

    // Update or remove the provider parameter
    if (providerValue?.length > 0) {
      params.set('filterProvider', providerValue);
    } else {
      params.delete('filterProvider');
    }

    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, providerValue]);

  useEffect(() => {
    filterRef.current = { yearValue, assessmentCycleValue, zoneValue, buValue, providerValue };
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, providerValue]);

  return (
    <>
      <div className="container-fluid">
        {getControlOwnerData.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <div className="d-flex justify-content-between">
                <Group spacing="xs" className="actions-button-wrapper">
                  <FilterMultiSelect
                    data={getYearsData() || []}
                    label="Year"
                    value={yearValue}
                    onChange={setYearValue}
                  />
                  <FilterMultiSelect
                    data={[
                      { value: 'Assessment Cycle 1', label: 'Assessment Cycle 1' },
                      { value: 'Assessment Cycle 2', label: 'Assessment Cycle 2' },
                      { value: 'Assessment Cycle 3', label: 'Assessment Cycle 3' },
                      { value: 'Assessment Cycle 4', label: 'Assessment Cycle 4' },
                    ]}
                    label="Assessment Cycle"
                    value={assessmentCycleValue}
                    onChange={setAssessmentCycleValue}
                  />
                  <FilterMultiSelect
                    data={removeDuplicates(Zone) || []}
                    label="Zone"
                    value={zoneValue}
                    onChange={setZoneValue}
                  />
                  <FilterMultiSelect
                    data={removeDuplicates(BU) || []}
                    label="BU"
                    value={buValue}
                    onChange={setBUValue}
                  />
                  <FilterMultiSelect
                    data={removeDuplicates(Provider) || []}
                    label="Provider Organization"
                    value={providerValue}
                    onChange={setProviderValue}
                  />
                </Group>
                <div className="d-flex align-items-end">
                  <ClearFilter
                    onClick={handleClearState}
                    isClearButtonDisabled={isClearButtonDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12 mt-5 control-owner-table">
              <Table2
                tableData={tableDataArray}
                loading={getControlOwnerData.loading}
                tableColumns={tableColumns}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlOwnerTable;

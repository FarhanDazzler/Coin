import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getControlDataGcdAction,
  getControlDataAction,
} from '../../../../redux/ControlData/ControlDataAction';
import {
  class_to_apply,
  Badge_apply,
} from '../../V2/InternalControlHomePage/HomePageTable/constant';
import Table from '../../../../components/UI/Table';
import Table2 from '../../../../components/UI/Table/Table2';
import { getControlOwnerTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getControlOwnerDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import TableLoader from '../../../../components/UI/TableLoader';
import Button from '../../../../components/UI/Button';
import { Group } from '@mantine/core';
import FilterButtons from '../../../../components/FilterButtons';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { clearLatestDraftResponse } from '../../../../redux/Assessments/AssessmentAction';

const ControlOwnerTable = ({
  tableName,
  yearValue,
  setYearValue,
  assessmentCycleValue,
  setAssessmentCycleValue,
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  receiverValue,
  setReceiverValue,
  providerValue,
  setProviderValue,
}) => {
  const { t } = useTranslation();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');
  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);
  console.log('getControlOwnerData', getControlOwnerData);
  // let controlOwnerData = ([] = []);
  // if (loginUserRole === 'Control owner') {
  //   controlOwnerData = getControlOwnerData.data[0]?.cOwnerData || [];
  // } else {
  //   controlOwnerData = getControlOwnerData.data[1]?.cOverSightData || [];
  // }

  const controlOwnerData = useMemo(() => {
    return loginUserRole === 'Control owner'
      ? getControlOwnerData.data[0]?.cOwnerData || []
      : getControlOwnerData.data[1]?.cOverSightData || [];
  }, [getControlOwnerData.data, loginUserRole]);

  useEffect(() => {
    dispatch(
      getControlOwnerTableData({
        email: accounts[0]?.username,
        User_oid: accounts[0]?.idTokenClaims.oid,
      }),
    );
    setTableColumns(TABLE_COLUMNS);
  }, [token]);

  const actionHeader = t('selfAssessment.homePage.controleOwner.Table.actions_button');
  const TABLE_COLUMNS = [
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
                // onClick={() => history.push(`/Assessments/${row.row.Control_ID}`)}
                onClick={() => {
                  dispatch(clearLatestDraftResponse());
                  handleControlIDClick(row.row.original.Control_ID, row.row.original);
                }}
              >
                {t('selfAssessment.homePage.controleOwner.Table.review_button')}
              </Button>
            )}
            {['Not started', 'Re-assessed', 'Drafted'].includes(row.row.original.Status) && (
              <Button
                onClick={() => {
                  dispatch(clearLatestDraftResponse());
                  const data = { row: row.row.original };
                  history.push(`/Assessments/${row.row.original.Control_ID}`, {
                    data,
                  });
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
        return (
          <span
            className={'text-yellow'}
            // onClick={() => handleControlIDClick(row.row.Control_ID)}
          >
            {row.row.original.Control_ID}
          </span>
        );
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

  // Memoize static data to prevent re-creation on every render
  const Zone = useMemo(() => controlOwnerData?.map((i) => i.Zone), [controlOwnerData]);
  const BU = useMemo(() => controlOwnerData?.map((i) => i.BU), [controlOwnerData]);
  const Receiver = useMemo(() => controlOwnerData?.map((i) => i.Receiver), [controlOwnerData]);
  const Provider = useMemo(() => controlOwnerData?.map((i) => i.Provider), [controlOwnerData]);
  const year = useMemo(() => controlOwnerData?.map((i) => i.Year), [controlOwnerData]);
  const assessment_Cycle = useMemo(
    () => controlOwnerData?.map((i) => i.Assessment_Cycle),
    [controlOwnerData],
  );

  // const Zone = controlOwnerData?.map((i) => i.Zone);
  // const BU = controlOwnerData?.map((i) => i.BU);
  // const Receiver = controlOwnerData?.map((i) => i.Receiver);
  // const Provider = controlOwnerData?.map((i) => i.Provider);
  // const year = controlOwnerData?.map((i) => i.Year);
  // const assessment_Cycle = controlOwnerData?.map((i) => i.Assessment_Cycle);

  // Memoize the function to prevent re-creation on every render
  const handleControlIDClick = useCallback(
    (id, row) => {
      let payload = {
        controlId: id,
        coOwner: row?.Control_Owner,
        provider: row?.Provider,
      };
      let gcdPayload = {
        controlId: id,
      };
      dispatch(getControlDataAction(payload));
      dispatch(getControlDataGcdAction(gcdPayload));
      history.push(`${history.location.pathname}?Control_ID=${id}`, row);
    },
    [dispatch, history],
  );

  // const handleControlIDClick = (id, row) => {
  //   //TODO: modal redirect
  //   let payload = {
  //     controlId: id,
  //     coOwner: row?.Control_Owner,
  //     provider: row?.Provider,
  //   };
  //   let gcdPayload = {
  //     controlId: id,
  //   };
  //   dispatch(getControlDataAction(payload));
  //   dispatch(getControlDataGcdAction(gcdPayload));
  //   history.push(`${history.location.pathname}?Control_ID=${id}`, row);
  // };

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (!controlOwnerData.length) return setTableDataArray([]);
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
      return setTableDataArray(controlOwnerData);
    }
    const updatedData = controlOwnerData.filter((i) => {
      return (
        (yearValue?.length ? yearValue.includes(i.Year) : true) &&
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
    controlOwnerData,
    loginUserRole,
  ]);
  return (
    <>
      {/*<div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <Typography className="table-title">{tableName}</Typography>
          </div>
        </div>
  </div> */}

      <div className="container-fluid">
        {getControlOwnerData.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <Group spacing="xs" className="actions-button-wrapper">
                <FilterButtons
                  year={removeDuplicates(year)}
                  assessment_Cycle={removeDuplicates(assessment_Cycle)}
                  Zone={removeDuplicates(Zone)}
                  BU={removeDuplicates(BU)}
                  Receiver={removeDuplicates(Receiver)}
                  Provider={removeDuplicates(Provider)}
                  yearValue={yearValue}
                  assessmentCycleValue={assessmentCycleValue}
                  zoneValue={zoneValue}
                  buValue={buValue}
                  receiverValue={receiverValue}
                  providerValue={providerValue}
                  setYearValue={setYearValue}
                  setAssessmentCycleValue={setAssessmentCycleValue}
                  setZoneValue={setZoneValue}
                  setBUValue={setBUValue}
                  setReceiverValue={setReceiverValue}
                  setProviderValue={setProviderValue}
                  isHide={true}
                />
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
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

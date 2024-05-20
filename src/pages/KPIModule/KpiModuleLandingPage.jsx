import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { DotSpinner } from '@uiball/loaders';
import { MultiSelect } from '@mantine/core';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { getAllZoneSelector } from '../../redux/AssessmentBank/AssessmentBankSelectors';
import { getAllZone } from '../../redux/AssessmentBank/AssessmentBankAction';
import PageWrapper from '../../components/wrappers/PageWrapper';
import KPITable from './KpiComponent/KPITable';
import {
  clear_ControlOwner_KPIOwner_ControlOversight_KPI_data,
  get_ControlOwner_KPIOwner_ControlOversight_KPI_data,
  clear_ic_KPI_data,
  get_ic_KPI_data,
} from '../../redux/KPI_Module/KPI_Action';
import {
  get_ControlOwner_KPIOwner_ControlOversight_KPI_dataSelector,
  get_ic_KPI_dataSelector,
} from '../../redux/KPI_Module/KPI_Selectors';

function getCurrentYearAndQuarter() {
  const today = new Date();
  const currentYear = today.getFullYear();

  if (new Date(currentYear, 1, 1) <= today && today <= new Date(currentYear, 3, 30)) {
    return currentYear + 'Q1';
  } else if (new Date(currentYear, 4, 1) <= today && today <= new Date(currentYear, 6, 30)) {
    return currentYear + 'Q2';
  } else if (new Date(currentYear, 7, 1) <= today && today <= new Date(currentYear, 9, 31)) {
    return currentYear + 'Q3';
  } else if (new Date(currentYear, 10, 1) <= today && today <= new Date(currentYear, 0, 31)) {
    return currentYear + 'Q4';
  } else {
    return 'Invalid date';
  }
}

function getPreviousYearAndQuarter() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 4);
  const previousYear = currentDate.getFullYear();
  const previousQuarter = Math.ceil((currentDate.getMonth() + 1) / 3);
  return previousYear + 'Q' + previousQuarter;
}

const ICTable = () => {
  const dispatch = useDispatch();

  const currentQuarter = getCurrentYearAndQuarter();
  const previousQuarter = getPreviousYearAndQuarter();

  // API to fetch respective zone of IC user
  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  const yearQuarterOption = [currentQuarter, previousQuarter];
  const [yearAndQuarter, setYearAndQuarter] = useState([getCurrentYearAndQuarter()]);
  const { data: getAllZone_State, loading: getAllZoneLoading } = useSelector(getAllZoneSelector);
  const [selectedZone, setSelectedZone] = useState();
  const [zoneValue, setZoneValue] = useState();
  // State to store api data
  const KpiDataForIC = useSelector(get_ic_KPI_dataSelector);

  // Converting get all zone data into select dropdown format
  useEffect(() => {
    if (getAllZone_State?.length > 0) {
      const formattedData = getAllZone_State.map((zone) => ({
        label: zone.zone,
        value: zone.zone,
      }));
      setZoneValue([formattedData[0]]);
      if (getAllZone_State.length > 1) {
        setZoneValue(formattedData);
      }
    }
  }, [getAllZone_State]);

  useEffect(() => {
    setTimeout(() => {
      const div = document.getElementsByClassName('loader-animation')[0];
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 200);
  }, [selectedZone, yearAndQuarter]);

  useEffect(() => {
    if (selectedZone?.value) {
      if (yearAndQuarter?.length > 0) {
        const payload = {
          zone: selectedZone.value,
          year_and_quarter: yearAndQuarter,
        };
        dispatch(get_ic_KPI_data(payload));
      } else {
        toast.error('Please select Year in filter.');
      }
    }
  }, [yearAndQuarter, selectedZone]);

  return (
    <div>
      {localStorage.getItem('selected_Role') === 'Global Internal Control' ? (
        getAllZoneLoading ? (
          <div className="loader-animation">
            <DotSpinner size={100} speed={0.9} color="#e3af32" />
            <p className="loader-Desc ml-3">Please wait a moment while we finalize the process</p>
          </div>
        ) : (
          <>
            <div className="ApplicabilityTableSelectZoneParentSection mt-5">
              <div className="col-lg-2">
                <div className="ApplicabilityTableSelectZoneLabelSection">Select Zone</div>
                <Form.Group className="input-group mb-3">
                  <div style={{ width: '100%' }}>
                    <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 10,
                        colors: {
                          ...theme.colors,
                          neutral0: 'black',
                          neutral90: 'white',
                          neutral80: 'white',
                          primary25: 'grey',
                          primary: 'white',
                          neutral20: 'grey',
                          primary50: 'grey',
                          primary75: 'grey',
                        },
                      })}
                      maxMenuHeight={200}
                      placeholder="Select Zone"
                      value={selectedZone}
                      onChange={(e) => {
                        setSelectedZone(e);
                      }}
                      className="l-input functional-select"
                      options={zoneValue}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
            {selectedZone &&
              (KpiDataForIC?.loading ? (
                <div className="loader-animation">
                  <DotSpinner size={100} speed={0.9} color="#e3af32" />
                  <p className="loader-Desc ml-3">Please wait a moment while we fetch the data</p>
                </div>
              ) : (
                <>
                  <div className="mt-5">
                    <div className="col-lg-4 flex">
                      <Form.Group className="input-group mb-3">
                        <div style={{ width: '100%' }}>
                          <MultiSelect
                            className="mantine-MultiSelect-wrapper"
                            data={yearQuarterOption}
                            label={
                              <span className="mantine-MultiSelect-label">Year and Quarter</span>
                            }
                            placeholder="Select your option"
                            limit={20}
                            nothingFound="Nothing found"
                            clearButtonLabel="Clear selection"
                            clearable
                            value={yearAndQuarter}
                            onChange={setYearAndQuarter}
                            radius="xl"
                            variant="filled"
                            size="xs"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <KPITable data={KpiDataForIC?.data} />
                  </div>
                </>
              ))}
          </>
        )
      ) : KpiDataForIC?.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">Please wait a moment while we fetch the data</p>
        </div>
      ) : (
        <>
          <div className="col-lg-4">
            <Form.Group className="input-group mb-3">
              <div style={{ width: '100%' }}>
                <MultiSelect
                  className="mantine-MultiSelect-wrapper"
                  data={yearQuarterOption}
                  label={<span className="mantine-MultiSelect-label">Year and Quarter</span>}
                  placeholder="Select your option"
                  limit={20}
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  clearable
                  value={yearAndQuarter}
                  onChange={setYearAndQuarter}
                  radius="xl"
                  variant="filled"
                  size="xs"
                />
              </div>
            </Form.Group>
          </div>
          <KPITable data={KpiDataForIC?.data} />
        </>
      )}
    </div>
  );
};

const ControlOwner_KPIOwner_ControlOversight_Table = () => {
  const dispatch = useDispatch();

  const { accounts } = useMsal();

  const currentQuarter = getCurrentYearAndQuarter();
  const previousQuarter = getPreviousYearAndQuarter();

  const yearQuarterOption = [currentQuarter, previousQuarter];
  const [yearAndQuarter, setYearAndQuarter] = useState([getCurrentYearAndQuarter()]);
  // State to store api data
  const KpiDataForControlOwner_KPIOwner_ControlOversight = useSelector(
    get_ControlOwner_KPIOwner_ControlOversight_KPI_dataSelector,
  );

  useEffect(() => {
    if (yearAndQuarter?.length > 0) {
      const payload = {
        year_and_quarter: yearAndQuarter,
        oid: accounts[0]?.idTokenClaims.oid,
        role: localStorage.getItem('selected_Role'),
      };
      dispatch(get_ControlOwner_KPIOwner_ControlOversight_KPI_data(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [yearAndQuarter]);

  useEffect(() => {
    setTimeout(() => {
      const div = document.getElementsByClassName('loader-animation')[0];
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 200);
  }, [yearAndQuarter]);

  return (
    <div>
      {KpiDataForControlOwner_KPIOwner_ControlOversight?.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">Please wait a moment while we fetch the data</p>
        </div>
      ) : (
        <>
          <div className="col-lg-4">
            <Form.Group className="input-group mb-3">
              <div style={{ width: '100%' }}>
                <MultiSelect
                  className="mantine-MultiSelect-wrapper"
                  data={yearQuarterOption}
                  label={<span className="mantine-MultiSelect-label">Year and Quarter</span>}
                  placeholder="Select your option"
                  limit={20}
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  clearable
                  value={yearAndQuarter}
                  onChange={setYearAndQuarter}
                  radius="xl"
                  variant="filled"
                  size="xs"
                />
              </div>
            </Form.Group>
          </div>
          <KPITable data={KpiDataForControlOwner_KPIOwner_ControlOversight?.data} />
        </>
      )}
    </div>
  );
};

const KpiModule = () => {
  const dispatch = useDispatch();
  //Clear all getKpiData API response when leaving/Refreshing the Page

  useEffect(() => {
    // Define the cleanup function
    return () => {
      dispatch(clear_ControlOwner_KPIOwner_ControlOversight_KPI_data());
      dispatch(clear_ic_KPI_data());
    };
  }, []);

  return (
    <>
      <PageWrapper>
        <div className="container-fluid">
          <div className="pt-7 pl-2">
            <div style={{ fontSize: 34, fontWeight: 600 }}>
              Welcome to the{' '}
              <span className="golden-text" style={{ fontWeight: 700 }}>
                KPI Module
              </span>
            </div>
            <div className="pl-1 mb-4">
              Gain insights into historical and current KPI data while seamlessly updating current
              quarter metrics through an intuitive portal interface.
            </div>
          </div>
          <div>
            {localStorage.getItem('selected_Role') === 'Global Internal Control' ||
            localStorage.getItem('selected_Role') === 'Zonal Internal Control' ? (
              <ICTable />
            ) : (
              <ControlOwner_KPIOwner_ControlOversight_Table />
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default KpiModule;

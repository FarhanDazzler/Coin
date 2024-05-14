import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DotSpinner } from '@uiball/loaders';
import { useDispatch, useSelector } from 'react-redux';
import { getAllZoneSelector } from '../../redux/AssessmentBank/AssessmentBankSelectors';
import { getAllZone } from '../../redux/AssessmentBank/AssessmentBankAction';
import PageWrapper from '../../components/wrappers/PageWrapper';
import KPITable from './KpiComponent/KPITable';
import { MultiSelect } from '@mantine/core';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    dispatch(getAllZone());
  }, []);
  const yearQuarterOption = [currentQuarter, previousQuarter];
  const [yearAndQuarter, setYearAndQuarter] = useState([getCurrentYearAndQuarter()]);
  const { data: getAllZone_State, loading: getAllZoneLoading } = useSelector(getAllZoneSelector);
  const [selectedZone, setSelectedZone] = useState();
  const [zoneValue, setZoneValue] = useState();
  console.log(getAllZone_State);
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
    if (yearAndQuarter?.length > 0) {
      const payload = {
        zone: selectedZone,
        year_and_quarter: yearAndQuarter,
      };
      // TODO:REdux Dispatch API
    } else {
      toast.error('Please select Year in filter.');
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
                      onChange={(e) => setSelectedZone(e)}
                      className="l-input functional-select"
                      options={zoneValue}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
            {selectedZone && (
              <>
                <div className="mt-5">
                  <div className="col-lg-2 flex">
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
                  <KPITable />
                </div>
              </>
            )}
          </>
        )
      ) : (
        <>
          <div className="col-lg-2">
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
          <KPITable />
        </>
      )}
    </div>
  );
};

const KpiModule = () => {
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
            <ICTable />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default KpiModule;

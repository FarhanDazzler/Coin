import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DotSpinner } from '@uiball/loaders';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllZoneSelector } from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import { getAllZone } from '../../../redux/AssessmentBank/AssessmentBankAction';
import { getApplicabilityAndAssignmentOfProviderOrganization } from '../../../redux/MDM/MDM_Action';
import ApplicabilityAndAssignmentOfProviderOrganizationTable from './Tables/ApplicabilityAndAssignmentOfProviderOrganization/ApplicabilityAndAssignmentOfProviderOrganizationTable';

const MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  const [zoneList, setZoneList] = useState([]);
  const [selectedZone, setSelectedZone] = useState();

  const getAllZone_State = useSelector(getAllZoneSelector);

  //getAllZone_State?.data?.map((i) => i.zone)

  useEffect(() => {
    if (getAllZone_State?.data.length !== 0) {
      let zoneArray = [];
      getAllZone_State?.data.map((data) => {
        zoneArray.push({ label: data.zone, value: data.zone });
      });
      setZoneList(zoneArray);
    }
  }, [getAllZone_State?.data]);

  console.log(zoneList, 'zoneList');

  // API Call using dispatch
  useEffect(() => {
    if (localStorage.getItem('selected_Role') != 'Global internal control') {
      let payload = {
        zone: getAllZone_State?.data[0]?.zone,
      };
      console.log(payload, 'payload 1');
      dispatch(getApplicabilityAndAssignmentOfProviderOrganization(payload));
    } else {
      let payload = {
        zone: selectedZone?.value,
      };
      console.log(payload, 'payload 2');
      dispatch(getApplicabilityAndAssignmentOfProviderOrganization(payload));
    }
  }, [selectedZone]);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        {localStorage.getItem('selected_Role') === 'Global internal control' &&
          (getAllZone_State.loading ? (
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
                            //neutral70: 'white',
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
                        defaultValue={selectedZone}
                        onChange={(e) => setSelectedZone(e)}
                        className="l-input functional-select"
                        //MenuProps={MenuProps}
                        //inputProps={{ 'aria-label': 'Without label' }}
                        options={zoneList}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              {selectedZone && (
                <ApplicabilityAndAssignmentOfProviderOrganizationTable
                  selectedZone={selectedZone?.value}
                />
              )}
            </>
          ))}
        {localStorage.getItem('selected_Role') !== 'Global internal control' && (
          <ApplicabilityAndAssignmentOfProviderOrganizationTable
            selectedZone={getAllZone_State?.data[0]?.zone}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage;

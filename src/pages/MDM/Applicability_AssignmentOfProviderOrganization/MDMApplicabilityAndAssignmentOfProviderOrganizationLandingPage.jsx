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
  const [zoneList, setZoneList] = useState([]);
  const [selectedZone, setSelectedZone] = useState();

  const { data: getAllZoneData, loading: getAllZoneLoading } = useSelector(getAllZoneSelector);

  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  useEffect(() => {
    if (getAllZoneData.length !== 0) {
      const zoneArray = getAllZoneData.map((data) => ({
        label: data.zone,
        value: data.zone,
      }));
      setZoneList(zoneArray);

      if (localStorage.getItem('selected_Role') !== 'Global internal control') {
        const payload = {
          zone: zoneArray[0]?.value,
        };
        dispatch(getApplicabilityAndAssignmentOfProviderOrganization(payload));
      }
    }
  }, [getAllZoneData]);

  const OnClickSelectZone = (e) => {
    setSelectedZone(e);
    const payload = {
      zone: e.value,
    };
    dispatch(getApplicabilityAndAssignmentOfProviderOrganization(payload));
  };

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        {localStorage.getItem('selected_Role') === 'Global internal control' ? (
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
                        onChange={(e) => OnClickSelectZone(e)}
                        className="l-input functional-select"
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
          )
        ) : (
          <ApplicabilityAndAssignmentOfProviderOrganizationTable
            selectedZone={getAllZoneData[0]?.zone}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage;

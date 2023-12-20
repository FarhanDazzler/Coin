import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getControlOwnerAndOversight } from '../../../redux/MDM/MDM_Action';
import ControlOwnerAndOversightTable from './Tables/ControlOwnerAndOversight/ControlOwnerandOversightTable';
import { modifyControlOwnerAndOversightSelector } from '../../../redux/MDM/MDM_Selectors';
import { ProductFeedback } from '@abi-ds-beerblocs/product-feedback-module';

const MDM_Control_Owner_OversightLandingPage = () => {
  const dispatch = useDispatch();
  const modifyControlOwnerAndOversightState = useSelector(modifyControlOwnerAndOversightSelector);
  const { accounts } = useMsal();
  const [openNPS, setOpenNPS] = useState(false);

  // API Call using dispatch
  useEffect(() => {
    dispatch(getControlOwnerAndOversight());

    //to open NPS feedback modal
    if (modifyControlOwnerAndOversightState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [modifyControlOwnerAndOversightState.data]);

  return (
    <PageWrapper>
      <ProductFeedback
        env={process.env.REACT_APP_STAGE}
        apiKey={''}
        token={localStorage.getItem('nps-auth-token')}
        feedbackMetadata={{
          Activity: 'IC Has done MDM modification in Control Owner and Oversight table',
          Created_By: {
            Email: accounts[0]?.username,
            name: accounts[0]?.name ? accounts[0].name : '',
          },
        }}
        productId={process.env.REACT_APP_NPS_PRODUCT_ID}
        productActivityId="nps_score_provided_IC"
        modalOpened={openNPS}
        setModalOpened={setOpenNPS}
      />
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <ControlOwnerAndOversightTable />
      </div>
    </PageWrapper>
  );
};

export default MDM_Control_Owner_OversightLandingPage;

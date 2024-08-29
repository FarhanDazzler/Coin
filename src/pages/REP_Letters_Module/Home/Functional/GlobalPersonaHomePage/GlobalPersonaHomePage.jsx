import React, { useEffect, useMemo, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import '../../styles.scss';
import ProgressBar from '../../../../Home/V2/InternalControlHomePage/HomePageTable/ProgressBar/ProgressBar';
import GlobalPersonaTable from './GlobalPersonaTable';
import { ReactComponent as InfoIcon } from '../../../../../assets/images/InfoCircle.svg';
import { getFunctionGlobalPersonaHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { stringToArray, useQuery } from '../../../../../hooks/useQuery';
const NumberWithText = ({ number, tooltip, subTitle }) => (
  <div className="d-flex justify-content-between bg-black mb-2 p-1 px-4 rounded-3">
    <div className="d-flex align-items-center">
      <Tooltip title={tooltip} arrow>
        <InfoIcon />
      </Tooltip>
      {subTitle}
    </div>
    <h3 className="largeNumber yellow-gradient-text mb-0">{number}</h3>
  </div>
);

const GlobalPersonaHomePage = () => {
  const history = useHistory();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getGlobalPersonaHomePageData = useSelector(getFunctionGlobalPersonaHomePageDataSelector);
  const params = useQuery();

  const initValue = {
    zoneValue: params?.filterZone ? stringToArray(params?.filterZone) : [],
    buValue: params?.filterBU ? stringToArray(params?.filterBU) : [],
    functionValue: params?.filterFunction ? stringToArray(params?.filterFunction) : [],
  };

  const [zoneValue, setZoneValue] = useState(initValue.zoneValue);
  const [buValue, setBUValue] = useState(initValue.buValue);
  const [functionValue, setFunctionValue] = useState(initValue.functionValue);

  const handleResetState = () => {
    setZoneValue([]);
    setBUValue([]);
    setFunctionValue([]);
  };

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getGlobalPersonaHomePageData?.data[0]?.home_page_table_global || [];
    const updatedData = tableData.filter((i) => {
      return (
        (!zoneValue.length || zoneValue.includes(i.Zone)) &&
        (!buValue.length || buValue.includes(i.BU)) &&
        (!functionValue.length || functionValue.includes(i.Function))
      );
    });

    const allUpdatestatus = updatedData.map((d) => d?.Status);
    const completedAssessment = getNumberOfItem(allUpdatestatus, 'Completed');

    return {
      notStarted: getNumberOfItem(allUpdatestatus, 'Not started'),
      completed: completedAssessment,
      draft: getNumberOfItem(allUpdatestatus, 'Drafted'),
      completedRatio: ((completedAssessment / allUpdatestatus?.length) * 100)?.toFixed(0),
      total: allUpdatestatus?.length,
    };
  }, [getGlobalPersonaHomePageData?.data[0], zoneValue, buValue, functionValue, getNumberOfItem]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-5 align-items-center">
          <div className="col-lg-4">
            <h4 className="welcome-text">Welcome</h4>
            <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
              {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
            </h2>
            <h3 className="user-role">{selectedUserRole}</h3>
          </div>
          <div className="col-lg-8">
            <div className="wrapper-info-grid">
              <div className="home-right-overviews h-100 d-flex align-items-center justify-content-center">
                <ProgressBar value={statusInfo.completedRatio} />
              </div>

              <div className="right-number home-right-overviews">
                <NumberWithText
                  number={statusInfo.notStarted}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Not Started : </span>
                      <span>
                        Contact Recipients to complete Letter, and check fallbacks on GRC.
                      </span>
                    </div>
                  }
                  subTitle="Not Started"
                />

                <NumberWithText
                  number={statusInfo.completed}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Completed : </span>
                      <span>Check if the Letter results are reflected correctly in scoring.</span>
                    </div>
                  }
                  subTitle="Completed"
                />

                <NumberWithText
                  number={statusInfo.draft}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Drafted : </span>
                      <span>
                        Recipients has started & saved the Letter as draft, however not submitted.
                      </span>
                    </div>
                  }
                  subTitle="Draft"
                />
                <NumberWithText
                  number={statusInfo.total}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Total : </span>
                      <span>Total number of Letter.</span>
                    </div>
                  }
                  subTitle="Total"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalPersonaTable
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        buValue={buValue}
        setBUValue={setBUValue}
        functionValue={functionValue}
        handleResetState={handleResetState}
        setFunctionValue={setFunctionValue}
      />
    </div>
  );
};

export default GlobalPersonaHomePage;

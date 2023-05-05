import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ControlOwnerTable from './ControlOwnerTable/ControlOwnerTable';
import { useSelector } from 'react-redux';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import HomeTableModal from '../V2/InternalControlHomePage/HomeTableModal';
import './styles.scss';
import { getControlOwnerDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';

const ControlHomePage = () => {
  const history = useHistory();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const { accounts } = useMsal();
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);
  const [statusInfo, setStatusInfo] = useState({
    notStarted: 0,
    completed: 0,
    draft: 0,
    reAssessed: 0,
  });

  const getNumberOfItem = (array, itemName) => {
    return array.filter((val) => val === itemName)?.length;
  };

  useEffect(() => {
    const tableData =
      loginUserRole === 'Control owner'
        ? getControlOwnerData.data[0]?.cOwnerData || []
        : getControlOwnerData.data[1]?.cOverSightData || [];
    const allstatus = tableData.map((d) => {
      return d.Status;
    });
    setStatusInfo({
      notStarted: getNumberOfItem(allstatus, 'Not started'),
      completed: getNumberOfItem(allstatus, 'Completed'),
      draft: getNumberOfItem(allstatus, 'Draft'),
      reAssessed: getNumberOfItem(allstatus, 'Re-assessed'),
    });
  }, [getControlOwnerData.data, loginUserRole]);

  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4 pt-5">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {loginUserRole && <h3 className="user-role">{loginUserRole}</h3>}
            </div>
            <div className="col-lg-8">
              <div className="d-flex align-items-center flex-wrap">
                {/* <AmountInfo amount={12292} infoText={'BU'} />
                <AmountInfo amount={19} infoText="functional" /> */}
                <AmountInfo
                  amount={statusInfo.notStarted}
                  infoText={
                    <>
                      Assessment <br /> (NOT Started)
                    </>
                  }
                />
                <AmountInfo
                  amount={statusInfo.completed}
                  infoText={
                    <>
                      Assessment <br /> (Completed)
                    </>
                  }
                />
                <AmountInfo
                  amount={statusInfo.draft}
                  infoText={
                    <>
                      Assessment <br /> (Draft)
                    </>
                  }
                />
                <AmountInfo
                  amount={statusInfo.reAssessed}
                  infoText={
                    <>
                      Assessment <br /> (Re-assess)
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {loginUserRole === 'Control owner' ? (
          <ControlOwnerTable tableName="Control Owner" />
        ) : (
          <ControlOwnerTable tableName="Control Oversight" />
        )}

        {Control_ID && <HomeTableModal isModal={true}/>}
      </PageWrapper>
    </div>
  );
};

const AmountInfo = ({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
};
export default ControlHomePage;

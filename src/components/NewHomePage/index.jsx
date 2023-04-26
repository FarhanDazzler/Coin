import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import PageWrapper from '../wrappers/PageWrapper';
import DashboardTable from '../HomePage/HomePageTable/HomePageTableComponent';
import HomeTableModal from '../HomePage/HomeTableModal';
import './styles.scss';
import FilterButtons from '../FilterButtons';
import ControlOwnerTable from './ControlOwnerTable/ControlOwnerTable';
import { useSelector } from 'react-redux';

const NewHomePage = () => {
  const history = useHistory();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text mb-2">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {(loginRole || userRole) && <h3 className="user-role">{loginRole ?? userRole}</h3>}
            </div>
            <div className="col-lg-8">
              <div className="mb-4">
                <FilterButtons />
              </div>
              <div className="d-flex align-items-center flex-wrap">
                <AmountInfo amount={12292} infoText={'BU'} />
                <AmountInfo amount={19} infoText="functional" />
                <AmountInfo
                  amount={732}
                  infoText={
                    <>
                      Assessment <br /> (NOT Started)
                    </>
                  }
                />
                <AmountInfo
                  amount={123}
                  infoText={
                    <>
                      Assessment <br /> (completed)
                    </>
                  }
                />
                <AmountInfo
                  amount={112}
                  infoText={
                    <>
                      Assessment <br /> (Draft)
                    </>
                  }
                />
                <AmountInfo
                  amount={4}
                  infoText={
                    <>
                      Assessment <br /> (incorrect owner)
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <ControlOwnerTable tableName="Control Owner" />
        <ControlOwnerTable tableName="Control Oversight" />

        {Control_ID && <HomeTableModal />}
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
export default NewHomePage;

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import TopBar from '../../parts/TopBar/TopBar';
import FeatherIcon from 'feather-icons-react';
import PageWrapper from '../../components/wrappers/PageWrapper';
import './NotAuthorizedStyles.scss';
import notFoundImage from '../../assets/images/page-not-found-table.svg';

const NotAuthorized = (props) => {
  const history = useHistory();
  return (
    <PageWrapper>
      <div className="container-fluid">
        <div className="row pt-5 align-items-center">
          <div className="col-lg-8 offset-lg-2 mt-5 pt-5">
            <div className="home-right-overview">
              <div className="text-center pt-3 pb-5">
                <img src={notFoundImage} style={{ width: '25%' }} />
                <div className="no-access-heading yellow-gradient-text">{`You don't have access to this page`}</div>
                <div className="welcome-text-no-access">
                  {`Sorry you are not authorized to access this application`}
                </div>
                <div className="welcome-text-no-access">{` Please contact your System Administrator`}</div>
                <button
                  className="not-authorized-btn"
                  onClick={() => {
                    history.push('/contact-us', { from: 'not-authorized' });
                  }}
                >
                  <FeatherIcon icon="pocket" size={16} style={{ marginRight: 5 }} /> {'Contact Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotAuthorized;

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import TopBar from '../../parts/TopBar/TopBar';
import PageWrapper from '../../components/wrappers/PageWrapper';
import './NotAuthorizedStyles.scss';

const NotAuthorized = (props) => {
  const history = useHistory();
  const userRole = localStorage.getItem('Roles');
  useEffect(() => {
    if (userRole && userRole !== 'undefined') history.push('/');
  }, [userRole]);
  return (
    <PageWrapper>
      <div className="container-fluid">
        <div className="row pt-5 align-items-center">
          <div className="col-lg-8 offset-lg-2 mt-5 pt-5">
            <div className="home-right-overview">
              <div className="text-center pt-3 pb-5">
                <h1 className="user-name-home yellow-gradient-text">{`Not Authorized`}</h1>
                <h4 className="welcome-text">
                  {`Sorry but you are not authorized to access this application contact your System Administrator`}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotAuthorized;

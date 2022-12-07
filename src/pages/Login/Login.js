import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../../assets/styles/Login.css';
import { Button, Card } from 'react-bootstrap';
import { loginRequest } from '../../utils/authConfig';
import ABILogo from '../../assets/images/abi_logo_black.png';
import DSCOELogo from '../../assets/images/dscoe_logo.png';
import BTLogo from '../../assets/images/BT.png';
import appLogo from '../../assets/images/ABILogo.png';

import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

const Login = () => {
  const history = useHistory();

  const { instance, inProgress } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  // console.log('I AM IN LOGIN');

  useEffect(() => {
    //console.log(`AUTH LOG = ${isAuthenticated}`);
    if (isAuthenticated) {
      // console.log('You are authenticated!');
      // console.log(`Refer: ${document.referrer}`);
      // history.goBack();
      history.push('/');
    }
  }, [inProgress]);

  return (
    !isAuthenticated &&
    inProgress === InteractionStatus.None && (
      <div className="login-page">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <Card>
                <Card.Body className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={appLogo}
                      className="h-9"
                      alt="GRC MICS SA Portal Logo"
                      style={{ borderRadius: '4rem' }}
                    />
                  </div>

                  <div className="card-title text-center">
                    <div className="orange-text">
                      <h2 className="display-6">
                        {`GRC MICS SA`} <br /> {`Portal`}
                      </h2>
                    </div>

                    <p>
                      {`Please use your `}
                      <strong className="golden-text">{`AB InBev ID`}</strong>
                      {` to login`}
                    </p>
                  </div>

                  <div className="form-footer">
                    <Button
                      className="btn btn-primary btn-block"
                      style={{ borderRadius: '40px' }}
                      onClick={() => instance.loginRedirect(loginRequest)}
                    >
                      {`Login`}
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="text-center">
                    <img
                      src={ABILogo}
                      className="h-5"
                      alt="AB InBev Logo"
                      style={{
                        paddingRight: '10px',
                      }}
                    />
                    {/* <img
                      src={BTLogo}
                      className="h-9 mb-2"
                      alt="BT Logo"
                      style={{
                        borderLeft: '1px solid #c9c9c9',
                        paddingLeft: '14px',
                      }}
                    /> */}
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;

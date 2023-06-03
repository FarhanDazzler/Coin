import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../assets/styles/Login.css';
import { Button, Card } from 'react-bootstrap';
import { loginRequest } from '../../utils/authConfig';
import ABILogo from '../../assets/images/abi_logo.png';
import appLogo from '../../assets/images/coin_logo.png';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import PageWrapper from '../../components/wrappers/PageWrapper';

const Login = () => {
  const { accounts } = useMsal();
  const history = useHistory();

  const { instance, inProgress } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [inProgress]);

  return (
    !isAuthenticated &&
    inProgress === InteractionStatus.None && (
      <PageWrapper>
        <div className="login-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-login mx-auto">
                <Card className="loginCard">
                  <Card.Body className="p-6">
                    <div className="text-center mb-6">
                      <img
                        src={appLogo}
                        className="h-9"
                        alt="GRC MICS SA Portal Logo"
                        //style={{ borderRadius: '4rem' }}
                      />
                    </div>

                    <div className="card-title text-center">
                      <div className="orange-text">
                        <h2
                          className="display-6"
                          style={{ color: '#e3af32', fontWeight: '600' }}
                        >{`Welcome`}</h2>
                      </div>

                      <p style={{ color: 'white' }}>
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
                  <Card.Footer style={{ borderColor: 'grey' }}>
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
      </PageWrapper>
    )
  );
};

export default Login;

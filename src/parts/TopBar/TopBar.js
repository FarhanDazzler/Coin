import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../utils/authConfig';

import '../../assets/styles/TopBar.css';
import FeatherIcon from 'feather-icons-react';
import abiLogo from '../../assets/images/abi_logo.png';
import coinLogo from '../../assets/images/coin_logo.png';
import defaultProfilePhoto from '../../assets/images/profile.jpg';
import { UserContext } from '../../context/userContext';
import appLogo from '../../assets/images/GCCWhite.png';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginInfo, setLoginRole } from '../../redux/Auth/AuthAction';
import { Form } from 'react-bootstrap';
import MultiSelectButton from '../../components/Buttons/MultiSelect/MultiSelectButtonComponents';
import FormControl from '@mui/material/FormControl';
import Select from '../../components/UI/Select/Select';
import { names } from '../../pages/QuestionBank/CreateQuestions/constant';

const TopBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();
  const selected_Role = localStorage.getItem('selected_Role');
  const { instance, accounts, inProgress } = useMsal();
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [userState, userDispatch] = useContext(UserContext);

  // const [location, setLocation] = useState();

  const togglingDropDown = () => {
    setisDropDownOpen(!isDropDownOpen);
  };

  const [isHeaderOpen, setisHeaderOpen] = useState(false);

  const togglingHeader = () => {
    setisHeaderOpen(!isHeaderOpen);
  };

  function handleProfile() {
    history.push('/myprofile');
  }

  const handleLogout = () => {
    // console.log('logout');
    instance.logout({
      account: accounts[0],
      // account: accounts.length > 0 ? accounts[0] : null,
    });
  };

  useEffect(() => {
    dispatch(setLoginInfo(accounts));
  }, [accounts]);

  //RBAC
  const roles = localStorage.getItem('Roles')?.split(',') || [];
  const [roleValue, setRoleValue] = useState([]);

  const names = [
    { label: 'Self-Assessment Module', value: 'Self-Assessment Module' },
    { label: 'REP Letters Module', value: 'REP Letters Module' },
  ];

  useEffect(() => {
    const userRoles = roles.map((data) => {
      const str = data.split('_').join(' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    if (userRoles?.length > 0) {
      setRoleValue(userRoles);
      dispatch(setLoginRole(selected_Role ?? userRoles[0]));
      localStorage.setItem('selected_Role', selected_Role ?? userRoles[0]);
    }
  }, []);

  return (
    <div className="top-nav">
      <div className="header py-4">
        <div className="container">
          <div className="d-flex">
            <a className="header-brand" href="/">
              {
                <img
                  src={coinLogo}
                  className="header-brand-img"
                  style={{
                    paddingRight: 8,
                    borderRightStyle: 'solid',
                    borderRightColor: 'White',
                  }}
                  //border-right-style: solid; border-right-color: #92a8d1;
                  //style={{ paddingLeft: '0.5rem', height: '1.5rem' }}
                  //style={{ borderRadius: '40px', height: '2.5rem', marginRight: '1rem' }}
                  alt="App Logo"
                />
              }
              <img
                src={abiLogo}
                className="header-brand-img"
                alt="AB InBev Logo"
                // style={{ borderLeft: '1px solid #c9c9c9', paddingLeft: '0.5rem', height: '1.5rem' }}
                style={{ paddingLeft: '0.5rem', height: '1.5rem' }}
              />
            </a>

            <div
              className="d-flex order-lg-2 ml-auto text-left"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            >
              {roleValue.length > 1 && (
                <div>
                  <Form.Group className="input-group mb-3">
                    <Form.Control
                      as="select"
                      name=""
                      placeholder=""
                      className="rbac-dropdown"
                      onChange={(e) => {
                        dispatch(setLoginRole(e.target.value));
                        localStorage.setItem('selected_Role', e.target.value);
                      }}
                      defaultValue={selected_Role}
                    >
                      <option value="">Select Role</option>
                      {roleValue.map((data, i) => (
                        <option value={data} key={i}>
                          {data}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              )}
              <span className="golden-text" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                {process.env.REACT_APP_STAGE === 'prod' ? null : <strong>{`BETA`}</strong>}
              </span>
              <div className="dropdown">
                <a className="nav-link pr-0 leading-none" onClick={togglingDropDown}>
                  <img
                    className="avatar"
                    src={
                      userState?.profile_photo
                        ? URL.createObjectURL(userState?.profile_photo)
                        : defaultProfilePhoto
                    }
                    alt=""
                  />
                  {/* <img className="avatar" src={defaultProfilePhoto} alt="" /> */}
                  <span className="ml-2 d-none d-lg-block">
                    <span className="golden-text">
                      <strong>{accounts.length > 0 ? accounts[0].name : ''}</strong>
                    </span>
                    <span>
                      &emsp;&emsp;&emsp;
                      <FeatherIcon icon="chevron-down" size={14} />
                    </span>
                    <small className="text-muted d-block mt-1">
                      {accounts.length > 0 ? accounts[0].username : ''}
                    </small>
                  </span>
                </a>
                {isDropDownOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-right dropdown-menu-arrow show"
                    style={{ cursor: 'pointer' }}
                  >
                    {/* <a className="dropdown-item text-left" onClick={handleProfile}>
                      My Profile
                    </a> */}
                    <a
                      className="dropdown-item text-left"
                      href="mailto:DL-COEAutomationRM@AnheuserBuschInBev.onmicrosoft.com"
                    >
                      Support
                    </a>
                    <a className="dropdown-item text-left" onClick={handleLogout}>
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
            <a
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
              className={`header-toggler d-lg-none ml-3 ml-lg-0 ${isHeaderOpen ? '' : 'collapsed'}`}
              onClick={togglingHeader}
            >
              <span className="header-toggler-icon"></span>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`header collapse d-lg-flex p-0 ${isHeaderOpen ? 'show' : ''}`}
        id="headerMenuCollapse"
        style={{ background: 'linear-gradient(90deg,#e3af32 0%,#f4e00f 100%)' }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="row align-items-center">
              <div className="col-lg order-lg-first">
                <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li className="nav-item">
                    <a
                      className={`navbar-link ${
                        ['/', '/register'].includes(location?.pathname) ? ' active' : ''
                      }`}
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      <FeatherIcon icon="home" size={14} />
                      &nbsp;{'Home'}
                    </a>
                  </li>

                  {!props.isControlPage && (
                    <>
                      {props.userRole == 'administrational persona' && (
                        <li className="nav-item">
                          <a
                            className={`navbar-link ${
                              ['/master-data-management', '/register'].includes(location?.pathname)
                                ? ' active'
                                : ''
                            }`}
                            onClick={() => {
                              history.push('/master-data-management');
                            }}
                          >
                            <FeatherIcon icon="layers" size={14} />
                            &nbsp;{'Master Data Management'}
                          </a>
                        </li>
                      )}

                      {props.userRole == 'administrational persona' && (
                        <li className="nav-item">
                          <a
                            className={`navbar-link ${
                              ['/questionbank', '/register'].includes(location?.pathname)
                                ? ' active'
                                : ''
                            }`}
                            onClick={() => {
                              history.push('/questionbank');
                            }}
                          >
                            <FeatherIcon icon="help-circle" size={14} />
                            &nbsp;{'Question Bank'}
                          </a>
                        </li>
                      )}

                      {props.userRole == 'administrational persona' && (
                        <li className="nav-item">
                          <a
                            className={`navbar-link ${
                              ['/assessmentbank', '/register'].includes(location?.pathname)
                                ? ' active'
                                : ''
                            }`}
                            onClick={() => {
                              history.push('/assessmentbank');
                            }}
                          >
                            <FeatherIcon icon="clipboard" size={14} />
                            &nbsp;{'Assessment Bank'}
                          </a>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="select-light mt-0">
              <FormControl sx={{ width: 210 }}>
                <Select
                  defaultValue="Self-Assessment Module"
                  size="small"
                  inputProps={{ 'aria-label': 'Without label' }}
                  options={names}
                  onChange={(e) => {
                    history.push(e.target.value === 'REP Letters Module' ? '/REP-Letters' : '/');
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import '../../assets/styles/TopBar.css';
import FeatherIcon from 'feather-icons-react';
import abiLogo from '../../assets/images/abi_logo.png';
import coinLogo from '../../assets/images/coin_logo.png';
import defaultProfilePhoto from '../../assets/images/profile.jpg';
import { UserContext } from '../../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoginInfo,
  setLoginRole,
  setRoles,
  setSelectedModuleRoles,
  setSelectRoles,
} from '../../redux/Auth/AuthAction';
import { Form } from 'react-bootstrap';
import FormControl from '@mui/material/FormControl';
import MultiDropdown from '../../components/UI/MultiDropdown';
import Button from '../../components/UI/Button';
import NestedMenuItem from '../../components/UI/MultiDropdown/NestedMenuItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../components/UI/Select/Select';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const TopBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const selected_module_role = localStorage.getItem('selected_module_Role');
  const { instance, accounts, inProgress } = useMsal();
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  const apiRoles = useSelector((state) => state?.auth?.apiRoles);
  const [userState, userDispatch] = useContext(UserContext);

  // const [location, setLocation] = useState();

  const togglingDropDown = () => {
    setisDropDownOpen(!isDropDownOpen);
  };

  const [isHeaderOpen, setisHeaderOpen] = useState(false);

  const togglingHeader = () => {
    setisHeaderOpen(!isHeaderOpen);
  };

  const handleLogout = () => {
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
  const initModule = [
    { label: 'Assessment Module', value: 'Assessment Module' },
    { label: 'Representation Letter', value: 'Representation Letter', isDisabled: true },
  ];
  console.log('roleValue', roleValue);
  const [module, setModule] = useState(initModule);
  const [activeModule, setActiveModule] = useState(selected_module_role || 'Assessment Module');

  useEffect(() => {
    localStorage.setItem('selected_module_Role', activeModule);
    dispatch(setSelectedModuleRoles(activeModule));
    const rl_roles = localStorage.getItem('rl_roles')
      ? JSON.parse(localStorage.getItem('rl_roles'))
      : {};
    switch (true) {
      case activeModule === 'Assessment Module':
        const data = localStorage.getItem('sa_roles')?.split(',') || [];
        if (data.length > 0) {
          localStorage.setItem('selected_Role', data[0]);
          setRole(data[0])
        }
        const userRoles = data?.map((data) => {
          const str = data.split('_').join(' ');
          return str.charAt(0).toUpperCase() + str.slice(1);
        });
        setRoleValue(userRoles);
        history.push('/');
        break;
      case activeModule === 'BU':
        if (rl_roles.BU) {
          if (rl_roles.BU.length > 0) {
            localStorage.setItem('selected_Role', rl_roles.BU[0]);
            setRole(rl_roles.BU[0])
          }
          localStorage.setItem('Roles', rl_roles.BU);
          setRoleValue(rl_roles.BU);
        } else {
          localStorage.setItem('Roles', '');
        }
        history.push('/');
        break;
      case activeModule === 'Functional':
        if (rl_roles.Functional) {
          if (rl_roles.Functional.length > 0) {
            localStorage.setItem('selected_Role', rl_roles.Functional[0]);
            setRole(rl_roles.Functional[0])
          }
          localStorage.setItem('Roles', rl_roles.Functional);
          setRoleValue(rl_roles.Functional);
        } else {
          localStorage.setItem('Roles', '');
        }
        history.push('/');
        break;
      default:
        break;
    }
  }, [activeModule]);

  const setRole = (data) => {
    if(!data) return;
    const str = data.split('_').join(' ');
    dispatch(setLoginRole(str.charAt(0).toUpperCase() + str.slice(1)));
  }

  useEffect(() => {
    setTimeout(() => {
      if (roles[0] === 'undefined') return;
      const userRoles = roles.map((data) => {
        const str = data.split('_').join(' ');
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      if (userRoles?.length > 0) {
        dispatch(setLoginRole(selected_Role ?? userRoles[0]));
        localStorage.setItem('selected_Role', selected_Role ?? userRoles[0]);
      }
    }, 500);
  }, [roles.length]);

  useEffect(() => {
    if (Object.keys(apiRoles).length > 0) {
      const newArray = initModule.map((val) => {
        if (val.value === 'Representation Letter' && apiRoles.rl_roles) {
          const newObj = Object.keys(apiRoles.rl_roles).map((r) => {
            return { value: r, label: r };
          });
          val.subVal = newObj.filter((d) => d.value !== 'is_admin');
        }
        return val;
      });
      setModule(newArray);
    }
  }, [apiRoles]);

  return (
    <div className="top-nav">
      <div className="header py-4">
        <div className="container-fluid">
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
              {roleValue.length > 0 && (
                <div>
                  <span className={'text-yellow ml-2'}>Select Role:</span>
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
                      value={loginRole ?? selected_Role}
                    >
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
        {!['/login', '/not-authorized'].includes(location?.pathname) && (
          <div className="container-fluid w-full">
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
                        {
                          <li className="nav-item">
                            <a
                              className={`navbar-link ${
                                ['/master-data-management', '/register'].includes(
                                  location?.pathname,
                                )
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
                        }

                        {
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
                        }

                        {
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
                        }

                        {
                          <li className="nav-item">
                            <a
                              className={`navbar-link ${
                                ['/admin-panel', '/register'].includes(location?.pathname)
                                  ? ' active'
                                  : ''
                              }`}
                              onClick={() => {
                                history.push('/admin-panel');
                              }}
                            >
                              <FeatherIcon icon="shield" size={14} />
                              &nbsp;{'Admin Panel'}
                            </a>
                          </li>
                        }
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="select-light mt-0">
                <FormControl sx={{ maxWidth: 270 }}>
                  <MultiDropdown
                    className="w-full"
                    trigger={
                      <Button variant="warning" className="btn-border">
                        {activeModule}
                      </Button>
                    }
                    menu={module.map((val, i) => {
                      return (
                        <NestedMenuItem
                          key={i}
                          className="DropdownNestedMenuItem"
                          label={val.label}
                          rightAnchored
                          onClick={() => {
                            console.log('valvalvalvalval', val);
                            if (val.isDisabled) return;
                            setActiveModule(val.label);
                            // history.push(
                            //   '/'
                            // );
                          }}
                          menu={
                            val.subVal?.length > 0
                              ? val.subVal.map((sVal, subi) => {
                                  return (
                                    <MenuItem
                                      key={`${i}--${subi}`}
                                      className="DropdownMenuItem"
                                      onClick={() => {
                                        if (sVal.isDisabled) return;
                                        setActiveModule(sVal.label);
                                      }}
                                    >
                                      {sVal.label}
                                    </MenuItem>
                                  );
                                })
                              : null
                          }
                        />
                      );
                    })}
                  />
                </FormControl>

                <FormControl sx={{ maxWidth: 270 }}>
                  {/*<Select*/}
                  {/*  defaultValue="Assessment Module"*/}
                  {/*  size="small"*/}
                  {/*  inputProps={{ 'aria-label': 'Without label' }}*/}
                  {/*  options={names}*/}
                  {/*  onChange={(e) => {*/}
                  {/*    history.push(*/}
                  {/*      e.target.value === 'Representation Letter Module' ? '/REP-Letters' : '/',*/}
                  {/*    );*/}
                  {/*  }}*/}
                  {/*/>`*/}
                </FormControl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

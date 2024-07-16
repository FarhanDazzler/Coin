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
import { ActionIcon } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';
import CachedIcon from '@mui/icons-material/Cached';
import {
  setLoginInfo,
  setLoginRole,
  setRoles,
  setSelectedModuleRoles,
  setSelectRoles,
} from '../../redux/Auth/AuthAction';
import { Form } from 'react-bootstrap';
import FormControl from '@mui/material/FormControl';
import Select from '../../components/UI/Select/Select';
import i18n from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { authAPIRolesSelector } from '../../redux/Auth/AuthSelectors';
import { AlignCenter } from 'tabler-icons-react';

const TopBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const selected_module_role = localStorage.getItem('selected_module_Role');
  const { instance, accounts, inProgress } = useMsal();
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const authAPIRoles = useSelector(authAPIRolesSelector);

  const [userState, userDispatch] = useContext(UserContext);

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Mandarin', value: 'zh' },
    { label: 'Korean', value: 'ko' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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

  const [rolesOption, setRolesOption] = useState([]);
  const [rolesVal, setRolesVal] = useState(loginRole || selected_Role);
  const [module, setModule] = useState([]);
  const [activeModule, setActiveModule] = useState(
    selected_module_role === 'null' ? '' : selected_module_role,
  );
  const [lan, setLan] = useState(i18n.language);

  useEffect(() => {
    setLan(i18n.language);
    if (!authAPIRoles || (authAPIRoles && !Object.keys(authAPIRoles).length)) return;

    const moduleOptionData = Object.keys(authAPIRoles).map((d) => ({ label: d, value: d }));
    if (!moduleOptionData?.length) return;
    setModule(moduleOptionData);
    let activeModuleVal = activeModule ?? moduleOptionData[0].value;

    const findModule = moduleOptionData?.find((d) => d.label === activeModuleVal);

    if (!findModule) {
      activeModuleVal = moduleOptionData[0].value;
    }

    dispatch(setSelectedModuleRoles(activeModuleVal));
    localStorage.setItem('selected_module_Role', activeModuleVal);
    setActiveModule(activeModuleVal);
    const roleOptionData = authAPIRoles[activeModuleVal];
    if (!roleOptionData) return;

    setRolesOption(roleOptionData);
    const findRole = roleOptionData?.find((v) => v.value === rolesVal);
    if (rolesVal && findRole && rolesVal !== 'null') {
      dispatch(setLoginRole(rolesVal));
      localStorage.setItem('selected_Role', rolesVal);
    } else {
      dispatch(setLoginRole(roleOptionData[0]?.value));
      setRolesOption(roleOptionData);
      setRolesVal(roleOptionData[0]?.value);
      localStorage.setItem('selected_Role', roleOptionData[0]?.value);
    }
    //TODO: set deps here
  }, [authAPIRoles]);

  const TopBar_SA = () => {
    // TOP BAR Buttons/ Tabs for Seld Assessment Module
    return (
      <div
        className="nav nav-tabs border-0 flex-column flex-lg-row"
        style={{ marginRight: '10px' }}
      >
        <ul className="nav nav-tabs border-0 flex-wrap">
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

          <li className="nav-item">
            <a
              className={`navbar-link ${
                ['/kpi-module', '/register'].includes(location?.pathname) ? ' active' : ''
              }`}
              onClick={() => {
                history.push('/kpi-module');
              }}
            >
              <FeatherIcon icon="grid" size={14} />
              &nbsp;{'KPI Module'}
            </a>
          </li>

          {!props.isControlPage && (
            <>
              {
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
              }

              {
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/questionbank', '/register'].includes(location?.pathname) ? ' active' : ''
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
                      ['/assessmentbank', '/register'].includes(location?.pathname) ? ' active' : ''
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
                      ['/reporting'].includes(location?.pathname) ? ' active' : ''
                    }`}
                    onClick={() => {
                      history.push('/reporting');
                    }}
                  >
                    <FeatherIcon icon="flag" size={14} />
                    &nbsp;{'Reporting'}
                  </a>
                </li>
              }

              {localStorage.getItem('selected_Role') == 'Global Internal Control' && (
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/admin-panel', '/register'].includes(location?.pathname) ? ' active' : ''
                    }`}
                    onClick={() => {
                      history.push('/admin-panel');
                    }}
                  >
                    <FeatherIcon icon="shield" size={14} />
                    &nbsp;{'Admin Panel'}
                  </a>
                </li>
              )}
            </>
          )}
        </ul>
        <div
          className="nav nav-tabs border-0 nav-item"
          style={{ marginLeft: 'auto', marginRight: '20px' }}
        >
          <a
            className={`navbar-link ${
              ['/contact-us'].includes(location?.pathname) ? ' active' : ''
            }`}
            onClick={() => {
              history.push('/contact-us');
            }}
          >
            <FeatherIcon icon="pocket" size={14} />
            &nbsp;{'Report a Bug'}
          </a>
        </div>
      </div>
    );
  };

  const TopBar_RL = () => {
    // TOP BAR Buttons/ Tabs for Rep Letters
    return (
      <div
        className="nav nav-tabs border-0 flex-column flex-lg-row"
        style={{ marginRight: '20px' }}
      >
        <ul className="nav nav-tabs border-0 flex-wrap">
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

          {[
            'BU Zone Internal Control',
            'Functional Zone Internal Control',
            'Global Persona',
          ].includes(localStorage.getItem('selected_Role')) && (
            <>
              {
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/REP-Letters/master-data-management', '/register'].includes(
                        location?.pathname,
                      )
                        ? ' active'
                        : ''
                    }`}
                    onClick={() => {
                      history.push('/REP-Letters/master-data-management');
                    }}
                  >
                    <FeatherIcon icon="layers" size={14} />
                    &nbsp;{'Master Data Management'}
                  </a>
                </li>
              }

              {localStorage.getItem('selected_Role') == 'Global Persona' && (
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/REP-Letters/questionbank', '/register'].includes(location?.pathname)
                        ? ' active'
                        : ''
                    }`}
                    onClick={() => {
                      history.push('/REP-Letters/questionbank');
                    }}
                  >
                    <FeatherIcon icon="help-circle" size={14} />
                    &nbsp;{'Question Bank'}
                  </a>
                </li>
              )}

              {
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/REP-Letters/scheduling-and-triggering', '/register'].includes(
                        location?.pathname,
                      )
                        ? ' active'
                        : ''
                    }`}
                    onClick={() => {
                      history.push('/REP-Letters/scheduling-and-triggering');
                    }}
                  >
                    <FeatherIcon icon="clipboard" size={14} />
                    &nbsp;{'Scheduling & Triggering'}
                  </a>
                </li>
              }
              {
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/REP-Letters/reporting', '/register'].includes(location?.pathname)
                        ? ' active'
                        : ''
                    }`}
                    onClick={() => {
                      history.push('/REP-Letters/reporting');
                    }}
                  >
                    <FeatherIcon icon="flag" size={14} />
                    &nbsp;{'Reporting'}
                  </a>
                </li>
              }
              {localStorage.getItem('selected_Role') == 'Global Persona' && (
                <li className="nav-item">
                  <a
                    className={`navbar-link ${
                      ['/admin-panel', '/register'].includes(location?.pathname) ? ' active' : ''
                    }`}
                    onClick={() => {
                      history.push('/admin-panel');
                    }}
                  >
                    <FeatherIcon icon="shield" size={14} />
                    &nbsp;{'Admin Panel'}
                  </a>
                </li>
              )}
            </>
          )}
        </ul>
        <div
          className="nav nav-tabs border-0 nav-item"
          style={{ marginLeft: 'auto', marginRight: '20px' }}
        >
          <a
            className={`navbar-link ${
              ['/contact-us'].includes(location?.pathname) ? ' active' : ''
            }`}
            onClick={() => {
              history.push('/contact-us');
            }}
          >
            <FeatherIcon icon="pocket" size={14} />
            {' Report a Bug'}
          </a>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   if (!(loginRole || selected_Role) && rolesOption?.length > 0) {
  //     localStorage.setItem('selected_Role', rolesOption[0]);
  //     dispatch(setLoginRole(rolesOption[0]));
  //     window.location.reload();
  //   }
  // }, [rolesOption, loginRole, selected_Role]);

  const handleHardRefresh = () => {
    history.push('/');
    window.location.reload(true);
  };

  return (
    <div className="top-nav">
      <div className="header py-4">
        <div className="container-fluid">
          <div className="d-flex">
            <div className="header-wrapper">
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
                    alt="App Logo"
                  />
                }
                <img
                  src={abiLogo}
                  className="header-brand-img"
                  alt="AB InBev Logo"
                  style={{ paddingLeft: '0.5rem', height: '2rem' }}
                />
              </a>

              <div className="mr-4 wrapperLanguage d-flex align-items-center">
                {props.isControlPage && (
                  <>
                    <div>
                      <div>
                        <span className={'text-yellow ml-2'}>
                          {t('selfAssessment.homePage.controleOwner.select_language')}
                        </span>
                      </div>
                      <FormControl sx={{ width: 140 }}>
                        <Select
                          size="small"
                          inputLook
                          classes={{ root: `select-options inputLook-text user-role-input` }}
                          inputProps={{ 'aria-label': 'Without label' }}
                          options={languages}
                          onChange={(e) => {
                            changeLanguage(e.target.value);
                            setLan(e.target.value);
                          }}
                          value={
                            lan || languages?.find((item) => item.value == i18n.language).value
                          }
                        />
                      </FormControl>
                    </div>
                  </>
                )}
                {!location.pathname.includes('/BU-Letter-approve') &&
                  !location.pathname.includes('/BU-Zone-Letter-approve') &&
                  !location.pathname.includes(
                    '/REP-Letters/attempt-letter/functional-letter-form/',
                  ) &&
                  !location.pathname.includes('/not-authorized') && (
                    <div>
                      <div>
                        <span className={'text-yellow ml-2'}>Select Module :</span>
                      </div>
                      <FormControl sx={{ width: 300, marginLeft: '15px' }}>
                        <Select
                          defaultValue="Assessment Module"
                          size="small"
                          inputLook
                          classes={{ root: `select-options inputLook-text user-role-input` }}
                          inputProps={{ 'aria-label': 'Without label' }}
                          options={module}
                          onChange={({ target: { value } }) => {
                            setActiveModule(value);
                            localStorage.setItem('selected_module_Role', value);
                            window.location.href = '/';
                          }}
                          value={activeModule}
                        />
                      </FormControl>
                    </div>
                  )}
              </div>
            </div>
            <div
              className="d-flex order-lg-2 ml-auto  user-info-wrapper"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            >
              {rolesOption.length > 0 &&
                !location.pathname.includes('/BU-Letter-approve') &&
                !location.pathname.includes('/BU-Zone-Letter-approve') &&
                !location.pathname.includes('/REP-Letters/attempt-letter/functional-letter-form') &&
                !location.pathname.includes('/not-authorized') && (
                  <div className="mr-4">
                    <div>
                      <span className={'text-yellow ml-2'}>
                        {t('selfAssessment.homePage.controleOwner.select_role')}
                      </span>
                    </div>
                    <FormControl sx={{ width: 250 }}>
                      <Select
                        defaultValue="Assessment Module"
                        size="small"
                        inputLook
                        classes={{ root: `select-options inputLook-text user-role-input` }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        options={rolesOption}
                        onChange={({ target: { value } }) => {
                          dispatch(setLoginRole(value));
                          localStorage.setItem('selected_Role', value);
                          setRolesVal(value);
                          window.location.href = '/';
                        }}
                        value={rolesVal}
                      />
                    </FormControl>
                  </div>
                )}
              <div className="d-flex align-items-center justify-content-end">
                <span className="golden-text" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                  {process.env.REACT_APP_STAGE === 'prod' ? null : <strong>{`BETA`}</strong>}
                </span>
                <span
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: '1rem',
                    marginLeft: '1rem',
                  }}
                >
                  <Tooltip title="Refresh Application" position="bottom">
                    <ActionIcon
                      size="md"
                      radius="xl"
                      variant="filled"
                      color="yellow"
                      onClick={() => {
                        handleHardRefresh();
                      }}
                    >
                      <CachedIcon size={18} />
                    </ActionIcon>
                  </Tooltip>
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
                      <a
                        className="dropdown-item text-left"
                        onClick={() => {
                          history.push('/contact-us');
                          togglingDropDown();
                        }}
                      >
                        Report a Bug
                      </a>
                      <a className="dropdown-item text-left" onClick={handleLogout}>
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
                <a
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                  className={`header-toggler d-lg-none ml-3 ml-lg-0 ${
                    isHeaderOpen ? '' : 'collapsed'
                  }`}
                  onClick={togglingHeader}
                >
                  <span className="header-toggler-icon"></span>
                </a>
              </div>
            </div>
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
            {/* <div className="d-flex align-items-center justify-content-between"> */}
            <div className="row align-items-center">
              <div className="col-lg order-lg-first">
                {selected_module_role == 'Assessment Module' ? <TopBar_SA /> : <TopBar_RL />}
              </div>
            </div>
            {/* <div className="select-light mt-0">
                <FormControl sx={{ maxWidth: 270 }}> */}
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
            {/*/>*/}
            {/* </FormControl>
              </div> */}
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

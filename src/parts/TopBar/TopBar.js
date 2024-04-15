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
import MultiDropdown from '../../components/UI/MultiDropdown';
import Button from '../../components/UI/Button';
import NestedMenuItem from '../../components/UI/MultiDropdown/NestedMenuItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../components/UI/Select/Select';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import i18n from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';

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

  const apiRoles = useSelector((state) => state?.auth?.apiRoles);
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

  //RBAC
  const roles = localStorage.getItem('Roles')?.split(',') || [];
  const [roleValue, setRoleValue] = useState([]);
  const initModule = [
    { label: 'Assessment Module', value: 'Assessment Module' },
    { label: 'Representation Letter', value: 'Representation Letter', isDisabled: true },
  ];
  const [module, setModule] = useState([]);
  const [activeModule, setActiveModule] = useState(selected_module_role);
  const [lan, setLan] = useState(i18n.language);

  useEffect(() => {
    localStorage.setItem('selected_module_Role', activeModule);
    dispatch(setSelectedModuleRoles(activeModule));
    const rl_roles = localStorage.getItem('rl_roles')
      ? JSON.parse(localStorage.getItem('rl_roles'))
      : {};
    switch (true) {
      case activeModule === 'Assessment Module':
        const sa_roles_data = localStorage.getItem('sa_roles')?.split(',') || [];
        const data = sa_roles_data.filter((d) => d);
        if (data.length > 0) {
          localStorage.setItem('selected_Role', data[0]);
          setRole(data[0]);
        }
        const userRoles = data?.map((data) => {
          const str = data.split('_').join(' ');
          return str.charAt(0).toUpperCase() + str.slice(1);
        });
        setRoleValue(userRoles);
        // history.push('/');
        break;
      case activeModule === 'BU':
        if (rl_roles.BU) {
          if (rl_roles.BU.length > 0) {
            localStorage.setItem('selected_Role', rl_roles.BU[0]);
            setRole(rl_roles.BU[0]);
          }
          const userBURoles = rl_roles.BU?.map((data) => {
            const str = data.split('_').join(' ');
            return str.charAt(0).toUpperCase() + str.slice(1);
          });
          localStorage.setItem('Roles', userBURoles);
          setRoleValue(userBURoles);
        } else {
          localStorage.setItem('Roles', '');
        }
        // history.push('/');
        break;
      case activeModule === 'Functional':
        if (rl_roles.Functional) {
          if (rl_roles.Functional.length > 0) {
            localStorage.setItem('selected_Role', rl_roles.Functional[0]);
            setRole(rl_roles.Functional[0]);
          }
          localStorage.setItem('Roles', rl_roles.Functional);
          setRoleValue(rl_roles.Functional);
        } else {
          localStorage.setItem('Roles', '');
        }
        // history.push('/');
        break;
      default:
        break;
    }
  }, [activeModule, selected_module_role, roles.length]);

  const setRole = (data) => {
    if (!data) return;
    const str = data.split('_').join(' ');
    dispatch(setLoginRole(str.charAt(0).toUpperCase() + str.slice(1)));
  };

  useEffect(() => {
    setLan(i18n.language);
    setTimeout(() => {
      if (roles[0] === 'undefined') return;
      const userRoles = roles.map((data) => {
        const str = data.split('_').join(' ');
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      if (userRoles?.length > 0) {
        const value = selected_Role?.split('_')?.join(' ');
        const val = value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
        const userRoleVal = userRoles[0]
          ? userRoles[0].charAt(0).toUpperCase() + userRoles[0].slice(1)
          : '';
        dispatch(setLoginRole(val ?? userRoleVal));
        localStorage.setItem('selected_Role', val ?? userRoleVal);
      }
    }, 500);
  }, [roles.length]);

  const rl_roles = localStorage.getItem('rl_roles')
    ? JSON.parse(localStorage.getItem('rl_roles'))
    : {};

  useEffect(
    (callbackfn, thisArg) => {
      if (Object.keys(apiRoles).length > 0) {
        let isSetVal = !!selected_module_role && selected_module_role !== 'null';
        const newArray = initModule.map((val) => {
          if (val.value === 'Representation Letter' && apiRoles.rl_roles) {
            const newObj = Object.keys(apiRoles.rl_roles).map((r) => {
              return { value: r, label: r };
            });
            val.subVal = newObj.filter((d) => {
              let isValid = false;
              switch (true) {
                case d.value === 'BU':
                  if (rl_roles.BU) {
                    if (rl_roles.BU.length > 0) {
                      isValid = true;
                    }
                  }
                  break;
                case d.value === 'Functional':
                  if (rl_roles.Functional) {
                    if (rl_roles.Functional.length > 0) {
                      isValid = true;
                    }
                  }
                  break;
                default:
                  break;
              }
              return d.value !== 'is_admin' && isValid;
            });
          }
          return val;
        });

        const newDataArray = newArray.filter((d) => {
          let isValid = false;
          const rl_roles = apiRoles?.rl_roles;
          switch (true) {
            case d.value === 'Assessment Module':
              const sa_roles_data = apiRoles?.sa_roles || [];
              const data = sa_roles_data.filter((d) => d);
              if (data.length > 0) {
                isValid = true;
              }
              return isValid;

            case d.value === 'Representation Letter':
              d.subVal.forEach((vl) => {
                switch (true) {
                  case vl.value === 'BU':
                    if (rl_roles.BU) {
                      if (rl_roles.BU.length > 0) {
                        isValid = true;
                      }
                    }
                    break;
                  case vl.value === 'Functional':
                    if (rl_roles.Functional) {
                      if (rl_roles.Functional.length > 0) {
                        isValid = true;
                      }
                    }
                    break;
                  default:
                    break;
                }
              });
              isValid = true;
              break;

            default:
              break;
          }

          return isValid;
        });

        if (!isSetVal) {
          let isSet = false;
          newDataArray.forEach((arrVal, i) => {
            if (isSet) return;
            if (!arrVal?.subVal && !arrVal?.subVal?.length) {
              localStorage.setItem('selected_module_Role', arrVal?.value);
              setActiveModule(arrVal?.value);
              isSet = true;
              // window.location.href = '/';
            } else {
              if (arrVal?.subVal?.length > 0) {
                localStorage.setItem('selected_module_Role', arrVal?.subVal[0].value);
                setActiveModule(arrVal?.subVal[0].value);
                isSet = true;
                // window.location.href = '/';
              }
            }
          });
        }

        const newOptions = [];
        newDataArray.forEach((val) => {
          if (val.subVal) {
            val.subVal.forEach((subVal) => {
              newOptions.push({ ...subVal, label: subVal.label + ' ' + val.label });
            });
            return;
          }
          newOptions.push(val);
        });
        setModule(newOptions);
      }
    },
    [apiRoles],
  );
  const TopBar_SA = () => {
    // TOP BAR Buttons/ Tabs for Seld Assessment Module
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

              {localStorage.getItem('selected_Role') == 'Global internal control' && (
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

  useEffect(() => {
    if (!(loginRole || selected_Role) && roleValue?.length > 0) {
      localStorage.setItem('selected_Role', roleValue[0]);
      dispatch(setLoginRole(roleValue[0]));
      window.location.reload();
    }
  }, [roleValue, loginRole, selected_Role]);

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
                          value={lan || languages.find((item) => item.value == i18n.language).value}
                        />
                      </FormControl>
                    </div>
                  </>
                )}
                {!location.pathname.includes('/BU-Letter-approve') &&
                  !location.pathname.includes('/BU-Zone-Letter-approve') && (
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
                          onChange={(e) => {
                            setActiveModule(e.target.value);
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
              {roleValue.length > 0 &&
                !location.pathname.includes('/BU-Letter-approve') &&
                !location.pathname.includes('/BU-Zone-Letter-approve') && (
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
                        options={roleValue}
                        onChange={(e) => {
                          dispatch(setLoginRole(e.target.value));
                          localStorage.setItem('selected_Role', e.target.value);
                          history.push('/');
                          // window.location.href = '/';
                        }}
                        value={
                          (loginRole || selected_Role) === 'control_oversight'
                            ? 'Control oversight'
                            : loginRole || selected_Role
                        }
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

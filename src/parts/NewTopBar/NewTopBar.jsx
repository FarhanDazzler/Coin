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
import { ActionIcon, Button } from '@mantine/core';
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
import { useParams } from 'react-router';
import { useGoHomePage } from '../../hooks/useGoHomePage';

const NewTopBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { handleHomePageRedirect } = useGoHomePage();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { moduleName, roleName } = useParams();
  const selected_Role = roleName || localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const selected_module_role = moduleName || localStorage.getItem('selected_module_Role');

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
      const valueRole = moduleName || roleOptionData[0]?.value;
      dispatch(setLoginRole(valueRole));
      setRolesOption(roleOptionData);
      setRolesVal(valueRole);
      localStorage.setItem('selected_Role', valueRole);
    }
    //TODO: set deps here
  }, [authAPIRoles]);

  const handleHardRefresh = () => {
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
            </div>

            <div className="w-full">
              <p className="welcome-text-navbar">Welcome</p>
              <p className="welcome-text-username">{accounts.length > 0 ? accounts[0].name : ''}</p>
            </div>

            <div
              className="d-flex order-lg-2user-info-wrapper"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            >
              <div className="d-flex align-items-center justify-content-end">
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
                      onClick={() => {
                        handleHardRefresh();
                      }}
                    >
                      <FeatherIcon
                        onClick={() => {
                          handleHardRefresh();
                        }}
                        color="#e3af32"
                        icon="rotate-cw"
                        // size={14}
                      />
                    </ActionIcon>
                  </Tooltip>
                </span>

                <Button
                  color="yellow"
                  leftIcon={<FeatherIcon icon="pocket" size={14} />}
                  radius="xl"
                  onClick={() => {
                    history.push('/contact-us');
                  }}
                >
                  Report a Bug
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTopBar;

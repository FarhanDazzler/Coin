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

const TopBar = (props) => {
  const history = useHistory();
  const location = useLocation();

  const isAuthenticated = useIsAuthenticated();

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

  const [rtoHubAccess, setRtoHubAccess] = useState();

  useEffect(() => {
    // console.log(location);
  }, [location]);

  useEffect(() => {
    // console.log(userState);
  }, [userState]);

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
                  style={{ paddingRight: 8, borderRightStyle: 'solid', borderRightColor: 'White' }}
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
          <div className="row align-items-center">
            <div className="col-lg order-lg-first">
              <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
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

                {(props.userRole == 'Global Internal Control' ||
                  props.userRole == 'Zonal Internal Control') && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        ['/', '/register'].includes(location?.pathname) ? ' active' : ''
                      }`}
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      <FeatherIcon icon="layers" size={14} />
                      &nbsp;{'Master Data Management'}
                    </a>
                  </li>
                )}

                {(props.userRole == 'Global Internal Control' ||
                  props.userRole == 'Zonal Internal Control') && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        ['/', '/register'].includes(location?.pathname) ? ' active' : ''
                      }`}
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      <FeatherIcon icon="layers" size={14} />
                      &nbsp;{'Assessments'}
                    </a>
                  </li>
                )}

                {(props.userRole == 'Global Internal Control' ||
                  props.userRole == 'Zonal Internal Control') && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        ['/', '/register'].includes(location?.pathname) ? ' active' : ''
                      }`}
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      <FeatherIcon icon="layers" size={14} />
                      &nbsp;{'Question Bank'}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

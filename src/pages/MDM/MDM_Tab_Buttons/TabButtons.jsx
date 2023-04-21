import { AlertCircle } from 'tabler-icons-react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from './Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Toast, Row, Col, Container, ToastContainer } from 'react-bootstrap';

function NavTabsMDM() {
  const location = useLocation();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState();

  // useEffect(() => {
  //   console.log(`Tab ID: ${activeTab}`);
  // }, [activeTab]);

  const handleClick = (url, tabId) => () => {
    setActiveTab(tabId);
    //console.log(tabId, 'Active tab ID');
    history.push(url);
  };
  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ErrorOutlineIcon color={activeTab === number ? 'black' : '#ffc800'} />
    </Tooltip>
  );
  const MyComponent = React.memo((props) => {
    return (
      <div className="text-center">
        <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ActiveTool number={1} text="Free Text" />}
            className={
              location.pathname === '/master-data-management/organization-hierarchy'
                ? 'active-tab-button'
                : 'mr-4 tabButton'
            }
            //className="mr-4"
            onClick={handleClick('/master-data-management/organization-hierarchy', 1)}
          >
            Organization Hierarchy
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<ActiveTool number={2} text="Free Text" />}
            className={
              location.pathname ===
              '/master-data-management/applicability-assignment-of-provider-organization'
                ? 'active-tab-button'
                : 'mr-4 tabButton'
            }
            onClick={handleClick(
              '/master-data-management/applicability-assignment-of-provider-organization',
              2,
            )}
          >
            Applicability & Assignment of Provider Organization
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ActiveTool number={3} text="Free Text" />}
            className={
              location.pathname === '/master-data-management/co-owner-oversight'
                ? 'active-tab-button'
                : 'mr-4 tabButton'
            }
            onClick={handleClick('/master-data-management/co-owner-oversight', 3)}
          >
            Control Owner & Oversight
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ActiveTool number={4} text="Free Text" />}
            className={
              location.pathname === '/master-data-management/mics-framework'
                ? 'active-tab-button'
                : 'mr-4 tabButton'
            }
            onClick={handleClick('/master-data-management/mics-framework', 4)}
          >
            MICS Framework
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ActiveTool number={5} text="Free Text" />}
            className={
              location.pathname === '/master-data-management/mega-process-sub-Process'
                ? 'active-tab-button'
                : 'mr-4 tabButton'
            }
            onClick={handleClick('/master-data-management/mega-process-sub-Process', 5)}
          >
            Mega Process & Sub-Process
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="row pt-5">
      <MyComponent />
    </div>
  );
}

export default NavTabsMDM;

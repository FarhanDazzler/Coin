import { AlertCircle } from 'tabler-icons-react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from './Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';

function NavTabsMDM() {
  const location = useLocation();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState();

  const handleClick = (url, tabId) => () => {
    setActiveTab(tabId);
    setTimeout(() => {
      history.push(url);
    }, 1500);
  };
  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ErrorOutlineIcon color={activeTab === number ? 'black' : '#ffc800'} />
    </Tooltip>
  );
  const MyComponent = React.memo((props) => {
    return (
      <div className="col col-lg-12" style={{ marginLeft: '160px' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool number={1} text="Free Text" />}
          className={activeTab === 1 ? 'active-tab-button' : 'mr-4 tabButton'}
          //className="mr-4"
          onClick={handleClick('/master-data-management/organization-hierarchy', 1)}
        >
          Organization Hierarchy
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool number={2} text="Free Text" />}
          className={activeTab === 2 ? 'active-tab-button' : 'mr-4 tabButton'}
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
          className={activeTab === 3 ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={handleClick('/master-data-management/co-owner-oversight', 3)}
        >
          Control Owner & Oversight
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool number={4} text="Free Text" />}
          className={activeTab === 4 ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={handleClick('/master-data-management/mics-framework', 4)}
        >
          MICS Framework
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool number={5} text="Free Text" />}
          className={activeTab === 5 ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={handleClick('/master-data-management/mega-process-sub-Process', 5)}
        >
          Mega Process & Sub-Process
        </Button>
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

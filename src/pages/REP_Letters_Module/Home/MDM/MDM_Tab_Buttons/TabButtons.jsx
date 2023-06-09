import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from './Button';
import { useLocation, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

function NavTabsMDM() {
  const location = useLocation();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState();

  const handleClick = (url, tabId) => () => {
    setActiveTab(tabId);
    history.push(url);
  };
  const ActiveTool = ({ number, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ErrorOutlineIcon color={activeTab === number ? 'black' : '#ffc800'} />
    </Tooltip>
  );
  const MyComponent = React.memo((props) => {
    return (
      <div className="container-fluid">
        <div className="col-12">
          <div className="text-center">
            <div>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ActiveTool number={1} text="Free Text" />}
                className={
                  location.pathname === '/REP-Letters/master-data-management/organization-hierarchy'
                    ? 'active-tab-button'
                    : 'mr-4 tabButton'
                }
                //className="mr-4"
                onClick={handleClick('/REP-Letters/master-data-management/organization-hierarchy', 1)}
              >
                Organization Hierarchy
              </Button>

              <Button
                variant="outlined"
                size="small"
                startIcon={<ActiveTool number={2} text="Free Text" />}
                className={
                  location.pathname ===
                  '/REP-Letters/master-data-management/bu-masterdata-management'
                    ? 'active-tab-button'
                    : 'mr-4 tabButton'
                }
                onClick={handleClick(
                  '/REP-Letters/master-data-management/bu-masterdata-management',
                  2,
                )}
              >
                BU Masterdata Management
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ActiveTool number={3} text="Free Text" />}
                className={
                  location.pathname === '/REP-Letters/master-data-management/functional-masterdata-management'
                    ? 'active-tab-button'
                    : 'mr-4 tabButton'
                }
                onClick={handleClick('/REP-Letters/master-data-management/functional-masterdata-management', 3)}
              >
                Functional Masterdata Management
              </Button>
              
            </div>
          </div>
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

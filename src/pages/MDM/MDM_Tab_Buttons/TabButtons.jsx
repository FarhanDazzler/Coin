import { AlertCircle } from 'tabler-icons-react';
import Button from './Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

function NavTabsMDM() {
  const location = useLocation();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState();

  const handleClick = (url, tabId) => {
    setActiveTab(tabId);
    console.log(tabId, 'Current Tab ID');
    history.push(url);
  };

  const MyComponent = React.memo((props) => {
    return (
      <div className="col col-lg-12" style={{ marginLeft: '30px' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <AlertCircle
              size={20}
              strokeWidth={1.5}
              color={activeTab === 1 ? 'black' : '#ffc800'}
            />
          }
          className={activeTab === 1 ? 'active-tab-button' : 'mr-4'}
          //className="mr-4"
          onClick={() => handleClick('/master-data-management/organization-hierarchy', 1)}
        >
          Organization Hierarchy
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={
            <AlertCircle
              size={20}
              strokeWidth={1.5}
              color={activeTab === 2 ? 'black' : '#ffc800'}
            />
          }
          className={activeTab === 2 ? 'active-tab-button' : 'mr-4'}
          onClick={() =>
            handleClick(
              '/master-data-management/applicability-assignment-of-provider-organization',
              2,
            )
          }
        >
          Applicability & Assignment of Provider Organization
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <AlertCircle
              size={20}
              strokeWidth={1.5}
              color={activeTab === 3 ? 'black' : '#ffc800'}
            />
          }
          className={activeTab === 3 ? 'active-tab-button' : 'mr-4'}
          onClick={() => handleClick('/master-data-management/co-owner-oversight', 3)}
        >
          Control Owner & Oversight
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <AlertCircle
              size={20}
              strokeWidth={1.5}
              color={activeTab === 4 ? 'black' : '#ffc800'}
            />
          }
          className={activeTab === 4 ? 'active-tab-button' : 'mr-4'}
          onClick={() => handleClick('/master-data-management/mics-framework', 4)}
        >
          MICS Framework
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <AlertCircle
              size={20}
              strokeWidth={1.5}
              color={activeTab === 5 ? 'black' : '#ffc800'}
            />
          }
          className={activeTab === 5 ? 'active-tab-button' : 'mr-4'}
          onClick={() => handleClick('/master-data-management/mega-process-sub-Process', 5)}
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

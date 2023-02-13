import React from 'react';
import FormControl from '@mui/material/FormControl';
import DashboardTable from './HomePageTable/HomePageTableComponent';
import PageWrapper from '../wrappers/PageWrapper';
import './homeStyles.scss';
import Select from '../UI/Select/Select';
import NumberWithText from './NumberWithText';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import HomeTableModal from './HomeTableModal';
import ProgressBar from '../HomePageTable/ProgressBar/ProgressBar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 140,
    },
  },
};

const names = ['All Zones', 'AFR', 'NAZ', 'EUR', 'APAC'];

const HomePage = () => {
  const [personName, setPersonName] = React.useState(['All Zones']);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
            </div>
            <div className="col-lg-8">
              <div className="home-right-overview">
                <div className="wrapper-info-grid">
                  <div>
                    <FormControl sx={{ m: 1, width: 130, mt: 3 }}>
                      <Select
                        value={personName}
                        onChange={handleChange}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Placeholder</em>;
                          }
                          return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                        options={names}
                      />
                    </FormControl>

                    <div className="d-flex align-items-center mt-4">
                      <ProgressBar />
                      {/* <div className="ml-2">
                        <p className="text-white">1st Assessment Cycle</p>
                      <h2 className="yellow-gradient-text graph-value">60 %</h2>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <div className="right-number">
                      <NumberWithText
                        number={12292}
                        tooltip={
                          <div>
                            <span className="yellow-text">Answered : </span>
                            <span>
                              Check if the control results are reflected correctly in scoring.
                            </span>
                          </div>
                        }
                        subTitle="Answered"
                      />

                      <NumberWithText
                        number={61}
                        tooltip={
                          <div>
                            <span className="yellow-text"> Not Answered : </span>
                            <span>
                              Contact Control Owners to complete assessments, and check fallbacks on
                              GRC.
                            </span>
                          </div>
                        }
                        subTitle="Not Answered"
                      />

                      <NumberWithText
                        number={9863}
                        tooltip={
                          <div>
                            <span className="yellow-text">Not Applicable : </span>
                            <span>Controls not applicable for this quarter.</span>
                          </div>
                        }
                        subTitle="Answered"
                      />

                      <NumberWithText
                        number={11}
                        tooltip={
                          <div>
                            <span className="yellow-text"> Not Triggered : </span>
                            <span>Check GRC Master Data or contact the Global IC/ GRC team.</span>
                          </div>
                        }
                        subTitle="Not Triggered"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DashboardTable />
        <HomeTableModal />
      </PageWrapper>
    </div>
  );
};

export default HomePage;

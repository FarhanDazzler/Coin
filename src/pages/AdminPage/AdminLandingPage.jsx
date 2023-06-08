import React from 'react';
import './AdminLandingPageStyle.scss';
import { useLocation, useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import { Form } from 'react-bootstrap';
import { Divider, Box } from '@mantine/core';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ChevronRight } from 'tabler-icons-react';

const AdminBox = ({ title, description, url }) => {
  const location = useLocation();
  const history = useHistory();

  const handleClick = (url) => {
    history.push(url);
  };

  return (
    <div
      className="MDMInnerBoxWrapper"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      <div>
        <h4 className="questionBankBoxTitle text-yellow">{title}</h4>
        <p>{description} </p>
      </div>
      <Button
        variant="outlined"
        size="large"
        startIcon={<ChevronRight size={30} strokeWidth={1.5} color={'#ffc800'} />}
        className="mr-4"
        onClick={() => handleClick(url)}
      />
    </div>
  );
};

const AdminLandingPage = () => {
  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="col-lg-12 py-4 AdminPageBoxWrapper">
          <div id="admin-panel" className="content">
            <div className="wrapper">
              <div className="AssessmentBank-inputPage-title">
                <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40, paddingRight: '5px' }} />
                Admin Panel
              </div>
              <p className="AdminPageDesc">
                Panel to manage individuals for both new and existing roles with the flexibility to
                add, delete, edit, and seamlessly rearrange them in a convenient manner.
              </p>
              <Divider
                style={{ paddingBottom: '24px' }}
                className="divider"
                size="md"
                my="xs"
                labelPosition="center"
                label={
                  <>
                    <SupervisorAccountIcon size={16} />
                    <Box ml={5}>
                      <Form.Label>Assessment Module:</Form.Label>
                    </Box>
                  </>
                }
              />

              <div style={{ display: 'flex' }}>
                <div className="col-lg-12">
                  <AdminBox
                    title="Assessment Module"
                    description="Add or Modify individuals for both roles ( Zone Internal control & Global Internal Control ) for Assessment Module."
                    url="/admin-panel/sa"
                  />
                </div>
              </div>

              <Divider
                style={{ paddingBottom: '24px' }}
                className="divider"
                size="md"
                my="xs"
                labelPosition="center"
                label={
                  <>
                    <SupervisorAccountIcon size={16} />
                    <Box ml={5}>
                      <Form.Label>Representation Letter Module:</Form.Label>
                    </Box>
                  </>
                }
              />

              <div style={{ display: 'flex' }}>
                <div className="col-lg-12">
                  <AdminBox
                    title="Representation Letter Module"
                    description="Add or Modify individuals for both ( Business Unit and Functional ) Representation Letter Modules."
                    url="/admin-panel/rl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminLandingPage;

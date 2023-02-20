import React from 'react';
import './QuestionBankStyle.scss';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { Button } from '@mantine/core';
import FeatherIcon from 'feather-icons-react';
import QuestionBankLandingPageTable from './QuestionBankStatusTable';

const QuestionBankLandingPage = () => {
  const { accounts } = useMsal();
  const history = useHistory();

  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-6">
              <div className="home-overview">
                <div className="card-title">
                  <span className="yellow-text-questionBank"> Create Survey for New MICS</span>
                </div>
                <div>
                  <span className="text-white">
                    Create a survey with Template 1 for MICS-Specific Questions Template 2 for
                    Standard and MICS-Specific Questions.
                  </span>
                </div>
                <div className="button">
                  <Button
                    component="a"
                    href="#"
                    variant="outline"
                    leftIcon={<FeatherIcon icon="file-plus" size={14} />}
                    color="yellow"
                    radius="lg"
                  >
                    <span className="text-white"> Create Survey </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="home-overview">
                <div className="card-title">
                  <span className="yellow-text-questionBank">Modify Survey for Existing MICS</span>
                </div>
                <div>
                  <span className="text-white">
                    Add, delete, edit, and rearrange questions for existing MICS.
                  </span>
                </div>
                <div className="button">
                  <Button
                    component="a"
                    href="#"
                    variant="outline"
                    leftIcon={<FeatherIcon icon="file-text" size={14} />}
                    color="yellow"
                    radius="lg"
                    style={{ marginRight: '20px' }}
                  >
                    <span className="text-white"> Modify Standard </span>
                  </Button>
                  <Button
                    component="a"
                    href="#"
                    variant="outline"
                    leftIcon={<FeatherIcon icon="folder-plus" size={14} />}
                    color="yellow"
                    radius="lg"
                  >
                    <span className="text-white"> Modify MICS-Specific </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuestionBankLandingPageTable />
      </PageWrapper>
    </div>
  );
};

export default QuestionBankLandingPage;

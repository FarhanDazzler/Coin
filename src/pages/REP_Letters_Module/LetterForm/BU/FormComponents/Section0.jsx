import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Divider, Box } from '@mantine/core';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { getInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { getInstructionsSelector } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';

const Section0 = ({ scopeData, letterType, isReview = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [ShowVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Instructions');
  const isClear = (text) => activeTab === text;
  const getInstructionsState = useSelector(getInstructionsSelector);

  const InstructionSection = () => {
    return (
      <div>
        <div className="renderBlockWrapper_title">Instructions :</div>
        <div className="renderBlockWrapper_content">
          {getInstructionsState?.data[0]?.instructions}
        </div>
        <Divider className="renderBlockWrapper_divider" size="md" my="xs" labelPosition="center" />
        <div className="renderBlockWrapper_file">
          <div>
            Review the instructions files :
            <Button
              variant="outlined"
              color="secondary"
              className="renderBlockWrapper_file_btn"
              //className="ml-4"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => {
                const pdfUrl = getInstructionsState?.data[0]?.opening_file_sass_token;
                window.open(pdfUrl, '_blank');
              }}
            >
              Opening Instructions
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="renderBlockWrapper_file_btn"
              //className="ml-4"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => {
                const pdfUrl = getInstructionsState?.data[0]?.closing_file_sass_token;
                window.open(pdfUrl, '_blank');
                //window.open(getInstructionsState?.data[0]?.closing_file_sass_token);
              }}
            >
              Closing Instructions
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ScopeSection = () => {
    const entityString = scopeData?.Entity;
    const entityObject = JSON.parse(entityString.replace(/'/g, '"'));
    return (
      <div className="scopeSectionGrid">
        <div>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Zone : </span>
            <span>{scopeData?.Zone}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Letter Type : </span>
            <span>{scopeData?.Letter_Type}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">BU : </span>
            <span>{scopeData?.BU}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Assessment Cycle : </span>
            <span>{scopeData?.Assessment_Cycle}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Year : </span>
            <span>{scopeData?.Year}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Cognos Code : Legal Entity Name </span>

            <ul>
              {Object.keys(entityObject).map((key) => (
                <li key={key}>
                  {key} : {entityObject[key]}
                </li>
              ))}
            </ul>
          </p>
        </div>

        <div>
          {' '}
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Disclosure Processor : </span>
            <span>{scopeData?.Disclosure_Processor}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">BU Head : </span>
            <span>{scopeData?.BU_Head}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Finance Director : </span>
            <span>{scopeData?.Finance_Director}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Zone Control : </span>
            <span>{scopeData?.Zone_Control}</span>
          </p>
          <p className="mb-2">
            <span className="renderBlockWrapper_title">Zone VP : </span>
            <span>{scopeData?.Zone_VP}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="Rep-Letter-form-Section0">
      <CollapseFrame
        title="Instructions and Scope"
        active
        isOpen={isReview === true ? false : true}
      >
        <div className="renderBlockWrapper mt-5">
          {getInstructionsState?.data?.length > 0 && (
            // if instructions are not there and scope is there then show scope only
            <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
              {/* <div className="row">
                <div className="col-lg-6">
                  <InstructionSection />
                </div>
                <div className="col-lg-6">
                  <ScopeSection />
                </div>
              </div> */}
              {/* setting active tab when click on button */}
              <Button
                startIcon={<InfoOutlinedIcon />}
                className={activeTab === 'Instructions' ? 'mr-4 active' : 'mr-4'}
                onClick={() => setActiveTab(isClear('Instructions') ? '' : 'Instructions')}
              >
                Instructions
              </Button>
              <Button
                startIcon={<FeedOutlinedIcon />}
                className={activeTab === 'Scope' ? 'mr-4 active' : 'mr-4'}
                onClick={() => setActiveTab(isClear('Scope') ? '' : 'Scope')}
              >
                Scope
              </Button>
              {localStorage.getItem('selected_Role') === 'Disclosure Processor' && (
                <Button
                  startIcon={<FeedOutlinedIcon />}
                  className={
                    location.pathname === '/REP-Letters/re-attempt-letter/BU-letter-form'
                      ? 'mr-4 active'
                      : 'mr-4'
                  }
                  onClick={() => {
                    const data = {
                      scopeData: scopeData,
                      letterType: letterType,
                    };
                    history.push('/REP-Letters/re-attempt-letter/BU-letter-form', { data });
                  }}
                >
                  Edit Response
                </Button>
              )}

              {/* when tab is active then show the content */}
              {(activeTab === 'Scope' || activeTab === 'Instructions') && (
                <>
                  <div className="mt-5">
                    {activeTab === 'Scope' && <ScopeSection />}
                    {activeTab === 'Instructions' && <InstructionSection />}
                  </div>
                </>
              )}
            </div>
          )}

          <div id="lastShow" />
        </div>
      </CollapseFrame>
    </div>
  );
};

export default Section0;

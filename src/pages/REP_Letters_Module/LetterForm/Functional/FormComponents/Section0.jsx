import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Divider, Box } from '@mantine/core';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { getFunctionalInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { getFunctionalInstructionsSelector } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import CustomModal from '../../../../../components/UI/CustomModal';

const Section0 = ({ scopeData }) => {
  const dispatch = useDispatch();
  const [ShowVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Instructions');
  const isClear = (text) => activeTab === text;
  const getInstructionsState = useSelector(getFunctionalInstructionsSelector);

  // useEffect(() => {
  //   dispatch(getFunctionalInstructions());
  // }, []);

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
            See how to answer the letters :
            <Button
              variant="outlined"
              color="secondary"
              className="renderBlockWrapper_file_btn"
              //className="ml-4"
              startIcon={<PlayCircleOutlineIcon />}
              onClick={(e) => {
                setShowVideoModal(true);
              }}
            >
              Watch Video
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ScopeSection = () => {
    return (
      <div>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Zone : </span>
          <span>{scopeData?.Zone}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Function : </span>
          <span>{scopeData?.Function}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">BU : </span>
          <span>{scopeData?.BU}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Recipient : </span>
          <span>{scopeData?.Recipient}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Zone Control : </span>
          <span>{scopeData?.Zone_Control}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Assessment Cycle : </span>
          <span>{scopeData?.Assessment_Cycle}</span>
        </p>
        <p className="mb-2">
          <span className="renderBlockWrapper_title">Year : </span>
          <span>{scopeData?.Year}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="Rep-Letter-form-Section0">
      <CollapseFrame title="Instructions and Scope" active>
        <div className="renderBlockWrapper-rep-letter-form mt-5">
          {getInstructionsState?.data?.length > 0 && (
            // if instructions are not there and scope is there then show scope only
            <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
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
      <CustomModal
        className="add-org"
        open={ShowVideoModal}
        onClose={() => {
          setShowVideoModal(false);
        }}
        width={800}
        title={'Instructional video on how to answer the letters'}
        bodyClassName="p-0"
      >
        <video width="800" height="500" controls className="p-2">
          <source src={getInstructionsState?.data[0]?.sass_token} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CustomModal>
    </div>
  );
};

export default Section0;

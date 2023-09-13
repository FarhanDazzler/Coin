import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Divider, Box } from '@mantine/core';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { getInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { getInstructionsSelector } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import CustomModal from '../../../../../components/UI/CustomModal';

const Section0 = ({ scopeData, letterType }) => {
  const dispatch = useDispatch();
  const [ShowVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Instructions');
  const isClear = (text) => activeTab === text;
  const getInstructionsState = useSelector(getInstructionsSelector);

  //   useEffect(() => {
  //     const payload = {
  //       module: letterType,
  //     };
  //     dispatch(getInstructions(payload));
  //   }, []);

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
          <span className="renderBlockWrapper_title">Entity : </span>
          <ul>
            {/* <li> Country : Entity Code</li> */}
            {Object.keys(entityObject).map((key) => (
              <li key={key}>
                {key} : {entityObject[key]}
              </li>
            ))}
          </ul>
        </p>
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
        <div className="renderBlockWrapper mt-5">
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

import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Box, Group } from '@mantine/core';
import { Radio } from '@mantine/core';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../../components/UI/Button';
import CustomModal from '../../../../../components/UI/CustomModal';
import AddNewQuestionModal from '../AddNewQuestion/AddNewQuestionModal';

const Options = () => {
  const handleOnclickEdit = () => {};
  const handleOnclickDelete = () => {};

  return (
    <>
      <Divider size="md" my="sm" />
      <div className="options mt-5" style={{ justifyContent: 'space-between' }}>
        <div>
          <Button
            size="large"
            startIcon={<EditIcon color="black" />}
            className="add-button"
            onClick={handleOnclickEdit}
            style={{ marginRight: '12px' }}
          >
            Edit
          </Button>
          <Button
            size="large"
            startIcon={<DeleteIcon color="black" />}
            className="add-button"
            onClick={handleOnclickDelete}
          >
            Delete
          </Button>
        </div>

        <div>
          <Group position="right" spacing="sm">
            <Radio disabled label="Yes" value="Yes" size="sm" />
            <Radio disabled label="No" value="No" size="sm" />
            <Radio disabled label="NA (Not Applicable)" value="NA" size="sm" />
          </Group>
        </div>
      </div>
    </>
  );
};

const Questions = () => {
  return (
    <div className="question-text-section">
      <div className="question-number"> 01</div>
      <div className="question-text">question text here</div>
    </div>
  );
};

const BUModifyQuestions = () => {
  // logic for closing pop up
  useEffect(() => {
    setShowBUModifyModal(false);
  }, []);

  const [ShowBUModifyModal, setShowBUModifyModal] = useState(false);

  const handleOnclickAdd = () => {
    // Add code
    setShowBUModifyModal(true);
  };

  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5">
            <div className="rl-question-bank-TitleSectionTab">
              <div className="section-title" style={{ justifyContent: 'space-between' }}>
                <div>
                  <span style={{ paddingLeft: '16px' }}>Modify Questions for BU Letter</span>
                </div>

                <div>
                  <Button
                    //color="silver"
                    size="large"
                    startIcon={<ControlPointRoundedIcon color="black" />}
                    className="add-button"
                    onClick={handleOnclickAdd}
                  >
                    Add New
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <div className="rl-question-bank-view-questions">
              <div className="row pt-2">
                <div className="question-text-section">
                  <Questions />
                </div>
              </div>
              <div className="row pt-2">
                <div className="question-options-section">
                  <Options />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      <CustomModal
        className="add-org"
        open={ShowBUModifyModal}
        onClose={() => setShowBUModifyModal(false)}
        width={900}
        title={'Add New Question'}
        bodyClassName="p-0"
      >
        <AddNewQuestionModal
          setShowModal={setShowBUModifyModal}
          modalType={localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functions'}
        />
      </CustomModal>
    </>
  );
};

export default BUModifyQuestions;

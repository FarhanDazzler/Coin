import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../../components/UI/Button';
import CustomModal from '../../../../../components/UI/CustomModal';
import AddNewQuestionModal from '../AddNewQuestion/AddNewQuestionModal';

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

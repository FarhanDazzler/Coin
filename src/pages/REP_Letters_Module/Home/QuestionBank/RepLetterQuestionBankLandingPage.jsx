import React, {useState, useEffect} from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import './RepLetterQuestionBank.scss';
import Button from '../../../../components/UI/Button';
import { ArrowNarrowRight } from 'tabler-icons-react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

const RLQuestionBank = () => {
    const history = useHistory();
    const handleBuModify = () => {
        history.push('/REP-Letters/questionbank/Rep-Letter-Modify');
    }
    const handleFunctionalModify = () => {
        history.push('/REP-Letters/questionbank/Rep-Letter-Modify');
    }
    const handleFunctionalCreate = () => {

    }
  return (
    <>
      <PageWrapper>
        <div className="container py-5">
          <div className="RlQuestionBankHeader">
            <h3>Create or Modify Letters</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in
              hendrerit urna.
            </p>
          </div>
          <div className="col-lg-12 py-4 RlQuestionBankBoxWrapper">
            <div id="admin-panel" className="content">
              {localStorage.getItem('selected_module_Role') == 'BU' ? (
                <>
                  <div className="wrapper">
                    <div className="RlQuestionBankHeader">
                      <h3>BU</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                        Aliquam in hendrerit urna.
                      </p>
                    </div>

                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleBuModify}
                    >
                      <span className="text-white">Modify Existing</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="wrapper">
                    <div className="RlQuestionBankHeader">
                      <h3>Functional</h3>
                      <p>Select from the sub-categories if letters</p>
                    </div>
                    {/* <Form.Group className="input-group mb-3">
                      <div style={{ width: '100%' }}>
                        <Select
                          maxMenuHeight={200}
                          placeholder="Select Function"
                          //   value={controlIDOption}
                          //   defaultValue={controlIDOption}
                          //   onChange={(e) => handleChangeControlId(e)}
                          className="l-input functional-select"
                          //MenuProps={MenuProps}
                          //inputProps={{ 'aria-label': 'Without label' }}
                          options={[]}
                        />
                      </div>
                    </Form.Group> */}
                    
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleFunctionalModify}
                    >
                      <span className="text-white">Modify Existing</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleFunctionalCreate}
                    >
                      <span className="text-white">Create New</span>
                    </Button>
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default RLQuestionBank;

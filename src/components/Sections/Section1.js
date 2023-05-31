//imports
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import ConfirmAlert from '../../common/ConfirmAlert';
import FeatherIcon from 'feather-icons-react';

// import FormikControl from '../formComponents/FormikControl';
import { Button, Select, TextInput, Radio, RadioGroup } from '@mantine/core';
import { useSetState } from '@mantine/hooks';

//show hide approach

var loading = true;
var control_questions = [];

const Section1 = () => {
  const control_id = 'ATR_MJE_01a-K';
  const [successData, setSuccessData] = useState();
  let ques_count = 0;

  //formik params
  // const initialValues = {};
  const [initialValues, setintialValues] = useState([]);
  const validationSchema = Yup.object().shape({});
  //get quesitons from the database
  useEffect(() => {
    Axios.get(
      'https://acoemicsgrcpwa-devbe.azurewebsites.net/get_questions?ControlID=' + control_id,
    ).then(function (response) {
      var status_code = response.status;
      var status_text = response.statusText;
      var api_data = response?.data.data;

      if (status_code === 200 && status_text === 'OK') {
        control_questions = api_data;
        loading = false;
      } else {
        console.log(response.error.message);
      }
    });
  }, []);

  async function hideAlert() {
    window.location.reload();
  }

  const checkType = (type) => {
    let field_type = '';
    if (type === 'Free Text') {
      field_type = 'input';
    }
    if (type === 'Radio') {
      field_type = 'radio';
    }
    if (type === 'Select') {
      field_type = 'select';
    }

    return field_type;
  };

  const loader = [
    <div
      className="loader"
      style={{
        color: 'gold',
        margin: '10px',
        padding: '15px',
      }}
    ></div>,
  ];

  const formik = useFormik({
    //formik params
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSuccessData(true);
      console.log('Form data', values);
      console.log('Saved data', JSON.parse(JSON.stringify(values)));
      setSubmitting(false);
    },
    // enableReinitialize,
  });

  //get all the parent questions only
  var parentQuestions = control_questions.filter((res) => {
    return JSON.stringify(res.question_child).toLocaleLowerCase().match('1');
  });
  console.log(parentQuestions);

  //get all the child questions only
  var child_questions = control_questions.filter((res) => {
    return JSON.stringify(res.question_child).toLocaleLowerCase().match('0');
  });

  //initialize the question state
  // const [questionState, setQuestionState] = useState([]);
  // console.log(parentQuestions);
  // useEffect(() => {
  //   setQuestionState([ ...parentQuestions ]);
  // }, []);
  // console.log(questionState);
  // useEffect(() => {
  //   console.log('question changed');
  // }, [parentQuestions]);

  const questions = parentQuestions.map((ques, index) => {
    var input_type = false;
    var radio_type = false;
    var select_type = false;
    const options = ques.options;
    const selectData = [];

    //check the field type
    var field_type = checkType(ques.question_type);
    if (field_type === 'input') {
      input_type = true;
    }
    if (field_type === 'radio') {
      radio_type = true;
    }
    if (field_type === 'select') {
      select_type = true;
    }

    //render only if the questions are parent questions
    if (ques.question_child === 1) {
      //append into the initial values
      var temp = ques.q_id;
      formik.initialValues[temp] = '';

      //append in the validation schema
      if (ques.response_required) {
        validationSchema._nodes[ques_count] = temp;
        validationSchema.fields[temp] = Yup.string().required('Required');
      }

      //initialize count for the question label
      ques_count += 1;

      ///logic to get the child question
      const renderChild = (selected_choice) => {
        var available_choices = ques.options;
        var child_ques = available_choices.filter((res) => {
          return JSON.stringify(res.option_value)
            .toLocaleLowerCase()
            .match(selected_choice.toLocaleLowerCase());
        });
        var child_quesId = child_ques[0].child_question;
        if (child_quesId) {
          var child_question = child_questions.filter((res) => {
            return JSON.stringify(res.q_id).match(child_quesId);
          });
        } else {
          child_question = [];
        }
        return child_question[0];
      };

      const handleChildQuestions = (selected_choice) => {
        var result = renderChild(selected_choice);
        if (result) {
          var temp = result.parent_qid;
          parentQuestions = parentQuestions.filter((quesData) => {
            return quesData.parent_qid !== temp;
            //return !JSON.stringify(quesData.parent_qid).includes(temp);
          });
          parentQuestions.splice(index + 1, 0, result);
        } else {
          console.log('No Child Question');
          parentQuestions = parentQuestions.filter((quesData) => {
            var temp = ques.parent_qid;
            return quesData.parent_qid !== temp;
          });
        }
        // // find index of isterminating
        // var terminatingIndex = parentQuestions.findIndex((res) => {
        //   return res.is_Terminating === 1;
        // });
        // console.log(parentQuestions);
        // parentQuestions = parentQuestions.slice(0, terminatingIndex + 1);
        console.log(parentQuestions);
        // setQuestionState([...parentQuestions]);
      };

      //return the fields
      return (
        <React.Fragment>
          {input_type ? (
            <>
              <TextInput
                key={ques.q_id}
                label={`Q` + ques_count + '. ' + ques.question_text}
                onChange={formik.handleChange}
                value={formik.values.temp}
                error={formik.errors.temp}
              />
              {formik.errors.temp ? formik.errors.temp : null}
            </>
          ) : (
            ''
          )}
          {radio_type ? (
            <>
              <RadioGroup
                className="golden-text"
                key={ques.q_id}
                orientation="vertical"
                label={`Q` + ques_count + '. ' + ques.question_text}
                onChange={handleChildQuestions}
                value={formik.values.temp}
                error={formik.errors.temp}
                size="md"
              >
                {options.map(({ option_value, option_id }) => (
                  <Radio key={option_id} value={option_value} label={option_value} color="yellow" />
                ))}
              </RadioGroup>
            </>
          ) : (
            ''
          )}
          {select_type ? (
            <>
              <Select
                key={ques.q_id}
                clearable
                size="md"
                allowDeselect
                label={`Q` + ques_count + '. ' + ques.question_text}
                placeholder="Choose..."
                searchable
                value={formik.values.temp}
                error={formik.errors.temp}
                nothingFound="No options"
                data={options.map(({ option_value }) => {
                  selectData['value'] = option_value;
                  selectData['group'] = option_value.charAt(0);
                })}
              />
              {formik.errors.temp ? formik.errors.temp : null}
            </>
          ) : (
            ''
          )}
          <hr className="m-2" style={{ backgroundColor: 'grey' }} />
        </React.Fragment>
      );
    }
  });

  return (
    <>
      <div className="container-fluid">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title golden-text">
                <strong>
                  <h3>Self Assessment</h3>
                </strong>
                <span className="card-subtitle">
                  <p>Please answer to the below assessment questions.</p>
                </span>
              </div>
            </div>
            <div className="card-body">
              {!loading ? (
                <div>
                  {
                    <form onSubmit={formik.onSubmit}>
                      {questions}
                      <br></br>
                      <Button
                        style={{ width: '100%' }}
                        className="btn-abi-custom"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <FeatherIcon icon="check" size={20} /> {`         `}Submit{' '}
                      </Button>
                    </form>
                  }
                </div>
              ) : (
                loader
              )}
            </div>
          </div>
        </div>
      </div>
      {successData && (
        <ConfirmAlert
          confirm={hideAlert}
          hideAlert={hideAlert}
          cancelButton={false}
          confirmBtnText="Ok"
          type={successData === true ? 'success' : 'warning'}
          title={successData === true ? 'Thanks ' : 'Failed'}
          body={successData === true ? 'Assessment Submitted Successfully' : `${successData}`}
        />
      )}
    </>
  );
};

export default Section1;

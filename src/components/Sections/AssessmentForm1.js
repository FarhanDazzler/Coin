//imports
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import ConfirmAlert from '../../common/ConfirmAlert';
import FeatherIcon from 'feather-icons-react';

import { Card, Col, Row } from 'react-bootstrap';
// import FormikControl from '../formComponents/FormikControl';
import { Button, Select, TextInput, Radio, RadioGroup, Group } from '@mantine/core';

//approach - insertion to array

var loading = true;
var control_questions = [];

const AssessmentForm = () => {
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

  const [showHide, setShowHide] = useState([]);

  const [showhide, setshow] = useState(false);

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

  //get all the child questions only
  var child_questions = control_questions.filter((res) => {
    return JSON.stringify(res.question_child).toLocaleLowerCase().match('0');
  });

  // const handleStateChange = () =>{
  //   setShowHide([...showHide])
  // }

  const questions = control_questions.map((ques, index) => {
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
    //initialize count for the question label
    ques_count += 1;

    ///logic to get the child question
    const getChildtoRender = (selected_choice) => {
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
      var result = getChildtoRender(selected_choice);

      if (result) {
        //first check if any other question from that parent is already present in the state
        var all_children = '';
        var array = [];
        if (ques.child_questions.length > 8) {
          all_children = JSON.parse(ques.child_questions);
          array = [...showHide]; // make a separate copy of the array
          all_children.forEach((element) => {
            var index = array.indexOf(element);
            if (index !== -1) {
              array.splice(index, 1);
              console.log(showHide);
            }
          });

          setShowHide([...array]);
        } else {
          all_children = ques.child_question;
          array = [...showHide]; // make a separate copy of the array
          var index = array.indexOf(all_children);
          console.log(index);
          if (index !== -1) {
            array.splice(index, 1);
            setShowHide([...array]);
          }
        }

        //idea is to add the child id in the show state so that only this child is shown
        setShowHide([...showHide, result.q_id]);
        setshow(true);
        console.log(showHide);
      } else {
        //check if any child is already in the show queue.
        array = [...showHide]; // make a separate copy of the array
        index = array.indexOf(ques.child_questions);
        console.log(index);
        if (index !== -1) {
          array.splice(index, 1);
          setShowHide([...array]);
          setshow(false);
        }
      }
      console.log(showHide);
    };

    const isShow = () => {
      console.log('inisShow');
      var indexChildId = showHide.findIndex(ques.q_id);
      console.log(indexChildId);

      if (indexChildId !== -1) {
        return true;
      } else {
        return false;
      }
    };

    //return the fields
    return (
      <React.Fragment>
        {input_type && showhide ? (
          <>
            <TextInput
              key={ques.q_id}
              label={`Q. ` + ques.question_text}
              onChange={formik.handleChange}
              value={formik.values.temp}
              error={formik.errors.temp}
              required
            />
            <hr className="m-2" style={{ backgroundColor: 'grey' }} />
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
              label={`Q. ` + ques.question_text}
              onChange={handleChildQuestions}
              value={formik.values.temp}
              error={formik.errors.temp}
              size="md"
              withasterisk="true"
            >
              {options.map(({ option_value, option_id }) => (
                <Radio key={option_id} value={option_value} label={option_value} color="yellow" />
              ))}
            </RadioGroup>
            <hr className="m-2" style={{ backgroundColor: 'grey' }} />
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
              label={`Q. ` + ques.question_text}
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

            <hr className="m-2" style={{ backgroundColor: 'grey' }} />
            {formik.errors.temp ? formik.errors.temp : null}
          </>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <Card>
        <div className="col-lg-12">
          <div className="container-fluid">
            <Card.Header>
              <Card.Title>
                <div className="golden-text">
                  <strong>
                    <h3>Self Assessment</h3>
                  </strong>
                  <Card.Subtitle>
                    <p>Please answer to the below assessment questions.</p>
                  </Card.Subtitle>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Group position="apart">
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
              </Group>
            </Card.Body>
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
      </Card>
    </>
  );
};

export default AssessmentForm;

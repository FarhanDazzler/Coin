//import data from './file';

import Button from 'react-bootstrap/Button';
//import { parentQuestions, child_question } from './file';
import Section2 from './Section2';
import KPI from './KPI';
import axios from 'axios';
import Swal from 'sweetalert2';

import AOS from 'aos';
import 'aos/dist/aos.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAssessmentAns, updateAssessmentAns } from '../../redux/Assessments/AssessmentAction';
import {
  getControlSelector,
  getResponseSelector,
  sectionAnsSelector,
} from '../../redux/Assessments/AssessmentSelectors';
import { useHistory } from 'react-router-dom';

import { useMsal } from '@azure/msal-react';

function AssessmentForm() {
  const { accounts } = useMsal();
  // const [org, setOrg] = useState('abcd');
  const dispatch = useDispatch();
  const history = useHistory();
  const sectionAns = useSelector(sectionAnsSelector);
  // const [getResponse, setGetResponse] = useState({ data: { s1: {}, s3: {} } });
  const getResponse = useSelector(getResponseSelector);
  const getLocalAns = localStorage.getItem('userAns');

  const controlDataResponse = useSelector(getControlSelector);
  const [val, setVal] = useState('lala');
  var [final, setfinal] = useState([]);
  const [timer, setTimer] = useState();
  const [id, setid] = useState([]);
  let [flag, setflag] = useState('false');
  const [isDisabled, setIsDisabled] = useState(false);
  const child_map = new Map();
  var [result, setresult] = useState(new Map());
  const [action_plan, setaction_plan] = useState(new Map());
  let [values, setvalues] = useState([]);
  const [scope, setscope] = useState({});
  var parentQuestions = [];
  var child_question = [];

  useEffect(() => {
    //TODO: localstorage save state data
    // const getLocalAnsJson = getLocalAns ? JSON.parse(getLocalAns) : { s1: {}, s3: {} };
    // const s1Data = new Map(Object.entries(getLocalAnsJson.s1));
    // const s3Data = new Map(Object.entries(getLocalAnsJson.s3));
    // setGetResponse({ data: { s1: s1Data, s3: s3Data } });
  }, []);

  useEffect(() => {
    dispatch(saveAssessmentAns({ section1: result }));
  }, [result]);

  useEffect(() => {
    if (getResponse.data?.s1) {
      setresult(getResponse.data?.s1);
      const finalList = values.filter((f) => getResponse.data?.s1.get(f.question_text));
      if (finalList.length > 0) {
        setfinal(finalList);
        setflag(true);
      }
    }
  }, [getResponse.data?.s1, values]);

  const sectionDisplay = (display_text) => {
    return (
      <div>
        <br />
        <p
          style={{
            background: 'linear-gradient(90deg, rgb(227, 175, 50) 0%, rgb(244, 224, 15) 100%)',
            borderRadius: '20px',
          }}
        >
          <strong
            style={{
              paddingLeft: '15px',
              fontSize: '28px',
              color: 'black',
            }}
          >
            {display_text}
          </strong>
        </p>
      </div>
    );
  };

  useEffect(() => {
    // console.log(child_question)

    setid(['Q-S001']);

    // console.log(map1)
    axios
      .get('https://acoemicsgrcpwa-devbe.azurewebsites.net/get_questions?ControlID=ATR_MJE_01a-K')
      .then(async (res) => {
        // console.log(res.data.data);
        setvalues(res.data.data);
        // console.log(values);
        setfinal([res.data.data[0]]);
        setTimeout(() => {
          setTimer('123');
        }, 200);
        // const freq =await  localStorage.getItem('frequency');
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://acoemicsgrcpwa-devbe.azurewebsites.net/get_control_scope?ControlID=ATR_MJE_01a-K&coOwner=${accounts[0].username}`,
      )
      .then((res) => {
        // console.log(res.data.data.priod_of_assessment);
        setscope(res.data.data);
        // console.log(scope.frequency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  values = values.slice(0, 10);
  //console.log(data1[0].length);

  for (var i = 0; i < values.length; i++) {
    // console.log(values[i].question_child);
    if (values[i].parent_qid == '') {
      parentQuestions.push(values[i]);
    }
  }

  for (var i = 0; i < values.length; i++) {
    // console.log(values[i].question_child);
    if (values[i].question_child == 0) {
      child_question.push(values[i]);
    }
  }

  const org = localStorage.getItem('provider_org');
  // console.log('sdfsdfs', org);
  const freq = localStorage.getItem('frequency');
  for (let i = 0; i < parentQuestions.length; i++) {
    let question = parentQuestions[i].question_text;
    question = question.replaceAll('{{org}}', controlDataResponse?.provider_org);
    question = question.replaceAll('{{freq}}', controlDataResponse?.frequency);
    parentQuestions[i].question_text = question;
    // console.log(question);
  }
  for (let i = 0; i < child_question.length; i++) {
    let question = child_question[i].question_text;
    question = question.replaceAll('{{org}}', controlDataResponse?.provider_org);
    question = question.replaceAll('{{freq}}', controlDataResponse?.frequency);
    child_question[i].question_text = question;
    // console.log(question);
  }

  useEffect(() => {
    for (let i = 0; i < parentQuestions.length; i++) {
      let question = parentQuestions[i].question_text;
      question = question.replaceAll('{{org}}', org || controlDataResponse?.provider_org);
      question = question.replaceAll('{{freq}}', freq);
      parentQuestions[i].question_text = question;
      // console.log(question);
    }
    for (let i = 0; i < child_question.length; i++) {
      let question = child_question[i].question_text;
      question = question.replaceAll('{{org}}', org || controlDataResponse?.provider_org);
      question = question.replaceAll('{{freq}}', freq);
      child_question[i].question_text = question;
      // console.log(question);
    }
  }, [org, freq, controlDataResponse]);
  // console.log(child_question);
  // console.log(parentQuestions);

  const submit_section1 = async (event) => {
    event.preventDefault();
    const section1 = {};
    for (let i = 0; i < final.length; i++) {
      // console.log(`${final[i].question_text}---->${result.get(final[i].question_text)}`);
      // localStorage.setItem('open', 'Yes');
      //  setflag(true);
      section1[final[i].question_text] = result.get(final[i].question_text);
    }
    // console.log('lkjhgdfd');
    // console.log(section1);

    Swal.fire({
      title: 'Are you sure?',
      text: 'your assessment is failed !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gold',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, submit it!',
    }).then((res) => {
      if (res.isConfirmed) {
        const payload = {
          Assessment_ID: '',
          Response_ID: '',
          Control_ID: 'ATR_MJE_01a-K',
          COwner: 'jaymin@ab-inbev.com',
          Response_Data: JSON.stringify({
            s1: Object.fromEntries(result),
          }),
          Time_Stamp: '01/30/2023',
        };

        localStorage.setItem(
          'userAns',
          JSON.stringify({
            s1: Object.fromEntries(result),
          }),
        );

        // dispatch(updateAssessmentAns(payload));
        Swal.fire('Submited!', 'Your response has been submited', 'success');
        history.push('/');
      }
    });
  };

  const add = async (parent_ques, option_value, event, i) => {
    // console.log(parent_ques.q_id);
    // console.log(parent_ques.parent_qid);
    // console.log();
    child_question[child_question.length - 1].is_Terminating = 1;

    let result1 = parent_ques.question_text;
    // console.log(result1);

    if (parent_ques.question_type == 'Free Text') {
      // console.log(parent_ques.question_text);
      // console.log(event.target.value);
      if (result.get(parent_ques.question_text)) {
        // console.log("yes")
        result.set(parent_ques.question_text, event.target.value);
      } else {
        // console.log("No")
        result.set(parent_ques.question_text, event.target.value);
      }
    }

    if (parent_ques.question_type == 'Radio') {
      // console.log(parent_ques.question_text);
      // console.log(option_value.option_value);

      if (result.get(parent_ques.question_text)) {
        // console.log("yes")
        result.set(parent_ques.question_text, option_value.option_value);
      } else {
        // console.log("No")
        result.set(parent_ques.question_text, option_value.option_value);
      }
    }

    // console.log('kushal', result);

    if (parent_ques.is_Terminating == 1) {
      //console.log("lkj")

      let b = -1;
      for (let a = 0; a < final.length; a++) {
        if (final[a].q_id == parent_ques.q_id) {
          b = a;
          break;
        }
      }
      final = final.slice(0, b + 1);
      setfinal([...final]);
      if (parent_ques.parent_qid == child_question[child_question.length - 1].parent_qid) {
        setflag(true);
        return;
      }

      setVal('terminate');
      setflag(false);
    } else {
      // sessionStorage.getItem('terminate') == true ? setVal('terminate') : setVal('');
      setVal('');

      if (parent_ques.child_questions == '') {
        const parent_index = new Map();
        for (var i = 0; i < parentQuestions.length; i++) {
          parent_index.set(parentQuestions[i].q_id, i);
        }

        let index;

        for (let find = 0; find < final.length; find++) {
          if (final[find].q_id == parent_ques.q_id) {
            index = find;
            break;
          }
        }

        let this_is_parent = final[index - 1].q_id;

        let loop = 0;
        for (let l = 0; l < final.length; l++) {
          if (final[l].q_id === parent_ques.q_id) {
            loop = l;

            break;
          }
        }

        let next = 0;
        for (let m = 0; m < final.length; m++) {
          if (final[m].q_id == parentQuestions[parent_index.get(this_is_parent) + 1].q_id) {
            next = m;
            break;
          }
        }

        if (next != 0) {
          for (let forward = next; forward < final.length; forward++) {
            loop = loop + 1;
            // console.log(`${loop}<---${forward}`);
            final[loop] = final[forward];
            // console.log(final);
          }

          // console.log(final);
          setfinal([...final]);
        } else {
          final = final.slice(0, loop + 1);
          // console.log(final);

          result.set(parentQuestions[parent_index.get(this_is_parent) + 1].question_text, '');

          setfinal([...final, parentQuestions[parent_index.get(this_is_parent) + 1]]);
        }
      } else {
        if (option_value.child_question == '') {
          if (option_value.is_action_plan == 1) {
            // console.log('open action plan at end');
            // setaction_plan(1)
            action_plan.set(parent_ques.question_text, 1);
          } else {
            action_plan.set(parent_ques.question_text, 0);
          }
          setaction_plan((prev) => new Map([...prev]));

          const parent_index = new Map();
          for (var i = 0; i < parentQuestions.length; i++) {
            parent_index.set(parentQuestions[i].q_id, i);
          }

          let loop = 0;
          for (let loop3 = 0; loop3 < final.length; loop3++) {
            if (final[loop3].q_id === parent_ques.q_id) {
              loop = loop3;
              break;
            }
          }

          if (parent_ques.q_id === parentQuestions[parentQuestions.length - 1].q_id) {
            final = final.slice(0, loop + 1);
            console.log(final);
            setfinal([...final]);
            //  sessionStorage.setItem('terminate', true);
            //  setVal('terminate');
            setflag(true);
            return;
          }

          let loop2 = 0;
          for (let loop1 = 0; loop1 < final.length; loop1++) {
            if (
              final[loop1].q_id === parentQuestions[parent_index.get(parent_ques.q_id) + 1].q_id
            ) {
              loop2 = loop1;
              break;
            }
          }
          // console.log(loop2);
          // console.log(loop);

          if (loop2 != 0) {
            // console.log(loop2);
            // console.log(loop + 1);

            if (loop2 === loop + 1) {
              return;
            }

            for (let forward = loop2; forward < final.length; forward++) {
              loop = loop + 1;
              // console.log(`${loop}<---${forward}`);
              final[loop] = final[forward];
              // console.log(final);
            }
            final.pop();
            // console.log(final);
            setfinal([...final]);
          } else {
            final = final.slice(0, loop + 1);
            // console.log(final);

            result.set(parentQuestions[parent_index.get(parent_ques.q_id) + 1].question_text, '');

            setfinal([...final, parentQuestions[parent_index.get(parent_ques.q_id) + 1]]);
          }
        } else {
          const parent_index = new Map();
          for (var i = 0; i < parentQuestions.length; i++) {
            parent_index.set(parentQuestions[i].q_id, i);
          }

          for (var i = 0; i < child_question.length; i++) {
            //  console.log(child_question[i].q_id , child_question[i])

            child_map.set(child_question[i].q_id, child_question[i]);
          }

          const child_ques = child_map.get(option_value.child_question);

          // console.log(child_map.get(option_value.child_question));

          if (parentQuestions.length - 1 == parent_index.get(parent_ques.q_id)) {
            result.set(child_ques.question_text, '');
            setfinal([...final, child_ques]);

            return;
          }

          let loop = 0;
          for (let loop3 = 0; loop3 < final.length; loop3++) {
            // console.log("kjhk", parent_ques.q_id)
            if (final[loop3].q_id == parent_ques.q_id) {
              loop = loop3;
              // console.log("kjhk")
              break;
            }
          }

          let loop2 = -1;
          for (let loop1 = 0; loop1 < final.length; loop1++) {
            if (
              final[loop1].q_id === parentQuestions[parent_index.get(parent_ques.q_id) + 1].q_id
            ) {
              loop2 = loop1;
              break;
            }
          }

          if (child_ques.question_type == 'Free Text') {
            // console.log(child_ques)

            if (loop2 == -1) {
              // console.log(loop);
              loop = loop + 1;

              // console.log(final.slice(0, loop));
              final = final.slice(0, loop);
              // console.log(final)
              result.set(child_ques.question_text, '');
              setfinal([...final, child_ques]);
              // console.log(final)
            } else {
              // loop = loop + 1;

              if (loop + 2 == loop2) {
                // console.log('311 line');
                // console.log(final);
                result.set(child_ques.question_text, '');
                final[loop + 1] = child_ques;
                setfinal([...final]);
                return;
              }
              // console.log(loop2)
              // console.log(loop)

              // console.log(final)

              for (let forward = final.length - 1; forward >= loop2; forward--) {
                final[forward + 1] = final[forward];
                // console.log(final)
              }
              result.set(child_ques.question_text, '');

              final[loop + 1] = child_ques;

              // console.log(final)
              setfinal([...final]);
            }
          }
        }
      }
    }
  };

  const ans = final.map((number, i) =>
    number.question_type === 'Radio' ? (
      <div className="card border-0 child w-100 ">
        <div className="card-body text ">
          <strong
            className="card-text "
            style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
          >
            {' '}
            {number.question_text}
          </strong>
          <br />

          {number.options.map((opt, i) => (
            <>
              <input
                type="radio"
                id={opt.option_id}
                checked={result.get(number.question_text) === opt.option_value ? true : false}
                value={opt.option_value}
                onChange={(event) => {
                  add(number, opt, event, i);
                }}
              />
              <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.option_id}>
                {opt.option_value}
              </label>
              <br />
            </>
          ))}
        </div>
      </div>
    ) : (
      <div className="card border-0 child">
        <div className="card-body text">
          <strong
            className="card-text "
            style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
          >
            {' '}
            {number.question_text}
          </strong>
          <br />
          {number.question_text != 'To whom did you hand over ?' ? (
            <textarea
              type={'textarea'}
              class="form-control"
              placeholder="Enter value first"
              row="3"
              id={number.question_text}
              value={result.get(number.question_text) ? result.get(number.question_text) : ''}
              required
              onChange={(event) => {
                {
                  // console.log(number);
                  add(number, number, event, i);
                }
              }}
            />
          ) : (
            <input
              type="email"
              class="form-control"
              placeholder="Enter value first"
              id={number.question_text}
              value={result.get(number.question_text) ? result.get(number.question_text) : ''}
              required
              onChange={(event) => {
                {
                  // console.log(number);
                  add(number, number, event, i);
                }
              }}
            />
          )}

          {/* <textarea
            type={number.question_text === 'To whom did you hand over ?' ? 'email' : 'text'}
           // style={{ height: '100px' }}
            class="form-control"
            placeholder="Enter value "
            id={number.question_text}
            row="3"
            value={result.get(number.question_text) ? result.get(number.question_text) : ''}
            required
            onChange={(event) => {
              {
                console.log(number);
                add(number, number, event, i);
              }
            }}
          /> */}
        </div>
      </div>
    ),
  );

  console.log('@@@@@@@@@', final, result, action_plan, getResponse);
  return (
    <>
      {sectionDisplay('Section 1: GENERAL')}

      <div class="w-100 d-flex flex-column  justify-content-center  align-self-center">
        <div class="w-100  align-self-center">
          {ans}
          {val != 'terminate' ? (
            <div />
          ) : (
            <Button
              className="mt-3"
              variant="warning"
              onClick={submit_section1}
              style={{ fontSize: '20px', height: ' 50px', width: '100%' }}
              type="button"
            >
              SUBMIT
            </Button>
          )}
        </div>
      </div>
      {flag === true ? (
        sectionDisplay('Section 2: KPI')
      ) : (
        // <div>
        //   <p
        //     style={{
        //       background: 'linear-gradient(90deg, rgb(227, 175, 50) 0%, rgb(244, 224, 15) 100%)',
        //       borderRadius: '20px',
        //     }}
        //   >
        //     <strong
        //       style={{
        //         paddingLeft: '15px',
        //         fontSize: '22px',
        //         color: 'black'
        //       }}
        //     >
        //       SECTION 2 : KPI
        //     </strong>
        //   </p>
        // </div>
        <div />
      )}
      {flag === true ? (
        <Section2
          final={final}
          result={result}
          is_action_plan={action_plan}
          getResponse={getResponse}
        />
      ) : (
        <div />
      )}
    </>
  );
}

export default AssessmentForm;

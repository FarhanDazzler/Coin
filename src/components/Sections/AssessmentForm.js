//import data from './file';

import Button from 'react-bootstrap/Button';
//import { parentQuestions, child_question } from './file';
import Section2 from './Section2';
import KPI from './KPI';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function AssessmentForm() {
  const [val, setVal] = useState('lala');
  var [final, setfinal] = useState([]);
  const [id, setid] = useState([]);
  let [flag, setflag] = useState('false');
  const [isDisabled, setIsDisabled] = useState(false);
  const child_map = new Map();
  var [result, setresult] = useState(new Map());
  let [values, setvalues] = useState([]);
  var parentQuestions = [];
  var child_question = [];

  useEffect(() => {
    // console.log(child_question)

    setid(['Q-S001']);

    // console.log(map1)
    axios
      .get('http://localhost:1234/get_questions?ControlID=ATR_MJE_01a-K')
      .then((res) => {
        console.log(res.data.data);
        setvalues(res.data.data);
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });

    setfinal([
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S002", "Q-S003"]',
        is_Terminating: 0,
        options: [
          {
            child_question: '',
            option_id: '12f2c6ef-6d69-4954-902b-5b50208f',
            option_value: 'Yes - I am the owner and part of the org',
            q_id: 'Q-S001',
          },
          {
            child_question: 'Q-S002',
            option_id: '71fcfb60-0f92-4fad-bcad-c32e844f',
            option_value: 'No - I am no longer the Owner',
            q_id: 'Q-S001',
          },
          {
            child_question: 'Q-S003',
            option_id: 'ab23606b-32ca-4b9b-b1e9-c7130773',
            option_value: 'I am still the owner, but not part of\u00a0the Org',
            q_id: 'Q-S001',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S001',
        q_id_Type: 1,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text: 'Are you still the control owner and are you part of Org -',
        question_type: 'Radio',
        response_required: 'True',
      },
    ]);
  }, []);

  values = values.slice(0, 10);
  //console.log(data1[0].length);

  for (var i = 0; i < values.length; i++) {
    console.log(values[i].question_child);
    if (values[i].parent_qid == '') {
      parentQuestions.push(values[i]);
    }
  }

  for (var i = 0; i < values.length; i++) {
    console.log(values[i].question_child);
    if (values[i].question_child == 0) {
      child_question.push(values[i]);
    }
  }
  console.log(child_question);
  console.log(parentQuestions);

  const submit_section1 = async () => {
    const section1 = {};
    for (let i = 0; i < final.length; i++) {
      console.log(`${final[i].question_text}---->${result.get(final[i].question_text)}`);
      // localStorage.setItem('open', 'Yes');
      //  setflag(true);
      section1[final[i].question_text] = result.get(final[i].question_text);
    }
    console.log('lkjhgdfd');
    console.log(section1);
  };

  const add = async (parent_ques, option_value, event, i) => {
    console.log(parent_ques.q_id);
    console.log(parent_ques.parent_qid);
    console.log();
    child_question[child_question.length - 1].is_Terminating = 1;

    let result1 = parent_ques.question_text;
    // console.log(result1);

    if (parent_ques.question_type == 'Free Text') {
      console.log(parent_ques.question_text);
      console.log(event.target.value);
      if (result.get(parent_ques.question_text)) {
        // console.log("yes")
        result.set(parent_ques.question_text, event.target.value);
      } else {
        // console.log("No")
        result.set(parent_ques.question_text, event.target.value);
      }
    }

    if (parent_ques.question_type == 'Radio') {
      console.log(parent_ques.question_text);
      console.log(option_value.option_value);

      if (result.get(parent_ques.question_text)) {
        // console.log("yes")
        result.set(parent_ques.question_text, option_value.option_value);
      } else {
        // console.log("No")
        result.set(parent_ques.question_text, option_value.option_value);
      }
    }

    console.log('kushal', result);

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

        console.log('kjhl');

        let index;

        for (let find = 0; find < final.length; find++) {
          if (final[find].q_id == parent_ques.q_id) {
            index = find;
            break;
          }
        }

        console.log(index - 1);
        let this_is_parent = final[index - 1].q_id;
        // let myArray = text.split(`\"`)
        //myArray = myArray.split(`"`);

        // let arr = [];
        // for (let i = 1; i < myArray.length; i += 2) {
        //     arr.push(myArray[i]);
        // }

        //     console.log(arr)
        //     let this_is_parent;
        //     if(arr.length==0){

        //         this_is_parent=parent_ques.parent_qid;
        //     }else{

        //     for(let next_parent=0;  next_parent<arr.length;  next_parent++){

        //                     for(let f=0 ; f<final.length; f++){

        //                         if(final[f].q_id==arr[next_parent]){
        //                             this_is_parent=arr[next_parent];

        //                         }
        //                     }
        //     }
        //     console.log(this_is_parent)
        // }

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
            console.log(`${loop}<---${forward}`);
            final[loop] = final[forward];
            console.log(final);
          }

          console.log(final);
          setfinal([...final]);
        } else {
          final = final.slice(0, loop + 1);
          console.log(final);

          result.set(parentQuestions[parent_index.get(this_is_parent) + 1].question_text, '');

          setfinal([...final, parentQuestions[parent_index.get(this_is_parent) + 1]]);
        }
      } else {
        if (option_value.child_question == '') {
          console.log('hii');
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
          console.log(loop2);
          console.log(loop);

          if (loop2 != 0) {
            console.log(loop2);
            console.log(loop + 1);

            if (loop2 === loop + 1) {
              return;
            }

            for (let forward = loop2; forward < final.length; forward++) {
              loop = loop + 1;
              console.log(`${loop}<---${forward}`);
              final[loop] = final[forward];
              console.log(final);
            }
            final.pop();
            console.log(final);
            setfinal([...final]);
          } else {
            final = final.slice(0, loop + 1);
            console.log(final);

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

          console.log(child_map.get(option_value.child_question));

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
              console.log(loop);
              loop = loop + 1;

              console.log(final.slice(0, loop));
              final = final.slice(0, loop);
              // console.log(final)
              result.set(child_ques.question_text, '');
              setfinal([...final, child_ques]);
              // console.log(final)
            } else {
              // loop = loop + 1;

              if (loop + 2 == loop2) {
                console.log('311 line');
                console.log(final);
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
        <div className="card-body text">
          <strong
            className="card-text "
            style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
          >
            {' '}
            {number.question_text}
          </strong>
          <br></br>

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
              ></input>
              <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.ption_id}>
                {opt.option_value}
              </label>
              <br></br>
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
          <br></br>

          <textarea
            type="text"
            style={{ height: '100px' }}
            class="form-control"
            placeholder="Enter value first"
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
          ></textarea>
        </div>
      </div>
    ),
  );

  return (
    <>
      <div>
        <p style={{ backgroundColor: '#FFBF00', marginTop: '15px' }}>
          <strong
            id="section"
            style={{
              paddingLeft: '15px',

              fontSize: '22px',

              borderRadius: '50px',
            }}
          >
            SECTION 1 : General
          </strong>
        </p>
      </div>

      <div class="w-100 d-flex flex-column  justify-content-center  align-self-center">
        <div class="w-100  align-self-center">
          {ans}
          {val != 'terminate' ? (
            <div></div>
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
        <div>
          <p style={{ backgroundColor: '#FFBF00' }}>
            <strong
              style={{
                paddingLeft: '15px',
                fontSize: '22px',

                borderRadius: '20px',
              }}
            >
              SECTION 2 : KPI
            </strong>
          </p>
        </div>
      ) : (
        <div></div>
      )}
      {flag === true ? <Section2 final={final} result={result} /> : <div></div>}
    </>
  );
}

export default AssessmentForm;

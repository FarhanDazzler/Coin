import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Second(props) {
  let [final, setfinal] = useState([]);
  let [Level, setLevel] = useState([]);
  let [hash, sethash] = useState(new Map());
  let [ans, setans] = useState(new Map());
  let [parent, setparent] = useState(new Map());
  let [children, setchildren] = useState(new Map());
  const [val, setval] = useState('');
  let [childterminate, setchildterminate] = useState(false);

  let parent_arr = [
    {
      ques_text:
        ' Below are the key requirements linked to L1 MICS Description and would require your response to assess compliance with L1',
      level: [
        {
          L: 'Approval evidence along with supporting documents on MJE are archived in a ticketing tool or in SAP?',
        },
        { L: 'Approver and requestor authorized to park/post MJE in SAP' },
        {
          L: 'For MJE Posted without park & Post, detective review is executed before or on WD10. Further, whether on quarterly basis, access to direct post (without park) is reviewed and confirmed?',
        },
      ],
      parent: 1,
      terminate: 0,
      parent_id: '',
      id: 'soo1',
      Yes: 'soo2',
      No: 'soo3',
    },

    {
      ques_text:
        ' Below are the key requirements linked to L2 MICS Description and would require your response to assess compliance with L2',
      level: [
        {
          L: 'Whether manual journal entries are managed in a workflow tool to ensure:a) mandatory attachments are included &b) auto posting of manual journal entries following the necessary approvals provided in the system',
        },
        {
          L: 'All changes in the workflow configuration are approved by Zone Internal Control before the changes are made.',
        },
        {
          L: 'For MJEs not categorized speciafically, (e.g. reclassification, corrections) a common and standardized zone template is in place to justify the underlying data of the amounts defined in the journal entry.',
        },
      ],
      parent: 1,
      terminate: 0,
      parent_id: '',
      id: 'soo4',
      Yes: 'soo5',
      No: 'soo6',
    },

    {
      ques_text: `Is L3 MICS Description achieved on this control? In addition to the L2 requirements:
        1. Any MJE performed is managed through a workflow tool which guarantees four eye review on every transaction
         (employees can park & post journal entries, but can never do this on the same journal entry).
         2. All documentation supporting MJEs is stored together with the journal entry in the system of record (ERP or sub conso system) and no other system.

        Standardization to be achieved to reach L3: Booking of manual journal entries is only performed by the NoCC.`,
      options: [{ L1: 'Yes, passed at Level3' }, { L2: 'No, failed at Level3' }],
      id: 'soo7',
      parent_id: '',
    },
  ];

  let child_next = {
    ques_text: `Based on KPI data in section 2. the control failed at Level choose either of below`,
    option: {
      L1: 'Agree with KPI value',
      L2: 'KPI calculation is incorrect',
    },
    parent: 0,
    terminate: 0,
    parent_id: 'soo1',
    id: 'soo2',
    section: 0,
  };

  let child = [
    {
      ques_text:
        ' Based on above response, the control is assessed as passed at L1. Would you like to report any other deficiency not covered in the points mentioned above? (Please select "No" in case of none of the deficiencies identified)',
      option: 'No',
      parent: 0,
      terminate: 0,
      parent_id: 'soo1',
      id: 'soo2',
    },

    {
      ques_text:
        ' Based on above response, the control is assessed as passed at L2. Would you like to report any other deficiency not covered in the points mentioned above? ',
      option: 'No',
      parent: 0,
      terminate: 0,
      parent_id: 'soo4',
      id: 'soo5',
    },
  ];

  let terminate = [
    {
      ques_text:
        'Based on above response, the control is assessed as failed at L1. Could you please select either of the below options on action Plan   Action plan is a time bound proposition designed to remediate the control breakdown with the objective of ensuring MICS compliance',
      option: {
        op1: 'Action Plan to remediate the controls is already created by aligning with the Zone IC team',
        op2: 'Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team',
      },
      parent: 0,
      terminate: 1,
      parent_id: 'soo1',
      id: 'soo3',
    },

    {
      ques_text:
        'Based on above response, the control is assessed as failed at L2. Could you please select either of the below options on the action Plan.',
      option: {
        op1: 'Action Plan to remediate the controls is already created by aligning with the Zone IC team',
        op2: 'Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team',
      },
      parent: 0,
      terminate: 1,
      parent_id: 'soo1',
      id: 'soo3',
    },
  ];

  useEffect(() => {
    setfinal([
      {
        ques_text:
          ' Below are the key requirements linked to L1 MICS Description and would require your response to assess compliance with L1',
        level: [
          {
            L: 'Approval evidence along with supporting documents on MJE are archived in a ticketing tool or in SAP?',
          },
          { L: 'Approver and requestor authorized to park/post MJE in SAP' },
          {
            L: 'For MJE Posted without park & Post, detective review is executed before or on WD10. Further, whether on quarterly basis, access to direct post (without park) is reviewed and confirmed?',
          },
        ],
        parent: 1,

        terminate: 0,
        parent_id: '',
        id: 'soo1',
        Yes: 'soo2',
        No: 'soo3',
      },
    ]);

    for (let i = 0; i < parent_arr.length; i++) {
      parent.set(parent_arr[i].id, i);
    }

    for (let i = 0; i < child.length; i++) {
      children.set(child[i].id, child[i]);
    }

    console.log(children);

    console.log(parent);
    // setfinal([...final,])
  }, []);
  console.log(final);

  const radio = async (head, level, choose, i) => {
    setchildterminate(false);
    // console.log(head.ques_text)
    // console.log(level)
    // console.log(choose)

    hash.set(`${head.ques_text}+${level}`, choose);
    console.log(hash);

    let countt = 0;
    for (let j = 0; j < head.level.length; j++) {
      if (hash.has(`${head.ques_text}+${head.level[j].L}`)) {
        countt++;
      }
    }
    console.log(countt);
    console.log(head.level.length);

    if (countt == head.level.length) {
      let flag = 0;
      for (let i = 0; i < head.level.length; i++) {
        //let temp = hash.get(`${head.ques_text}+${head.level[i].L}`)
        if (hash.get(`${head.ques_text}+${head.level[i].L}`) == 'No') {
          flag = 1;
          // return;
        }
      }
      if (flag == 0) {
        let arr = [];
        let j;
        for (let i = 0; i < final.length; i++) {
          if (head.ques_text == final[i].ques_text) {
            arr.push(final[i]);
            j = i;

            //  arr.push(child[0])
            console.log(head);

            console.log(parent.get(head.id) + 1);
            let L = props.L;
            //   L=[false,false,false]
            if (L[parent.get(head.id)] == true) {
              arr.push(child_next);
            } else {
              arr.push(children.get(head.Yes));
            }
            break;
          } else {
            arr.push(final[i]);
          }
        }

        j = j + 2;
        for (j; j < final.length; j++) {
          arr.push(final[j]);
        }
        final = arr;
        setfinal([...final]);
        return;
      } else {
        //  alert("trminate")

        let arr = [];
        for (let i = 0; i < final.length; i++) {
          if (head.ques_text == final[i].ques_text) {
            // final.push(final[i]);
            arr.push(final[i]);
            // arr.push(terminate[0])
            arr.push(terminate[parent.get(final[i].id)]);
            break;
          } else {
            arr.push(final[i]);
          }
        }
        // console.log(arr)
        final = arr;
        setfinal([...final]);
        // setval("terminate")
        return;
      }
    } else {
      return;
    }
  };

  const child_part = (head, e) => {
    setchildterminate(false);
    console.log(e.target.value);
    ans.set(head.ques_text, e.target.value);
    console.log(parent.get(head.parent_id) + 1);

    let flag = 0;
    for (let i = 0; i < final.length; i++) {
      if (final[i].id === parent_arr[parent.get(head.parent_id) + 1].id) {
        flag = i;
      }
    }

    if (flag != 0) {
      return;
    }

    final.push(parent_arr[parent.get(head.parent_id) + 1]);
    setfinal([...final]);
    return;
  };

  const child_terminate = (head) => {
    let arr = [];
    for (let i = 0; i < final.length; i++) {
      if (head.ques_text == final[i].ques_text) {
        // final.push(final[i]);
        arr.push(final[i]);
        // arr.push(terminate[0])
        // arr.push(terminate[parent.get(final[i].id)])
        break;
      } else {
        arr.push(final[i]);
      }
    }
    // console.log(arr)
    final = arr;
    setfinal([...final]);
    // setval("terminate")
    setchildterminate(true);
    return;
  };

  const click = () => {
    setchildterminate(false);
    for (let i = 0; i < final.length; i++) {
      if (final[i].parent_id == '') {
        console.log(final[i].ques_text);
        for (let j = 0; j < final[i].level.length; j++) {
          console.log(`${final[i].level[j].L}`);
          console.log(hash.get(`${final[i].ques_text}+${final[i].level[j].L}`));
        }
      }
    }
  };

  return (
    <>
      {final.map((item) =>
        item.id == 'soo7' ? (
          <div className="card border-0 child">
            <div className="card-body text">
              <strong className="card-text ">
                Is L3 MICS Description achieved on this control? In addition to the L2 requirements:
              </strong>
              <br></br>
              <strong className="card-text">
                {' '}
                1. Any MJE performed is managed through a workflow tool which guarantees four eye
                review on every transaction (employees can park & post journal entries, but can
                never do this on the same journal entry).
              </strong>
              <br></br>
              <strong className="card-text">
                2. All documentation supporting MJEs is stored together with the journal entry in
                the system of record (ERP or sub conso system) and no other system.
              </strong>
              <br></br>
              <br></br>
              <strong className="card-text">
                {' '}
                Standardization to be achieved to reach L3: Booking of manual journal entries is
                only performed by the NoCC.`,
              </strong>
              <br></br>

              <div>
                <input type="radio" id={item.options.L1} name={item.ques_text}></input>
                <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.options.L1}>
                  {item.options[0].L1}
                </label>
              </div>
              <div>
                <input type="radio" id={item.options.L2} name={item.ques_text}></input>
                <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.options.L2}>
                  {item.options[1].L2}
                </label>
              </div>
            </div>
            <Button
              className="mt-3"
              variant="warning"
              onClick={click}
              style={{ fontSize: '20px', height: ' 50px', width: '100%' }}
              type="button"
            >
              SUBMIT
            </Button>{' '}
          </div>
        ) : item.terminate == 1 ? (
          <div>
            <div className="card border-0 child">
              <div className="card-body text">
                <strong
                  className="card-text "
                  style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                >
                  {' '}
                  {item.ques_text}
                </strong>
                <br></br>
                <br></br>

                <div>
                  <input type="radio" id={item.option.op1} name={item.ques_text}></input>
                  <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.option.op1}>
                    {item.option.op1}
                  </label>
                </div>
                <div>
                  <input type="radio" id={item.option.op2} name={item.ques_text}></input>
                  <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.option.op2}>
                    {item.option.op2}
                  </label>
                </div>
                <div>
                  <input type="text" class="form-control" placeholder=""></input>
                </div>
              </div>
            </div>
            <h6 style={{ color: 'red', paddingTop: '7px' }}>
              Based on above response, the control is assessed as failed at L
              {parent.get(item.parent_id) + 1}
            </h6>
            <Button
              className="mt-3"
              variant="warning"
              onClick={click}
              style={{ fontSize: '20px', height: ' 50px', width: '100%' }}
              type="button"
            >
              SUBMIT
            </Button>{' '}
          </div>
        ) : item.parent == 1 ? (
          <div>
            <div className="card border-0 child">
              <div className="card-body text">
                <strong
                  className="card-text "
                  style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                >
                  {' '}
                  {item.ques_text}
                </strong>
                <br></br>
                <br></br>
                <div className="w-100">
                  {item.level.map((opt, i) => (
                    <>
                      <div className="d-flex justify-content-around">
                        <div className="w-50">
                          <label style={{ fontSize: '19px' }}>{opt.L}</label>
                        </div>
                        <div className="d-flex  w-25  justify-content-between m-5">
                          <div className="mb-2">
                            <input
                              type="radio"
                              id={opt.L}
                              name={opt.L}
                              value={opt.L}
                              onChange={() => {
                                radio(item, opt.L, 'yes', i);
                              }}
                            ></input>
                            <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.L}>
                              Yes
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              id={opt.L}
                              name={opt.L}
                              value={opt.L}
                              onChange={() => {
                                radio(item, opt.L, 'No', i);
                              }}
                            ></input>
                            <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.L}>
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <br></br>
              </div>
            </div>
          </div>
        ) : item.section == 0 ? (
          <div>
            <div className="card border-0 child">
              <div className="card-body text">
                <strong className="card-text ">
                  Based on KPI data in section 2. the control failed at L
                  {parent.get(item.parent_id)}. choose either of below .
                </strong>
                <br></br>
                <br></br>
                <div>
                  <input
                    type="radio"
                    id={item.ques_text}
                    name={item.ques_text}
                    onChange={(e) => {
                      child_part(item, e);
                    }}
                  ></input>
                  <label style={{ fontSize: '24px' }} for={item.ques_text}>
                    Agree with KPI value
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={item.ques_text}
                    name={item.ques_text}
                    onChange={(e) => {
                      child_part(item, e);
                    }}
                  ></input>
                  <label style={{ fontSize: '24px' }} for={item.ques_text}>
                    KPI calculation is incorrect
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="card border-0 child">
              <div className="card-body text">
                <strong
                  className="card-text "
                  style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                >
                  {' '}
                  {item.ques_text}
                </strong>
                <br></br>
                <br></br>
                <div>
                  <input
                    type="radio"
                    id={item.ques_text}
                    name={item.ques_text}
                    onChange={(e) => {
                      child_part(item, e);
                    }}
                  ></input>
                  <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.ques_text}>
                    No
                  </label>
                </div>
                <div>
                  <div>
                    <input
                      type="radio"
                      id={item.ques_text}
                      name={item.ques_text}
                      onChange={(e) => {}}
                    ></input>
                    <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.ques_text}>
                      Yes
                    </label>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter value first"
                    onChange={(e) => {
                      child_terminate(item);
                    }}
                  ></input>
                  {childterminate == true ? (
                    <div>
                      <h6 style={{ color: 'red', paddingTop: '7px' }}>
                        Based on above response, the control is assessed as failed at L
                        {parent.get(item.parent_id) + 1}
                      </h6>
                      <Button
                        className="mt-3"
                        variant="warning"
                        onClick={click}
                        style={{ fontSize: 24, height: ' 50px', width: '100%' }}
                        type="button"
                      >
                        SUBMIT
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  );
}

export default Second;

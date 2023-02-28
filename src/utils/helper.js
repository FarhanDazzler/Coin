import blockType from '../components/RenderBlock/constant';

export const getFormatQuestions = (questions, action) => {
  const isQuestionLabelEdit = action === 'isQuestionEdit';
  return questions.map((d, i) => {
    switch (d.question_type) {
      case blockType.RADIO_WITH_INPUT:
      case blockType.RADIO:
        const optionData = d.options.map((d) => {
          return { value: d.option_id, label: d.option_value };
        });
        return {
          ...d,
          isQuestionLabelEdit,
          label: d.question_text,
          question_options: d.options,
          options: optionData,
          show: i === 0,
        };

      case blockType.TEXT:
        return { ...d, label: d.question_text, isQuestionLabelEdit, show: i === 0 };

      case blockType.RADIO_MULTI:
        return {
          ...d,
          label: d.Header_Question || d.question_text,
          isQuestionLabelEdit,
          renderOption: getFormatQuestions(d.innerOptions),
        };

      default:
        return { ...d, label: d.question_text, isQuestionLabelEdit, show: i === 0 };
    }
  });
};

export const gatAllChildIds = (data) => {
  const childIds = [];
  data.forEach((d) => {
    if (d.child_questions.includes('[')) {
      const list = JSON.parse(d.child_questions.replace(/'/g, '"'));
      list.forEach((v) => {
        childIds.push(v);
      });
    } else {
      childIds.push(d.child_questions);
    }
  });
  return childIds;
};

export const handleSelectAns = ({ question = [], ans, data }) => {
  // question = Display selected question list [when user select options then add new question here]
  // ans = save user selected ans here
  // data = all question list [API all data array]

  // to store new question list [ this useEffect check one by one question with condition if valid then add question in this var(newQuestionList) ]
  const newQuestionList = [question[0]];
  // to store ans [ add new question check this question have ans? than add this question ans in thi var(newAnsList) ]
  const newAnsList = { [question[0].q_id]: ans[question[0].q_id] };
  //check section one is Done if true then show submit button
  let isTerminating = false;

  // store all child_questions id
  const childIds = gatAllChildIds(data);

  // Remove first index because this first index we already added in newQuestionList
  const filterData = data.slice(1, data.length);
  // Store all parent question and child question
  let parentData = filterData.filter((d) => !childIds.includes(d.q_id));
  let childData = filterData.filter((d) => childIds.includes(d.q_id));
  console.log('childData', childData, childIds);
  // here is main section1 data logic
  data.forEach((block) => {
    // Check section data is Terminating or not.
    if (isTerminating) return;
    // Check current question is selected in existing ans list
    if (newAnsList[block.q_id]) {
      if (block.is_Terminating) {
        // if this question Terminating then show submit button
        isTerminating = true;
        return;
      }
      switch (block.question_type) {
        case blockType.RADIO:
          // find selected question_options
          const matchQuestion = block.question_options.find(
            (o) => o.option_id === newAnsList[block.q_id],
          );
          const selectOption = matchQuestion?.child_question;
          // check selected question_options has child_question?
          if (selectOption) {
            // if child_question then find childData inside this selected child_question record
            const newQuestion = childData.find((v) => v.q_id === selectOption);
            if (newQuestion) {
              // check this selected new question have already ans then add this object in newAns list and also add selected_question in newQuestionList
              if (ans[newQuestion.q_id]) newAnsList[newQuestion.q_id] = ans[newQuestion.q_id];
              newQuestionList.push(newQuestion);
              // after add remove added record form childData list
              childData = childData.filter((d) => d.q_id !== selectOption);
            }
          } else {
            if (parentData.length > 0) {
              // this question have not child_question then add new question as parentData[0]
              // check this parentData[0] new question have already ans then add this object in newAns list and also add parentData[0] in newQuestionList
              if (ans[parentData[0].q_id]) newAnsList[parentData[0].q_id] = ans[parentData[0].q_id];
              newQuestionList.push(parentData[0]);
              // after add remove added record form parentData list
              delete parentData.shift();
            }
          }
          break;
        case blockType.TEXT:
          if (block.child_questions) {
            const newQuestion = childData.find((v) => v.q_id === block.child_questions);
            if (newQuestion) {
              if (ans[newQuestion.q_id]) newAnsList[newQuestion.q_id] = ans[newQuestion.q_id];
              newQuestionList.push(newQuestion);
              childData = childData.filter((d) => d.q_id !== block.child_questions);
            }
          } else {
            if (parentData.length > 0) {
              if (ans[parentData[0].q_id]) newAnsList[parentData[0].q_id] = ans[parentData[0].q_id];
              newQuestionList.push(parentData[0]);
              delete parentData.shift();
            }
          }
          break;

        case blockType.RADIO_MULTI:
          if (block.child_questions) {
            if (block.renderOption.length === Object.keys(ans[block.q_id]).length) {
              const selectedOptionLabel = [];
              const child_question_ids = {};
              block.innerOptions.forEach((d) => {
                d.options.forEach((o) => {
                  if (o.option_id === newAnsList[block.q_id][d.q_id]) {
                    selectedOptionLabel.push(o.option_value);
                    child_question_ids[o.option_value] = o.child_question;
                  }
                });
              });
              const filterOptions = [...new Set(selectedOptionLabel)];
              if (filterOptions.length === 1) {
                const selectedChildId = child_question_ids[filterOptions[0]];
                const findNewQuestion = childData.find((cd) => cd.q_id === selectedChildId);
                if (findNewQuestion) {
                  if (ans[findNewQuestion.q_id])
                    newAnsList[findNewQuestion.q_id] = ans[findNewQuestion.q_id];
                  newQuestionList.push(findNewQuestion);
                  childData = childData.filter((d) => d.q_id !== selectedChildId);
                }
              } else {
                const selectedNoChildId = child_question_ids['No'];
                const findNewNoQuestion = childData.find((cd) => cd.q_id === selectedNoChildId);
                if (findNewNoQuestion) {
                  if (ans[findNewNoQuestion.q_id])
                    newAnsList[findNewNoQuestion.q_id] = ans[findNewNoQuestion.q_id];
                  newQuestionList.push(findNewNoQuestion);
                  childData = childData.filter((d) => d.q_id !== selectedNoChildId);
                }
              }
            }
          } else {
            if (parentData.length > 0) {
              if (ans[parentData[0].q_id]) newAnsList[parentData[0].q_id] = ans[parentData[0].q_id];
              newQuestionList.push(parentData[0]);
              delete parentData.shift();
            }
          }
          break;
      }
    }
  });

  return { newQuestionList, newAnsList, isTerminating };
};

export const getQuestionsFormatData = (data) => {
  return data.map((val) => {
    return {
      ...val,
      question_text: val.Header_Question,
      question_type: blockType.RADIO_MULTI,
      innerOptions: val.Inner_Questions ? JSON.parse(val.Inner_Questions) : [],
    };
  });
};

import blockType from '../components/RenderBlock/constant';

export const validateEmail = (email) => {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return regexEmail.test(email);
};

export const getFormatQuestions = (questions, action, startStr, handOverUser) => {
  const isQuestionLabelEdit = action === 'isQuestionEdit';
  return questions?.map((d, i) => {
    if (handOverUser && d.is_AD) {
      return {
        ...d,
        question_type: blockType.IS_AD,
        label: d.question_text,
        required: true,
        isQuestionLabelEdit,
        show: i === 0,
      };
    }
    switch (d.question_type) {
      case blockType.RADIO_WITH_INPUT:
      case blockType.RADIO:
        const optionData = d.options?.map((d) => {
          return { value: d.option_id, label: d.option_value };
        });
        return {
          ...d,
          isQuestionLabelEdit,
          label: `${startStr ? startStr + `: Q${i + 1}.` : ''}${d.question_text}`,
          question_options: d.options,
          options: optionData,
          show: i === 0,
        };

      case blockType.DROPDOWN:
        const dropdownData = d.options?.map((d) => {
          return { value: d.option_id || d.option_value, label: d.option_value };
        });
        return {
          ...d,
          isQuestionLabelEdit,
          label: d.question_text,
          question_options: d.options,
          options: dropdownData,
          show: i === 0,
        };

      case blockType.TEXT:
        return {
          ...d,
          label: d.question_text,
          required: true,
          isQuestionLabelEdit,
          show: i === 0,
        };

      case blockType.RADIO_MULTI:
        return {
          ...d,
          label: d.Header_Question || d.question_text,
          isQuestionLabelEdit,
          renderOption: getFormatQuestions(d.innerOptions, null, startStr),
        };

      default:
        return { ...d, label: d.question_text, isQuestionLabelEdit, show: i === 0 };
    }
  });
};

export const getLanguageFormat = (data = [], lang = 'en', startStr, isValid, recarsive) => {
  return data?.map((d, i) => {
    const language = lang === 'en' || !lang ? '' : lang + '_';
    const keyHeader_Question = language + 'Header_Question';
    const innerOption = language + 'Inner_Questions';
    const keyInner_Questions =
      typeof d[innerOption] === 'string' ? JSON.parse(d[innerOption]) : d[innerOption] || [];

    const keyQuestion = language + 'question_text';
    const keyOption = language + 'option_value';

    switch (d.question_type) {
      case blockType.RADIO_WITH_INPUT:
      case blockType.RADIO:
        const optionData = (!recarsive ? d.question_options : d.options)?.map((d) => {
          return { value: d.option_id, label: d[keyOption] || d.option_value };
        });
        if (recarsive) console.log('keyInner_QuestionskeyInner_QuestionskeyInner_Questions', d);
        return {
          ...d,
          label: `${startStr ? startStr + `: Q${i + 1}. ` : ''}${
            d[keyQuestion] || d.question_text
          }`,
          options: optionData,
        };

      case blockType.DROPDOWN:
        const dropdownData = d.options?.map((d) => {
          return {
            value: d.option_id || d.value || d[keyOption] || d.label || d.option_value,
            label: d[keyOption] || d.label || d.option_value,
          };
        });
        return {
          ...d,
          label: d[keyQuestion] || d.question_text,
          options: dropdownData,
        };

      case blockType.TEXT:
        return {
          ...d,
          label: d[keyQuestion] || d.question_text,
        };

      case blockType.RADIO_MULTI:
        const { renderOption, ...updateVal } = d;
        const newObj = {
          ...updateVal,
          label: d[keyHeader_Question] || d[keyQuestion] || d.question_text,
          renderOption: getLanguageFormat(keyInner_Questions, lang, startStr, '', true),
        };
        return { ...newObj };

      // eslint-disable-next-line no-fallthrough
      case blockType.IS_AD:
        return {
          ...d,
          label: d.Header_Question || d.question_text,
          renderOption: getLanguageFormat(keyInner_Questions, lang, startStr),
        };

      default:
        return { ...d, label: d[keyQuestion] || d.question_text };
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
      if (typeof d.child_questions === 'string') childIds.push(d.child_questions);
      d.child_questions.forEach((v) => {
        childIds.push(v);
      });
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

  // here is main section1 data logic
  data.forEach((block) => {
    // Check section data is Terminating or not.
    if (isTerminating) return;
    // Check current question is selected in existing ans list
    if (newAnsList[block.q_id]) {
      if (block.is_Terminating || block.options[0]?.is_Terminating) {
        // if this question Terminating then show submit button
        isTerminating = true;
        return;
      }
      switch (block.question_type) {
        case blockType.RADIO:
        case blockType.DROPDOWN:
          // find selected question_options
          const matchQuestion = block.question_options.find(
            (o) => o.option_id === newAnsList[block.q_id],
          );
          const selectOption = matchQuestion?.child_question;
          if (matchQuestion.is_Terminating) {
            // if this question Terminating then show submit button
            isTerminating = true;
            return;
          }
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
            const newQuestion = childData.find((v) => v.q_id === block.child_questions[0]);
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

export const getQuestionsFormatData = (data = []) => {
  if (!Array.isArray(data)) {
    if (typeof data === 'object') {
      return Object.keys(data)?.map((value) => {
        const val = data[value];
        return {
          is_Failing: false,
          ...val,
          label: val?.Header_Question,
          question_text: val?.Header_Question,
          question_type: blockType.RADIO_MULTI,
          innerOptions: val?.Inner_Questions ? JSON.parse(val?.Inner_Questions) : [],
        };
      });
    }
    return [];
  }

  return data?.map((val) => {
    return {
      is_Failing: false,
      ...val,
      label: val?.Header_Question,
      question_text: val?.Header_Question,
      question_type: blockType.RADIO_MULTI,
      innerOptions: val?.Inner_Questions ? JSON.parse(val?.Inner_Questions) : [],
    };
  });
};

const convertInnerOptions = (langArray = [], existArray) => {
  const objArray = isJsonString(langArray) ? JSON.parse(langArray) : [];
  return existArray?.map((dt) => {
    const obj =
      typeof objArray === 'string'
        ? { question_text: objArray }
        : objArray.find((d) => d.q_id === dt.q_id) || {};
    return { ...dt, question_text: '', ...obj };
  });
};

export const getQuestionsWithLangFormatData = (data, isChangeLang) => {
  return Object.keys(data)?.map((key) => {
    const val = data[key];
    const innerOptions = isJsonString(val?.Inner_Questions) ? JSON.parse(val?.Inner_Questions) : [];
    if (isChangeLang) {
      return {
        is_Failing: false,
        ...val,
        question_text: val?.Header_Question,
        question_type: blockType.RADIO_MULTI,
        innerOptions: innerOptions,

        es_Header_Question: val.es_Header_Question,
        es_innerOptions: convertInnerOptions(val.es_Inner_Questions, innerOptions),

        fr_Header_Question: val.fr_Header_Question,
        fr_innerOptions: convertInnerOptions(val.fr_Inner_Questions, innerOptions),

        ko_Header_Question: val.ko_Header_Question,
        ko_innerOptions: convertInnerOptions(val.ko_Inner_Questions, innerOptions),

        md_Header_Question: val.md_Header_Question,
        md_innerOptions: convertInnerOptions(val.md_Inner_Questions, innerOptions),

        pt_Header_Question: val.pt_Header_Question,
        pt_innerOptions: convertInnerOptions(val.pt_Inner_Questions, innerOptions),
      };
    }
    return {
      is_Failing: false,
      ...val,
      question_text: val?.Header_Question,
      question_type: blockType.RADIO_MULTI,
      innerOptions: val?.Inner_Questions ? JSON.parse(val?.Inner_Questions) : [],
    };
  });
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// TODO: old multi select logic
// if (block.child_questions) {
//   if (block.renderOption.length === Object.keys(ans[block.q_id]).length) {
//     const selectedOptionLabel = [];
//     const child_question_ids = {};
//     block.innerOptions.forEach((d) => {
//       d.options.forEach((o) => {
//         if (o.option_id === newAnsList[block.q_id][d.q_id]) {
//           selectedOptionLabel.push(o.option_value);
//           child_question_ids[o.option_value] = o.child_question;
//         }
//       });
//     });
//     const filterOptions = [...new Set(selectedOptionLabel)];
//     if (filterOptions.length === 1) {
//       const selectedChildId = child_question_ids[filterOptions[0]];
//       const findNewQuestion = childData.find((cd) => cd.q_id === selectedChildId);
//       if (findNewQuestion) {
//         if (ans[findNewQuestion.q_id])
//           newAnsList[findNewQuestion.q_id] = ans[findNewQuestion.q_id];
//         newQuestionList.push(findNewQuestion);
//         childData = childData.filter((d) => d.q_id !== selectedChildId);
//       }
//     } else {
//       const selectedNoChildId = child_question_ids['No'];
//       const findNewNoQuestion = childData.find((cd) => cd.q_id === selectedNoChildId);
//       if (findNewNoQuestion) {
//         if (ans[findNewNoQuestion.q_id])
//           newAnsList[findNewNoQuestion.q_id] = ans[findNewNoQuestion.q_id];
//         newQuestionList.push(findNewNoQuestion);
//         childData = childData.filter((d) => d.q_id !== selectedNoChildId);
//       }
//     }
//   }
// } else {
//   if (parentData.length > 0) {
//     if (ans[parentData[0].q_id]) newAnsList[parentData[0].q_id] = ans[parentData[0].q_id];
//     newQuestionList.push(parentData[0]);
//     delete parentData.shift();
//   }
// }

export const languageToTextKey = (language) => {
  switch (language) {
    case 'French':
      return 'fr_';
    case 'Mandarin':
      return 'md_';
    case 'Spanish':
      return 'es_';
    case 'Korean':
      return 'ko_';
    case 'Vietnamese':
      return 'vi_';
    case 'Portuguese':
      return 'pt_';
    default:
      return '';
  }
};

export const getLanguageToTextKey = (language) => {
  switch (language) {
    case 'fr':
      return 'fr_';
    case 'md':
      return 'md_';
    case 'es':
      return 'es_';
    case 'ko':
      return 'ko_';
    case 'vi':
      return 'vi_';
    case 'pt':
      return 'pt_';
    default:
      return '';
  }
};

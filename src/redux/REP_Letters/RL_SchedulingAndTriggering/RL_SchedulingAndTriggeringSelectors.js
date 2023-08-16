export const getFunctionalDropdowndataSelector = (state) => state?.RLSchedulingAndTriggering?.rlFunctionData;
export const getFunctionalPage1dataSelector = (state) => state?.RLSchedulingAndTriggering?.rlFunctionalPage1Data;
export const getAllFunctionaldataSelector = (state) => state?.RLSchedulingAndTriggering?.rlGetAllFunctionalAssessmentData;
export const getFunctiondataSelector = (state) => state?.RLSchedulingAndTriggering?.rlGetFunctionalAssessmentData;
export const recallFunctionAssessmentSelector = (state) => state.assessmentBank.recallFunctionAssessment;
export const reTriggerFunctionAssessmentSelector = (state) => state.assessmentBank.reTriggerFunctionAssessment;
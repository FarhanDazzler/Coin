export const sectionAnsSelector = (state) => state.assessments.sectionAns;
export const getResponseSelector = (state) => state.assessments.getResponse;
export const getControlSelector = (state) => state.assessments.controlData;
export const getQuestionsSelector = (state) => state.assessments.questions;
export const kpiResultSelector = (state) => state.assessments.kpiResult;
export const getDraftResponseSelector = (state) => state.assessments.getDraftResponse;
export const addUpdateDraftResponseSelector = (state) => state.assessments.addUpdateDraftResponse;
export const getFinalSubmitResponseSelector = (state) => state.assessments.getFinalSubmitResponse;
export const addUpdateFinalSubmitResponseSelector = (state) =>
  state.assessments.addUpdateFinalSubmitResponse;
export const getLatestDraftSelector = (state) => state.assessments.getLatestDraft;
export const addOrEditUpdateDraftSelector = (state) => state.assessments.addOrEditUpdateDraft;
export const getMicsOpenActionPlanSelector = (state) => state.assessments.getMicsOpenActionPlan;
export const get_MICS_OpenActionPlanSelector = (state) => state.assessments.get_MICS_OpenActionPlan;
export const submitAssessmentResponseSelector = (state) => state.assessments.addResponse;
export const get_previous_assessment_resultSelector = (state) =>
  state.assessments.get_previous_assessment_result;
export const last_previous_assessment_resultSelector = (state) =>
  state.assessments.last_previous_assessment_result;

export const get_historical_graph_dataSelector = (state) =>
  state.assessments.get_historical_graph_data;

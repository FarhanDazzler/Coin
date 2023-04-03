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

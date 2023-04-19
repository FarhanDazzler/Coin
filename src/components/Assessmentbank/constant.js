import * as React from 'react';

export const getSurveyStatusClass = (name) => {
  switch (true) {
    case name === 'name':
      return 'text-yellow-50';
    case name === 'Triggered':
      return 'text-blue-50';
    default:
      return 'text-silver-50';
  }
};

export const TABLE_ROES = [
  {
    id: 1,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Unassigned',
    ControlOversight: 'Unassigned',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'name',
  },
  {
    id: 2,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Unassigned',
    ControlOversight: 'Unassigned',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Triggered',
  },
  {
    id: 3,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Binay, J',
    ControlOversight: 'Ganga, P',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Re-triggered',
  },
  {
    id: 4,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Ranga, HK',
    ControlOversight: 'Ganga, P',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Re-triggered',
  },
  {
    id: 5,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Unassigned',
    ControlOversight: 'Unassigned',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Recalled',
  },
  {
    id: 6,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Unassigned',
    ControlOversight: 'Unassigned',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Triggered',
  },
  {
    id: 7,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Binay, J',
    ControlOversight: 'Ganga, P',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Re-triggered',
  },
  {
    id: 8,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Ranga, HK',
    ControlOversight: 'Ganga, P',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Re-triggered',
  },

  {
    id: 9,
    assessmentName: 'Assessment_Q1_23',
    ControlID: 'MJE_ATR_01ak',
    ReceiverOrganization: 'NAZ',
    ProviderOrganization: 'EUR',
    ControlOwner: 'Unassigned',
    ControlOversight: 'Unassigned',
    AssessmentCycle: 'Q1 2023',
    SurveyStatus: 'Recalled',
  },
];

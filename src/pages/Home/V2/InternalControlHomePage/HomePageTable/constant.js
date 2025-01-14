import * as React from 'react';
import { Badge } from '@mantine/core';

export const Badge_apply = ({ data }) => {
  if (data.toUpperCase() === 'PASS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'COMPLETE' || data === 'UNDER REVIEW') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'SUBMITED' || data === 'UNDER REVIEWS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'FAIL') {
    return (
      <Badge color="red" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'IN PROGRESS') {
    return (
      <Badge color="orange" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'NOT STARTED' || data === 'UNDER REVIEW') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'N/A' || data.toUpperCase() === 'NA') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
};

export const class_to_apply = (item) => {
  let className = '';
  if (item.toUpperCase() === 'PASS') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'COMPLETE' || item === 'UNDER REVIEW') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'SUBMITED' || item === 'UNDER REVIEWS') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'FAIL') {
    className = 'badge badge-red';
  }
  if (item.toUpperCase() === 'IN PROGRESS') {
    className = 'badge badge-amber';
  }
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW') {
    className = 'badge badge-grey';
  }
  return className;
};

export const TABLE_ROES = [
  {
    id: 1,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 2,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 3,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Draft',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 4,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 5,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Re-assessed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 6,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 7,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Re-assessed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 8,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 9,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },

  {
    id: 11,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 12,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 13,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Draft',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 14,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 15,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Re-assessed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 16,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Not started',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 17,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Re-assessed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 18,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 19,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'Completed',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
];

export const QuestionBank_Landing_page_data = [
  {
    id: 1,
    Mega_Process: 'AB Inbev India',
    Sub_Process: 'AB Inbev India',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev India',
    Status: 'Completed',
  },
  {
    id: 2,
    Mega_Process: 'AB Inbev US',
    Sub_Process: 'AB Inbev US',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev US',
    Status: 'Pending',
  },
  {
    id: 3,
    Mega_Process: 'AB Inbev Belgium',
    Sub_Process: 'AB Inbev Belgium',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev Belgium',
    Status: 'Completed',
  },
  {
    id: 4,
    Mega_Process: 'AB Inbev India',
    Sub_Process: 'AB Inbev India',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev India',
    Status: 'Not Confirmed',
  },
  {
    id: 5,
    Mega_Process: 'AB Inbev US',
    Sub_Process: 'AB Inbev US',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev US',
    Status: 'Completed',
  },
];

export const tempData = [
  {
    q_id: 'Q-S011',
    child_questions: '["Q-S012", "Q-S013"]',
    is_Terminating: 0,
    question_text:
      'Below are the key requirements linked to L1 MICS Description and would require your response to assess compliance with L1777',
    question_type: 'RadioMulti',
    innerOptions: [
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S012", "Q-S013"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S012',
            is_action_plan: 0,
            option_id: '0c72d6a7-1ba1-4e90-8404-3a16184fc5c0',
            option_value: 'Yes',
            q_id: 'Q-S011-1',
          },
          {
            child_question: 'Q-S013',
            is_action_plan: 0,
            option_id: 'bcc6ee98-fd11-4888-8ae0-481582618020',
            option_value: 'No',
            q_id: 'Q-S011-1',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S011-1',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text:
          'L1: Approval evidence along with supporting documents on MJE are archived in a ticketing tool or in SAP?',
        question_type: 'Radio',
        response_required: 'True',
      },
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S012", "Q-S013"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S012',
            is_action_plan: 0,
            option_id: '2fb84342-0052-4335-bf52-c013e4f28526',
            option_value: 'Yes',
            q_id: 'Q-S011-2',
          },
          {
            child_question: 'Q-S013',
            is_action_plan: 0,
            option_id: '45aedab2-56d0-4c06-9fe7-243d33e5b252',
            option_value: 'No',
            q_id: 'Q-S011-2',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S011-2',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text: 'L1: Approver and requestor authorized to park/post MJE in SAP',
        question_type: 'Radio',
        response_required: 'True',
      },
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S012", "Q-S013"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S013',
            is_action_plan: 0,
            option_id: '3bb20eea-5b68-4053-908e-9ae91281d205',
            option_value: 'No',
            q_id: 'Q-S011-3',
          },
          {
            child_question: 'Q-S012',
            is_action_plan: 0,
            option_id: 'ec910058-a89b-48dc-af0d-80395c5365f2',
            option_value: 'Yes',
            q_id: 'Q-S011-3',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S011-3',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text:
          'L1: For MJE Posted without park & Post, detective review is executed before or on WD10. Further, whether on quarterly basis, access to direct post (without park) is reviewed and confirmed?',
        question_type: 'Radio',
        response_required: 'True',
      },
    ],
  },
  {
    Control_ID: 'ATR_MJE_01a-K',
    Global_KPI_Code: 'Assigning random kpi code',
    child_questions: '',
    is_Terminating: 0,
    options: [
      {
        child_question: '',
        is_action_plan: 0,
        option_id: '4dbcf5af-e52f-4909-8eb9-db328d0e16db',
        option_value: 'No',
        q_id: 'Q-S012',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'bbfb6d79-460b-475f-9daf-a43912600a4d',
        option_value: '',
        q_id: 'Q-S012',
      },
    ],
    parent_qid: '["Q-S011-1", "Q-S011-2", "Q-S011-3"]',
    q_id: 'Q-S012',
    q_id_Type: 0,
    question_child: 0,
    question_order: 'Assigning random order',
    question_status: 1,
    question_text:
      "Based on above response, the control is assessed as passed at L1. Would you like to report any other deficiency not covered in the points mentioned above? (Please select 'No' in case of none of the deficiencies identified)",
    question_type: 'RadioWithInput',
    response_required: 'True',
  },
  {
    Control_ID: 'ATR_MJE_01a-K',
    Global_KPI_Code: 'Assigning random kpi code',
    child_questions: '',
    is_Terminating: 0,
    options: [
      {
        child_question: '',
        is_action_plan: 0,
        option_id: '3e0e83cf-48b0-4c0f-a6ae-ee98df46f7b9',
        option_value:
          'Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team',
        q_id: 'Q-S013',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'b975638b-f6f2-446e-90b8-d74b3be26a46',
        option_value:
          'Action Plan to remediate the controls is already created by aligning with the Zone IC team',
        q_id: 'Q-S013',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'f9b91202-b1d9-4491-9c9e-35e17c0e74e4',
        option_value: '',
        q_id: 'Q-S013',
      },
    ],
    parent_qid: '["Q-S011-1", "Q-S011-2", "Q-S011-3"]',
    q_id: 'Q-S013',
    q_id_Type: 0,
    question_child: 0,
    question_order: 'Assigning random order',
    question_status: 1,
    question_text:
      'Based on above response, the control is assessed as failed at L1. Could you please select either of the below options on action Plan. Action plan is a time bound proposition designed to remediate the control breakdown with the objective of ensuring MICS compliance',
    question_type: 'Radio',
    response_required: 'True',
  },
  {
    q_id: 'Q-S014',
    child_questions: '["Q-S012", "Q-S013"]',
    is_Terminating: 0,
    question_text:
      'Below are the key requirements linked to L2 MICS Description and would require your response to assess compliance with L2777',
    question_type: 'RadioMulti',
    innerOptions: [
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S015", "Q-S016"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S016',
            is_action_plan: 0,
            option_id: '825a0ca0-680a-44c1-a33c-6d0340fc2c36',
            option_value: 'No',
            q_id: 'Q-S014-1',
          },
          {
            child_question: 'Q-S015',
            is_action_plan: 0,
            option_id: 'e4b125df-1e88-491e-823e-9756c18a2ee5',
            option_value: 'Yes',
            q_id: 'Q-S014-1',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S014-1',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text:
          'L2: Whether manual journal entries are managed in a workflow tool to ensure:a) mandatory attachments are included &b) auto posting of manual journal entries following the necessary approvals provided in the system',
        question_type: 'Radio',
        response_required: 'True',
      },
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S015", "Q-S016"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S015',
            is_action_plan: 0,
            option_id: '129bbcb9-0e1a-432b-95a7-258d7cbefa8e',
            option_value: 'Yes',
            q_id: 'Q-S014-2',
          },
          {
            child_question: 'Q-S016',
            is_action_plan: 0,
            option_id: '1661af6f-55c0-4126-b7ce-6c49db8a3313',
            option_value: 'No',
            q_id: 'Q-S014-2',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S014-2',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text:
          'L2: All changes in the workflow configuration are approved by Zone Internal Control before the changes are made.',
        question_type: 'Radio',
        response_required: 'True',
      },
      {
        Control_ID: 'ATR_MJE_01a-K',
        Global_KPI_Code: 'Assigning random kpi code',
        child_questions: '["Q-S015", "Q-S016"]',
        is_Terminating: 0,
        options: [
          {
            child_question: 'Q-S015',
            is_action_plan: 0,
            option_id: '8789389b-feb9-45c7-bbcc-87f8de40928c',
            option_value: 'Yes',
            q_id: 'Q-S014-3',
          },
          {
            child_question: 'Q-S016',
            is_action_plan: 0,
            option_id: 'deeb30c8-02db-4837-911b-5e3a7438fe94',
            option_value: 'No',
            q_id: 'Q-S014-3',
          },
        ],
        parent_qid: '',
        q_id: 'Q-S014-3',
        q_id_Type: 0,
        question_child: 1,
        question_order: 'Assigning random order',
        question_status: 1,
        question_text:
          'L2: For MJEs not categorized speciafically, (e.g. reclassification, corrections) a common and standardized zone template is in place to justify the underlying data of the amounts defined in the journal entry.',
        question_type: 'Radio',
        response_required: 'True',
      },
    ],
  },

  {
    Control_ID: 'ATR_MJE_01a-K',
    Global_KPI_Code: 'Assigning random kpi code',
    child_questions: '',
    is_Terminating: 0,
    options: [
      {
        child_question: '',
        is_action_plan: 0,
        option_id: '14f0340d-696b-440e-a05a-8e44457476e9',
        option_value: 'No',
        q_id: 'Q-S015',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'a951cdbd-7ffd-4a29-badd-b28d259917da',
        option_value: '',
        q_id: 'Q-S015',
      },
    ],
    parent_qid: '["Q-S014-1", "Q-S014-2", "Q-S014-3"]',
    q_id: 'Q-S015',
    q_id_Type: 0,
    question_child: 0,
    question_order: 'Assigning random order',
    question_status: 1,
    question_text:
      'Based on above response, the control is assessed as passed at L2. Would you like to report any other deficiency not covered in the points mentioned above? ',
    question_type: 'Radio',
    response_required: 'True',
  },
  {
    Control_ID: 'ATR_MJE_01a-K',
    Global_KPI_Code: 'Assigning random kpi code',
    child_questions: '',
    is_Terminating: 0,
    options: [
      {
        child_question: '',
        is_action_plan: 0,
        option_id: '56807ce5-faea-44ce-b107-2e85f9846ad1',
        option_value:
          'Action Plan to remediate the controls is already created by aligning with the Zone IC team',
        q_id: 'Q-S016',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'b1c3d809-bbc4-421b-a216-2db6cbd8ca49',
        option_value:
          'Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team',
        q_id: 'Q-S016',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'ec8f0b80-45de-45e8-bf02-ff22f1fb76e9',
        option_value: '',
        q_id: 'Q-S016',
      },
    ],
    parent_qid: '["Q-S014-1", "Q-S014-2", "Q-S014-3"]',
    q_id: 'Q-S016',
    q_id_Type: 0,
    question_child: 0,
    question_order: 'Assigning random order',
    question_status: 1,
    question_text:
      'Based on above response, the control is assessed as failed at L2. Could you please select either of the below options on the action Plan.',
    question_type: 'Radio',
    response_required: 'True',
  },
  {
    Control_ID: 'ATR_MJE_01a-K',
    Global_KPI_Code: 'Assigning random kpi code',
    child_questions: '',
    is_Terminating: 0,
    options: [
      {
        child_question: '',
        is_action_plan: 0,
        option_id: '0ef2f645-9e9a-4de6-84d9-e9a5417a92ad',
        option_value: 'Yes, passed at Level3',
        q_id: 'Q-S017',
      },
      {
        child_question: '',
        is_action_plan: 0,
        option_id: 'c7d0728c-6f60-49ec-a229-08022b860cd3',
        option_value: 'No, failed at Level3',
        q_id: 'Q-S017',
      },
    ],
    parent_qid: '',
    q_id: 'Q-S017',
    q_id_Type: 0,
    question_child: 0,
    question_order: 'Assigning random order',
    question_status: 1,
    question_text:
      'Is L3 MICS Description achieved on this control? In addition to the L2 requirements:\n1. Any MJE performed is managed through a workflow tool which guarantees four eye review on every transaction (employees can park & post journal entries, but can never do this on the same journal entry). \n2. All documentation supporting MJEs is stored together with the journal entry in the system of record (ERP or sub conso system) and no other system.\n\nStandardization to be achieved to reach L3: Booking of manual journal entries is only performed by the NoCC.',
    question_type: 'Radio',
    response_required: 'True',
  },
];

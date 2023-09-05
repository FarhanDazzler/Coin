import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import ReviewResponsePage from './FormComponents/ReviewResponsePage';
import { getFunctionalInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_Function_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_Function_QuestionsSelector,
  getFunctionalInstructionsSelector,
} from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import { getLatestFunctionDraftResponse } from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateFunctionDraftResponseSelector,
  getLatestFunctionDraftResponseSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state?.data?.scopeData;
  const modalType = props.location.state?.data?.modalType;

  const questionState = useSelector(get_Function_QuestionsSelector);
  const instructionState = useSelector(getFunctionalInstructionsSelector);
  const getLatestFunctionDraftResponseState = useSelector(getLatestFunctionDraftResponseSelector);

  useEffect(() => {
    let payload = {
      function: scopeData?.Function,
    };
    dispatch(getFunctionalInstructions());
    dispatch(get_Function_Questions(payload));

    let payloadForGetttingDraftResp = {
      assessment_id: scopeData?.id,
    };
    dispatch(getLatestFunctionDraftResponse(payloadForGetttingDraftResp));
  }, []);

  const submittedResponses = {
    '1E08177D-A445-EE11-A9BC-854637048545': {
      questionText:
        '<p>Principle: All suspected and confirmed fraud cases are disclosed properly.&nbsp;</p><p>Confirmation of correct behaviour: As a signatory, I confirm that all irregularities (suspected or confirmed fraud) identified during the quarter under review, have been reported to Legal, Ethics &amp; Compliance, Global Risk Management and corrective actions have or will be taken for substantiated fraud (i.e. punitive action against perpetrator and mitigation of control weakness). Overview of confirmed irregularities (fraud), resulting in financial loss per event of more than 500k USD, are disclosed in this representation letter. Amongst others, this includes such transactions during the course of the previous period, (a) whereby funds of third parties were transferred using the company’s bank accounts, (b) whereby persons and/or entities registered in money laundering-sensitive areas were involved, (c) of capital investments, increases of capital or loans from entities and/or persons registered in money laundering-sensitive areas.</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'Yes',
      comment: '',
    },
    'BF2D3B91-A445-EE11-A9BC-854637048545': {
      questionText:
        '<p>Principle: At AB InBev, we do not take short cuts (<strong>principle #10</strong>) and as owners, we do take responsibility and accountability for our actions (<strong>principle #4</strong>). This is embedded in our culture.</p><p>Confirmation of correct behavior: As a signatory, I confirm that the Code of Business Conduct and company policies referred therein, including policies related to Digital Ethics and data privacy and security, are properly communicated to all personnel, and they are made aware that any violation could lead to disciplinary action, including termination of employment, loss of compensation, or other measures deemed appropriate by the company.&nbsp;&nbsp;</p><p>I recognize that if I violate any policy or I authorize or deliberately allow a subordinate to violate any, I am subject to disciplinary action, including loss of LTI, other compensation during vesting period and potential dismissal.&nbsp;</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'Yes',
      comment: 'Yes Comment',
    },
    '604D5D9C-A445-EE11-A9BC-854637048545': {
      questionText:
        '<p>Principle: We perform due diligence for any touchpoint vendor.</p><p>Confirmation of correct behavior: As a signatory, I confirm that a list of “touchpoint vendors” (TPVs) is maintained by Zone (or Business Unit) Legal or Ethics &amp; Compliance. I confirm that any exception for this due diligence requirement has been approved by Global Ethics &amp; Compliance.&nbsp;All TPVs (including agents for licenses and permits) retained by the Company were approved by the Global or Zone Compliance after due diligence, which includes, but is not limited, to questionnaires filled by employees and TPVs.</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'No',
      comment: 'No Comment',
    },
    'C16F56A7-A445-EE11-A9BC-854637048545': {
      questionText:
        '<p>Principle: We adhere to our Anti-Corruption Policy.</p><p>Confirmation of correct behavior: As a signatory, I confirm that:&nbsp;</p><p>(i) all gifts, entertainment and hospitality offered to Public Officials (as defined under the Anti-Corruption Policy) were communicated to and authorized by Global or Zone Ethics &amp; Compliance in compliance with our Anti-Corruption Policy and were appropriately accounted for and reported. All gifts, entertainment and hospitality provided to Public Officials by the Company were booked correctly according to the Global Chart of Accounts.&nbsp;</p><p>(ii) licenses and permits were obtained in compliance with our Anti-Corruption Policy meaning, among other things, that no improper payment to Public Officials has been made in the process.</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'NA',
      comment: 'NA Comment',
    },
    '2A9387B2-A445-EE11-A9BC-854637048545': {
      questionText:
        '<p>Principle:&nbsp;Policy Implementation&nbsp;</p><p>Confirmation of correct behavior:&nbsp;As a signatory, I confirm that unless otherwise disclosed, my function has carried out all policies implementation for policies approved by the Global Policy Steering Committee, in accordance with guidelines from the Steering Committee and Global Ethics &amp; Compliance.&nbsp;&nbsp;This includes the implementation of the Global Investigation Guidelines.&nbsp;</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'Yes',
      comment: '',
    },
    '9ECA48E3-F031-EE11-A9BC-CB11DB717321': {
      questionText:
        "<p>Principle: At AB InBev, we do not take short cuts (<strong>principle #10</strong>) and as owners, we do take responsibility and accountability for our actions (<strong>principle #2</strong>).&nbsp;</p><p>Confirmation of correct behavior: As a signatory, I confirm that till the date of signing:&nbsp;</p><ul><li>None of any employees I oversee caused any violation nor am I aware of any violation of the Code of Business Conduct or company policies referred therein, including the Anti-Corruption Policy, Accounting Policies and policies related to Digital Ethics, including data privacy and cybersecurity, that has not been disclosed to the VP, Ethics &amp; Compliance, VP Global Risk Management or appropriate compliance personnel, or disclosed through this representation letter.</li><li>I have not been putting pressure on others to engage in unethical conduct to meet targets or for any other purpose, and I'm not aware of any such case within my function.&nbsp;</li><li>Financials reflect reality and are not influenced by the need to achieve certain budget or latest estimate values.</li></ul><p>I recognize that if I violate any policy or I authorize or deliberately allow a subordinate to violate any, I am subject to disciplinary action, including loss of LTI, other compensation during vesting period and potential dismissal.&nbsp;</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>",
      response: 'Yes',
      comment: '',
    },
    'A2E5E420-0532-EE11-A9BC-CB11DB717321': {
      questionText:
        '<p>Principle: Leaving unsupported expense accruals or other reserves purposefully on the company’s books and then selectively reversing or releasing later to boost earnings is not allowed.</p><p>Confirmation of correct behavior:&nbsp;As a signatory, I confirm that, for the cost centers and projects in scope of the Legal function:</p><p>(i) no accruals and provisions have been missed, AND</p><p>(ii) all accruals taken have been approved in compliance with the authority level of the AB InBev Provision &amp; Accrual Policy, AND</p><p>(iii) all accruals taken relate to costs that have been incurred and assumptions to substantiate are valid and in line with IFRS and the accounting and reporting guidelines of AB InBev. Amongst other things, this means that:</p><ul><li>No accruals have been performed for product or services that will be delivered in a future accounting period&nbsp;</li><li>No accrual is taken for work that was not finished in time and has to be completed by the vendor next year.</li></ul><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'No',
      comment: 'NO',
    },
    '42A92046-0632-EE11-A9BC-CB11DB717321': {
      questionText:
        '<p>Principle: Deferring current period expenses or failing to record expenses in accordance with IFRS rules to manipulate earnings is not allowed.</p><p>Confirmation of correct behavior:&nbsp;As a signatory, I confirm that, for the cost centers and projects in scope of my function, purchase orders have been created and goods receipts for costs have been performed when the services/goods have been received (not earlier and also not later). Amongst other things, this means that:</p><ul><li>No goods receipt is performed for a consulting project that will be delivered in a future accounting period.</li><li>All goods receipts are performed for any consulting work that was delivered last month.</li></ul><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'NA',
      comment: 'Test',
    },
    '43A92046-0632-EE11-A9BC-CB11DB717321': {
      questionText:
        '<p>Principle: For all transactions, delegation of authorities’ guidelines (DAG) is complied with.</p><p>Confirmation of correct behavior:&nbsp;As a signatory, I confirm that DAG has been complied with for all transactions related to my function.</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'NA',
      comment: 'Test last second question',
    },
    '5A154777-8437-EE11-A9BC-CB11DB717321': {
      questionText:
        '<p>Principle: All claims are in the litigation tool and properly provisioned for.</p><p>Confirmation of correct behavior: As a signatory, I confirm that all claims and litigations against the company are properly documented in the Litigation Tool and sufficient&nbsp;provisions have been established for claims and litigations against the company as defined per the guidelines in the Global Provision and Accrual Policy.</p><p>If I am aware of any violation, I disclosed it through this representation letter.</p>',
      response: 'No',
      comment: 'last question no selected',
    },
  };
  return (
    <div>
      {/* <PageWrapper>
        <div className="container-fluid">
          {instructionState.loading ||
          questionState.loading ||
          getLatestFunctionDraftResponseState.loading ? (
            <div className="loader-animation">
              <DotSpinner size={100} speed={0.9} color="#e3af32" />
              <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
            </div>
          ) : (
            <div className="col-lg-12">
              <Section0 scopeData={scopeData} />
              <Section1 questions={questionState.data} scopeData={scopeData} />
            </div>
          )}
        </div>
      </PageWrapper> */}
      <PageWrapper>
        <ReviewResponsePage submittedResponses={submittedResponses} />
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;

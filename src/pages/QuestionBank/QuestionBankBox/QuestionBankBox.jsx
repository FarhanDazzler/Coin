import React from 'react';

const QuestionBankBox = ({ title, description, children }) => {
  return (
    <div className="questionBankBoxWrapper">
      <h2 className="questionBankBoxTitle text-yellow">{title}</h2>
      <p>{description} </p>
      <div>{children}</div>
    </div>
  );
};

export default QuestionBankBox;

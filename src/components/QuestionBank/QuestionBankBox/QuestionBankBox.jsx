import React from 'react';
import Button from '../../UI/Button';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

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

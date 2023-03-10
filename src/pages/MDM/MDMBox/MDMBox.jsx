import React from 'react';
import Button from '../../../components/UI/Button';
import { MathGreater } from 'tabler-icons-react';
import { useLocation, useHistory } from 'react-router-dom';

const MDMBox = ({ title, description, url }) => {
  const location = useLocation();
  const history = useHistory();

  const handleClick = (url) => {
    history.push(url);
  };

  return (
    <div className="MDMInnerBoxWrapper" style={{ marginBottom: '10px' }}>
      <div>
        <h4 className="questionBankBoxTitle text-yellow">{title}</h4>
        <p>{description} </p>
      </div>
      <div>
        <Button
          variant="outlined"
          size="large"
          startIcon={<MathGreater size={30} strokeWidth={1.5} color={'#ffc800'} />}
          className="mr-4"
          onClick={() => handleClick(url)}
        />
      </div>
    </div>
  );
};

export default MDMBox;

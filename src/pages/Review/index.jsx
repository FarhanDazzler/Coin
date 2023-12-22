import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './review.scss';
import { useTranslation } from 'react-i18next';
import HomeTableModal from '../Home/V2/InternalControlHomePage/HomeTableModal';

const Review = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  console.log('statestate', state);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {Control_ID && <HomeTableModal isReview={true} activeData={state} />}
      </div>
    </div>
  );
};

export default Review;

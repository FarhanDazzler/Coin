import React from 'react';
import './style.scss';
import image from '../../../../../assets/images/page-not-found-table.svg';
const NoDataLetterPlaceholder = () => {
  return (
    <div className="noDataPlaceholderWrapper">
      <div className="d-flex align-items-center">
        <div className="placeholder-image">
          <img src={image} alt="no-data" />
        </div>
        <div className="info-text-wrapper">
          <h3 className="light-yellow-text">No Scheduled Letter</h3>
          <p className="mb-0">No scheduled Letter for the filtered criteria.</p>{' '}
          <p>Filter for different criteria or create a new survey.</p>
        </div>
      </div>
    </div>
  );
};

export default NoDataLetterPlaceholder;

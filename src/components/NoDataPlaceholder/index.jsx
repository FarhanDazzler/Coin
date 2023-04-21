import React from 'react';
import './styles.scss';
import image from '../../assets/images/page-not-found-table.svg';
const NoDataPlaceholder = () => {
  return (
    <div className="noDataPlaceholderWrapper">
      <div className="d-flex align-items-center">
        <div className="placeholder-image">
          <img src={image} alt="no-data" />
        </div>
        <div className="info-text-wrapper">
          <h3 className="light-yellow-text">No Scheduled Assessments</h3>
          <p className="mb-0">No scheduled assessments for the filtered criteria.</p>{' '}
          <p>Filter for different criteria or create a new survey.</p>
        </div>
      </div>
    </div>
  );
};

export default NoDataPlaceholder;

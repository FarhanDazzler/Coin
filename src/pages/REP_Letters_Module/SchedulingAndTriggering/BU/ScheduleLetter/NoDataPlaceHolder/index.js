import React from 'react';
import './style.scss';
import image from '../../../../../../assets/images/page-not-found-table.svg';
const NoRecordPlaceholder = () => {
  return (
    <div className="noDataPlaceholderWrapper">
      <div className="info-text-wrapper">
        <h3 className="light-yellow-text">No Record Found</h3>
      </div>
    </div>
  );
};

export default NoRecordPlaceholder;

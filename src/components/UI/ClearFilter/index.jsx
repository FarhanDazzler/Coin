import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { useHistory, useLocation } from 'react-router-dom';

const ClearFilter = ({ onClick, isClearButtonDisabled }) => {
  const history = useHistory();
  const location = useLocation();

  const clearFilters = () => {
    // Get the current URL without query parameters
    const urlWithoutQueryParams = window.location.pathname;

    // Navigate to the URL without query parameters
    history.replace(urlWithoutQueryParams);
    if (onClick) onClick();
    // window.location.reload();
  };

  return (
    <Button
      onClick={clearFilters}
      className={isClearButtonDisabled ? 'isClearButtonDisabledButton' : ''}
      style={{ minWidth: 150 }}
      disabled={isClearButtonDisabled}
      color={'neutral'}
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilter;

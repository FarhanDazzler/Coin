import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { useHistory, useLocation } from 'react-router-dom';

const ClearFilter = ({ onClick }) => {
  const history = useHistory();
  const location = useLocation();

  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if there are any query parameters in the URL
    const hasQueryParams = new URLSearchParams(location.search).toString() !== '';
    setIsClearButtonDisabled(!hasQueryParams);
  }, [location.search]);

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
      variant="contained"
      className={isClearButtonDisabled ? '' : ''}
      style={{ minWidth: 150 }}
      // disabled={isClearButtonDisabled}
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilter;

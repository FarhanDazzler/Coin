import { useHistory, useLocation } from 'react-router-dom';

export const useGoHomePage = () => {
  const history = useHistory();
  const location = useLocation();

  const handleHomePageRedirect = () => {
    // Get current query parameters
    const searchParams = new URLSearchParams(location.search);

    // Check for %filter% keyword in any of the query parameters
    let filterParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key.includes('filter')) {
        filterParams.append(key, value);
      }
    });

    // Redirect to home with preserved %filter% query parameters if any
    const url = filterParams.toString() ? `/?${filterParams.toString()}` : '/';
    history.push(url);
  };

  return { handleHomePageRedirect };
};

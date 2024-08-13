import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const queryObject = {};

  params.forEach((value, key) => {
    queryObject[key] = value;
  });

  return queryObject;
}

export function stringToArray(str) {
  return str
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

import { useSelector } from 'react-redux';
import { getBUScopeDataSelector } from '../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { useEffect, useMemo, useState } from 'react';

const useRepLetters = () => {
  const getBUScopeDataState = useSelector(getBUScopeDataSelector);

  const [cognosCodeList, setCognosCodeList] = useState('of Cognos Company Code');

  useEffect(() => {
    if (getBUScopeDataState?.data) {
      const entityString = getBUScopeDataState?.data?.Entity;
      if (entityString) {
        const entityObject = entityString ? JSON.parse(entityString?.replace(/'/g, '"')) : {};
        if (!!Object.keys(entityObject).length) {
          setCognosCodeList(Object.keys(entityObject).join(', '));
          return;
        }
      }
    }
    setCognosCodeList('of Cognos Company Code');
  }, [getBUScopeDataState?.data]);

  return { cognosCodeList };
};

export default useRepLetters;

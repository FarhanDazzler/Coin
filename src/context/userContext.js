import React, { useReducer, createContext } from 'react';

export const UserContext = createContext();

const initialState = {
  name: '., Leeza',
  email: 'leeza2@ab-inbev.com',
  role: 'admin',
  profile_photo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        name: action.payload?.name,
        email: action.payload?.email,
      };

    case 'SET_ID_TOKEN':
      return {
        ...state,
        id_token: action.payload,
      };

    case 'SET_PROFILE_PHOTO':
      return {
        ...state,
        profile_photo: action.payload,
      };

    default:
      console.log('Incorrect action type');
    //   throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={[state, dispatch]}>{props.children}</UserContext.Provider>;
};

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useSelector, useDispatch } from 'react-redux';
import { removeErrorNotificationAction } from '../redux/ErrorNotification/ErrorNotificationAction';

const ErrorNotification = () => {
  const dispatch = useDispatch();
  const ErrorNotificationState = useSelector((state) => state?.ErrorNotification?.errorNotification?.data);
  console.log("ErrorNotificationState", ErrorNotificationState);
  useEffect(() => {
    if(ErrorNotificationState?.data?.text){
        console.log("hi chuuuuuuuuu",ErrorNotificationState?.data?.text);
        toast.error(ErrorNotificationState?.data?.text, {autoClose: 4000, theme: "dark"});
        console.log("Hi")
    }
    if (ErrorNotificationState?.data?.type) {
        const myTimeout = setTimeout(() => {
          dispatch(removeErrorNotificationAction());
        }, 4000);
        return () => {
          clearTimeout(myTimeout);
        };
      }
  }, [ErrorNotificationState]);

  //toaster-styling-method//
  injectStyle();
  //toaster-styling-method//
  return (
    <>
      {/* <ToastContainer autoClose={3000}/> */}
    </>
  );
};

export default ErrorNotification;

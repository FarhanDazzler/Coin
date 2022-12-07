import React, { useEffect, useRef } from 'react';
import moment from 'moment';

export function getNumberWithOrdinal(n) {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export function formatTime(val) {
  // console.log(val);
  var time = new Date(`12-31-9999, ${val}`);
  return moment(val, 'HH:mm:ss').format('hh:mm A');
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  //remember the last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay != null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
}

export function getGreeting() {
  let currentTime = moment();

  let greeting = null;

  if (currentTime.hour() < 12) greeting = 'Good Morning';
  else if (currentTime.hour() < 18) greeting = 'Good Afternoon';
  else if (currentTime.hour() < 21) greeting = 'Good Evening';
  else greeting = 'Good Night';

  return greeting;
}

export const isEmployeeContractor = (global_id) => {
  if (global_id) return global_id.includes('C');
  else return false;
};

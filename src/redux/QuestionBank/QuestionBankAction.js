import {
    ACTION_GET_SECTION1_QUESTIONS_DATA,
    ACTION_GET_SECTION1_OPTIONS_DATA,
    ACTION_ADD_SECTION1_OPTIONS_DATA,
    ACTION_ADD_SECTION1_QUESTIONS_DATA,
    ACTION_EDIT_SECTION1_OPTIONS_DATA,
    ACTION_EDIT_SECTION1_QUESTIONS_DATA,
    ACTION_DELETE_SECTION1_QUESTIONS_DATA,
    ACTION_DELETE_SECTION1_OPTIONS_DATA,
   } from '../types';
   
   export function getSection1QuestionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_GET_SECTION1_QUESTIONS_DATA,
       payload: payload,
     };
   }

   export function getSection1OptionsDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_GET_SECTION1_OPTIONS_DATA,
       payload: payload,
     };
   }

   export function addSection1QuestionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_ADD_SECTION1_QUESTIONS_DATA,
       payload: payload,
     };
   }

   export function addSection1OptionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_ADD_SECTION1_OPTIONS_DATA,
       payload: payload,
     };
   }

   export function editSection1QuestionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_EDIT_SECTION1_QUESTIONS_DATA,
       payload: payload,
     };
   }

   export function editSection1OptionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_EDIT_SECTION1_OPTIONS_DATA,
       payload: payload,
     };
   }

   export function deleteSection1QuestionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_DELETE_SECTION1_QUESTIONS_DATA,
       payload: payload,
     };
   }

   export function deleteSection1OptionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_DELETE_SECTION1_OPTIONS_DATA,
       payload: payload,
     };
   }
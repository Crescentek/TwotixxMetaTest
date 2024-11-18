export const upperCaseReg = /[A-Z]/;
export const lowerCaseReg = /[a-z]/;
export const numberReg = /\d/;
export const symbolReg = /[!@#$%^&*£€¥()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;
export const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w\w+)+$/;
export const characterReg = /^[A-Za-z']{1,}([- ]?[A-Za-z'’]{1,}){0,2}\s*$/;
export const mobileNumberReg = /^[0-9]{6,15}$/;

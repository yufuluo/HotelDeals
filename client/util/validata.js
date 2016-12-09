import validator from "validator";

export const validateEmail = (e) => {
  e.preventDefault();
  if (!validator.isEmail(e.target.value) || !e.target.value) {
    e.target.classList.add("invalid_input");
  } else {
    e.target.classList.remove("invalid_input");
  }
};

export const validateEmpty = (e) => {
  e.preventDefault();
  if (!e.target.value) {
    e.target.classList.add("invalid_input");
  } else {
    e.target.classList.remove("invalid_input");
  }
};

export const validateName = (e) => {
  e.preventDefault();
  if (!validator.isAlpha(e.target.value) || !e.target.value) {
    e.target.classList.add("invalid_input");
  } else {
    e.target.classList.remove("invalid_input");
  }
};

export const validatePrice = (e) => {
  e.preventDefault();
  if (!validator.isNumeric(e.target.value) || !e.target.value) {
    e.target.classList.add("invalid_input");
  } else {
    e.target.classList.remove("invalid_input");
  }
};

export const validateURL = (e) => {
  e.preventDefault();
  if (!validator.isURL(e.target.value) || !e.target.value) {
    e.target.classList.add("invalid_input");
  } else {
    e.target.classList.remove("invalid_input");
  }
};

export default {
  validateEmail,
  validateEmpty,
  validateName,
  validatePrice,
  validateURL
};
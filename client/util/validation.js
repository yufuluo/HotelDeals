import validator from "validator";

const v = {

  errors: {},

  isEmail: (e) => {
    e.preventDefault();
    if (!validator.isEmail(e.target.value) || !e.target.value) {
      e.target.classList.add("invalid_input");
      v.errors.email = "Email is invalid.";
    } else {
      e.target.classList.remove("invalid_input");
      delete v.errors.email;
    }
  },

  isName: (e) => {
    e.preventDefault();
    if (!validator.isAlpha(e.target.value) || !e.target.value) {
      e.target.classList.add("invalid_input");
      v.errors.name = "Name is invalid.";
    } else {
      e.target.classList.remove("invalid_input");
      delete v.errors.name;
    }
  },

  isPrice: (e) => {
    e.preventDefault();
    if (!validator.isNumeric(e.target.value) || !e.target.value) {
      e.target.classList.add("invalid_input");
      v.errors.price = "Price is invalid.";
    } else {
      e.target.classList.remove("invalid_input");
      delete v.errors.price;
    }
  }

};

export default v;

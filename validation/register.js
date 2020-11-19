const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let phoneNumberStr = data.phoneNumber.toString();

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  phoneNumberStr = !isEmpty(phoneNumberStr) ? phoneNumberStr : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, 6, 24 )) {
    errors.password = "Password must be between 6 and 24 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // phoneNumber checks
  if (Validator.isEmpty(phoneNumberStr)) {
    errors.phoneNumber = "Phone Number field is required";
  }
  
  if (phoneNumberStr.length !== 10) {
    errors.phoneNumber = "Phone Number is invalid";
  }

  if (phoneNumberStr.charAt(1) !== '5' && phoneNumberStr.charAt(1) !== '6' && phoneNumberStr.charAt(1) !== '7') {
    console.log(phoneNumberStr.charAt(1))
    errors.phoneNumber = "Phone Number must start with 05/06/07"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

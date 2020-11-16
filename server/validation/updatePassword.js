const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdatePassword(data) {
    let errors = {};
  
    // Convert empty fields to an empty string so we can use validator functions
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  
    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    // Password checks
    if (Validator.isEmpty(data.oldPassword)) {
      errors.password = "Old Password field is required";
    }
  
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
  
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  
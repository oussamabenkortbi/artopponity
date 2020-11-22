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
      errors.password = "mot de pass est obligatoire";
    }
    // Password checks
    if (Validator.isEmpty(data.oldPassword)) {
      errors.password = "Ancien mot de pass est obligatoire";
    }
  
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "il faut confirmer votre mot de pass";
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 24 })) {
      errors.password = "Le mot de passe doit comprendre entre 6 et 24 caractères";
    }
  
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Les mots de passe doivent correspondre";
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  
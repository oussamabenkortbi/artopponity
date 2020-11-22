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
    errors.email = "Le champ Email est obligatoire";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email est invalide";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champ mot de pass est obligatoire";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmation du mot de pass est obligatoire";
  }

  if (!Validator.isLength(data.password, 6, 24 )) {
    errors.password = "Le mot de passe doit comprendre entre 6 et 24 caractères";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passe doivent correspondre";
  }

  // phoneNumber checks
  if (Validator.isEmpty(phoneNumberStr)) {
    errors.phoneNumber = "Le champ Numéro de téléphone est obligatoire";
  }
  
  if (phoneNumberStr.length !== 10) {
    errors.phoneNumber = "Numéro de téléphone est invalide";
  }

  if (phoneNumberStr.charAt(1) !== '5' && phoneNumberStr.charAt(1) !== '6' && phoneNumberStr.charAt(1) !== '7') {
    errors.phoneNumber = "Numéro de téléphone doit commencer par 05/06/07"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

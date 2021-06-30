function passwordValidation(password){
  if (password.length < 8){
    return 'A senha deve conter ao mínimo 8 caracteres.'
  } else if (!password.match(/[a-zA-Z]/)){
    return 'A senha deve conter ao mínimo uma letra.'
  } else if (!password.match(/[0-9]+/)){
    return 'A senha deve conter ao mínimo um número.'
  } else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)){
    return 'A senha deve conter ao mínimo um caractere especial: !@#$%^&*(),.?":{}|<>].'
  } else {
    return true
  }
}

module.exports = { passwordValidation }
const FIELDS = {
  LOGIN: ['cnpj', 'cpf'],
  PASSWORD: 'senha',
  USER_TYPE: 'type',
  USER_DICT: ['Associado', 'Motoboy']
}

const MSG = {
  SENHA_FALTANTE: {msg: 'Por favor, verifique se a senha encontra-se preenchida na solicitação.'},
  FALHA_AUTENTICACAO: {msg:'Usuario e/ou senha inválidos.'},
  SUCESSO_AUTENTICACAO: {msg:'O usuario foi autenticado com sucesso.'},
  TIPO_ERRADO: {msg:'O campo de login está preenchido de forma inconsistente ou não está presente. Por favor, revise e tente novamente.'},
}

module.exports = {
  FIELDS,
  MSG
}
const FIELDS = {
  LOGIN: ['cnpj', 'cpf'],
  PASSWORD: 'senha',
  USER_DICT: ['Associado', 'LoginMotoboy']
}

const DICT = {
  ASSOCIADO: 0,
  MOTOBOY: 1,
}

const MSG = {
  SENHA_FALTANTE: 'Por favor, verifique se a senha encontra-se preenchida na solicitação.',
  FALHA_AUTENTICACAO: 'Usuario e/ou senha inválidos.',
  SUCESSO_AUTENTICACAO: 'O usuario foi autenticado com sucesso.',
  TIPO_ERRADO: 'O campo de login está preenchido de forma inconsistente ou não está presente. Por favor, revise e tente novamente.',
  TOKEN_INVALIDO: 'O token de autenticação enviado expirou ou não é válido.',
  TOKEN_AUSENTE: 'Para esse tipo de requisição é necessário um token de autenticação.',
  SEM_PERMISSAO: 'Você não tem permissão para executar essa requisição.'
}

module.exports = {
  FIELDS,
  MSG,
  DICT
}
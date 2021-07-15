const {string2hash} = require('../utils/string2hash')
const passwordValidation = require('../utils/passwordValidation')

const Motoboy = require('../models/Motoboy')
const LoginMotoboy = require('../models/LoginMotoboy')

module.exports = {  

  async newMotoboy(req, res) {
    const { nome, cpf, senha, telefone } = req.body
    var login

    if (!nome || !cpf || !senha || !telefone) {
      res.status(400).json({msg: 'Dados obrigatórios não preenchidos.'})
    }

    const errPassword = passwordValidation(senha) 
    if (errPassword) {
      res.status(403).json({msg: errPassword})
    }

    const isMotoboy = await Motoboy.findOne({
      where: {
        cpf: cpf,
        associado: req.user.id
      }
    })

    // Busca login de motoboy. Se não existe, cria um
    const isLoginMotoboy = await LoginMotoboy.findOne({
      where: {
        cpf: cpf
      }
    })

    if (isLoginMotoboy) {
      login = isLoginMotoboy.id
    }
    else {
      const novologin = await LoginMotoboy.create( {
        cpf,
        senha: string2hash(senha)
      }).catch((error) => {
        res.status(500).json({msg: 'Não foi possível adicionar Login de Motoboy.', error})
      })
      login = novologin.id
    }


    if (!isMotoboy && login) {
      const motoboy = await Motoboy.create({
        nome,
        cpf,        
        telefone,
        login: login,
        associado : req.user.id
      }).catch((error) => {
        res.status(500).json({msg: 'Não foi possível adicionar Motoboy.', error})
      })

      if (motoboy){
        res.status(201).json({msg: 'Motoboy adicionado.'})
      } else { 
        res.status(404).json({msg: 'Houve algum erro ao adicionar Motoboy.'})
      }
    } else {
      res.status(403).json({msg: 'Já existe Motoboy com esse CPF.'})
    }
  }, 

  async listMotoboys(req, res) {
    const Motoboys = await Motoboy.findAll({
      where: {
        associado: req.user.id
      },
      order: [['nome', 'ASC']],
    })
    if (Motoboys) {
      res.status(200).json({msg: 'OK', Motoboys})
    }
  },

  async searchMotoboyByCPF(req, res) {
    const busca = req.body  

    if (!busca.cpf) {res.status(400).json({msg: 'Não foi informado CNPJ'})}

    const Motoboy = await Motoboy.findOne({
      where: {
        cpf: busca.cpf,
        associado: req.user.id
      }      
    })

    if (Motoboy) {
      res.status(200).json({msg: 'OK', Motoboy})
    }
    else {
      res.status(404).json({msg: 'Não foi encontrado Motoboy com CPF '+ busca.cpf})
    }
  },

  async updateMotoboy(req, res) {
    const { nome, cpf, telefone } = req.body
    var novonome, novocpf, novotel
    
    const idBusca = req.params.id
     
    const atual = await Motoboy.findOne({
      where: {
        id: idBusca,
        associado: req.user.id
      }
    })    
    
    if (atual === null) {
      res.status(404).json({msg: 'Não foi encontrado Motoboy com esse ID'})
      
    }
    else {
      novonome = (nome) ? nome : atual.nome
      novocpf = (cpf) ? cpf : atual.cpf
      novotel = (telefone) ? telefone : atual.telefone
    }
        
    // Busca Motoboy com CPF igual ao informado e que
    // não seja o atual
    const { Op } = require('sequelize')
    const isMotoboy = await Motoboy.findOne({
      where: {
        cpf: novocpf,
        associado: req.user.id,
        id: {[Op.ne]: idBusca}
      }
    })         
    
    if (!isMotoboy) {
      const motoboy = await Motoboy.update(
        {
          nome : novonome,
          cpf : novocpf,
          telefone: novotel,          
        },
        {
          where: {
            id: idBusca,
            associado: req.user.id
          }
        }
      ).catch((error) => {
        res.status(500).json({msg: 'Erro na alteração.', error})
      })

      if (motoboy){
        res.status(201).json({msg: 'Motoboy alterado.'})
      } else {
        res.status(404).json({msg: 'Houve algum erro ao alterar Motoboy.'})
      }
    } else {
      res.status(403).json({msg: 'Já existe outro Motoboy com esse CPF.'})
    }
  }, 

  async deleteMotoboy(req, res) {    
    const idBusca = req.params.id

    // Pega os dados atuais
    const existente = await Motoboy.findOne({
      where: {
        id:idBusca,
        associado: req.user.id
      }
    })

    // Apaga registro da tabela Motoboy
    if (existente) {
      const deletado = await Motoboy.destroy({
        where: {
          id:idBusca,
          associado: req.user.id
        }
      })    

      // Se o motoboy não está vinculado a outro associado,
      // Exclui também o registro da tabela LoginMotoboy
      const vinculo = await Motoboy.fineOne({
        where: {
          cpf: existente.cpf
        }
      })

      if (!vinculo) {
        await LoginMotoboy.destroy({
          where: {
            cpf: existente.cpf
          }
        })
      }
    
      if (deletado > 0) {
        res.status(200).json({msg: 'Motoboy excluido com sucesso.'})
      } else {
        res.status(404).json({msg: 'Motoboy não excluído.'})
      }
    }
    else {
      res.status(404).json({msg: 'Motoboy não encontrado.'})
    }
  }
}
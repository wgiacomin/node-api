const {string2hash} = require('../utils/string2hash')
const passwordValidation = require('../utils/passwordValidation')

const Motoboy = require('../models/Motoboy')

module.exports = {  

  async newMotoboy(req, res) {
    const { nome, cpf, senha, telefone } = req.body
    
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

    if (!isMotoboy) {
      const motoboy = await Motoboy.create({
        nome,
        cpf,        
        telefone,
        senha: string2hash(senha),
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
    const { nome, cpf, telefone, senha } = req.body
    var novonome, novocpf, novotel, novasenha
    
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

    // Se foi definida nova senha, faz a validação
    if (senha) {
      const errPassword = passwordValidation(senha)
      if (errPassword) {
        res.status(403).json({msg: errPassword})
      }
      else {
        novasenha = string2hash(senha)
      }
    }
    else {
      novasenha = atual.senha
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
        
    console.log(isMotoboy)
    if (!isMotoboy) {
      const motoboy = await Motoboy.update(
        {
          nome : novonome,
          cpf : novocpf,
          telefone: novotel,
          senha: novasenha
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

    const deletado = await Motoboy.destroy({
      where: {
        id:idBusca,
        associado: req.user.id
      }
    })
    
    if (deletado > 0) {
      res.status(200).json({msg: 'Motoboy excluido com sucesso.'})
    } else {
      res.status(404).json({msg: 'Motoboy não encontrado.'})
    }

  }
}

const Cliente = require('../models/Cliente')


module.exports = {  

  async newCliente(req, res) {
    const { nome, cnpj, endereco } = req.body

    if (!nome || !cnpj) {
      res.status(400).json({msg: 'Dados obrigatórios não preenchidos.'})
    }

    const isCliente = await Cliente.findOne({
      where: {
        cnpj: cnpj,
        associado: req.user.id
      }
    })

    if (!isCliente) {
      const associado = await Cliente.create({
        nome,
        cnpj,        
        endereco,
        associado : req.user.id
      }).catch((error) => {
        res.status(500).json({msg: 'Não foi possível adicionar cliente.', error})
      })

      if (associado){
        res.status(201).json({msg: 'Cliente adicionado.'})
      } else { 
        res.status(404).json({msg: 'Houve algum erro ao adicionar cliente.'})
      }
    } else {
      res.status(403).json({msg: 'Já existe cliente com esse CNPJ.'})
    }
  }, 

  async listClientes(req, res) {
    const clientes = await Cliente.findAll({
      where: {
        associado: req.user.id
      },
      order: [['nome', 'ASC']],
    })
    if (clientes) {
      res.status(200).json({msg: 'OK', clientes})
    }
  },

  async searchClienteByCNPJ(req, res) {
    const busca = req.body  

    if (!busca.cnpj) {res.status(400).json({msg: 'Não foi informado CNPJ'})}

    const cliente = await Cliente.findOne({
      where: {
        cnpj: busca.cnpj,
        associado: req.user.id
      }      
    })

    if (cliente) {
      res.status(200).json({msg: 'OK', cliente})
    }
    else {
      res.status(404).json({msg: 'Não foi encontrado cliente com CNPJ '+ busca.cnpj})
    }
  },

  async updateCliente(req, res) {
    const { nome, cnpj, endereco } = req.body
    var novonome, novocnpj, novoend
    
    const idBusca = req.params.id
          
 
    const atual = await Cliente.findOne({
      where: {
        id: idBusca,
        associado: req.user.id
      }
    })
    
    
    if (atual === null) {
      res.status(404).json({msg: 'Não foi encontrado cliente com esse ID'})
      
    }
    else {
      novonome = (nome) ? nome : atual.nome
      novocnpj = (cnpj) ? cnpj : atual.cnpj
      novoend = (endereco) ? endereco : atual.endereco
    }

    
    // Busca cliente com CNPJ igual ao informado e que
    // não seja o atual
    const { Op } = require('sequelize')
    const isCliente = await Cliente.findOne({
      where: {
        cnpj: cnpj,
        associado: req.user.id,
        id: {[Op.ne]: idBusca}
      }
    }) 
        
    if (!isCliente) {
      const cliente = await Cliente.update(
        {
          nome : novonome,
          cnpj : novocnpj,
          endereco: novoend
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

      if (cliente){
        res.status(201).json({msg: 'Cliente alterado.'})
      } else {
        res.status(404).json({msg: 'Houve algum erro ao alterar cliente.'})
      }
    } else {
      res.status(403).json({msg: 'Já existe outro cliente com esse CNPJ.'})
    }
  }, 

  async deleteCliente(req, res) {    
    const idBusca = req.params.id

    const deletado = await Cliente.destroy({
      where: {
        id:idBusca,
        associado: req.user.id
      }
    })
    
    if (deletado > 0) {
      res.status(200).json({msg: 'Cliente excluido com sucesso.'})
    } else {
      res.status(404).json({msg: 'Cliente não encontrado.'})
    }

  }
}
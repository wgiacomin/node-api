const Associado = require('../models/Associado')
const Cliente = require('../models/Cliente')
const Motoboy = require('../models/Motoboy')
const Entrega = require('../models/Entrega')
const Sequelize = require('sequelize')

module.exports = {  

  async newEntrega(req, res) {
    const { motoboy, cliente, valor, descricao } = req.body
    
    if (!motoboy || !cliente || !valor) {
      res.status(400).json({msg: 'Dados obrigatórios não preenchidos.'})
    }

    const idassociado = req.user.id

    const isCliente = await Cliente.findOne( {
      where: {
        id: cliente,
        associado: idassociado  
      } 
    })
    if (!isCliente) {
      res.status(404).json({msg: 'Cliente ID '+cliente+' não encontrado'})
    }

    const isMotoboy = await Motoboy.findOne( {
      where: {
        id: motoboy,
        associado: idassociado  
      } 
    })
    if (!isMotoboy) {
      res.status(404).json({msg: 'Motoboy ID '+motoboy+' não encontrado'})
    }

    if (idassociado && isCliente && isMotoboy) {

      const entrega = await Entrega.create({
        associado: idassociado,
        motoboy,
        cliente,
        valor,
        descricao,
        status: 'Pendente'
      }).catch((error) => {
        res.status(500).json({msg: 'Não foi possível adicionar entrega.', error})
      })

      if (entrega){
        res.status(201).json({msg: 'Entrega adicionada. ID '+entrega.id})
      } else { 
        res.status(404).json({msg: 'Houve algum erro ao adicionar entrega.'})
      }
    } else {
      res.status(403).json({msg: 'Usuário associado não logado.'})
    }
  }, 

  async listEntregaByAssociado(req, res) {

    const idassociado = req.user.id
    const tipo = req.params.type
    var entregas = null

    
    if (tipo == 'pending') {
      entregas = await Entrega.findAll({
        where: {
          associado: idassociado,
          status: 'Pendente'
        }
      })
    }
    else if (tipo == 'done') {
      entregas = await Entrega.findAll({
        where: {
          associado: idassociado,
          status: 'Finalizado'
        }
      })
    }
    else if (tipo == 'all') {
      entregas = await Entrega.findAll({
        where: {
          associado: idassociado
        }
      })
    }

    if (entregas != null) {
      res.status(200).json({msg: 'OK', entregas})
    }
    else {
      res.status(204).json({msg: 'Sem entregas cadastradas'})
    }
  },

  async listEntregaByMotoboy(req, res) {

    const idMotoboy = req.user.id
    const tipo = req.params.type
    var entregas = null

    // Pega lista de IDs do motoboy logado
    const listamoto = await Motoboy.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        login: idMotoboy
      }      
    })    
    var ids = ''
    for (var key in listamoto) {
      ids += listamoto[key].id+','
    }    

    const Op = Sequelize.Op
    if (tipo == 'pending') {      
      entregas = await Entrega.findAll({

        where: {
          motoboy: {
            [Op.in]: [ids]
          },
          status: 'Pendente'
        }
      })
    }
    else if (tipo == 'done') {
      entregas = await Entrega.findAll({
        where: {
          motoboy: {
            [Op.in]: [ids]
          },
          status: 'Finalizado'
        }
      })
    }
    else if (tipo == 'all') {
      entregas = await Entrega.findAll({
        where: {
          motoboy: {
            [Op.in]: [ids]
          },
        }
      })
    }

    if (entregas != null) {
      res.status(200).json({msg: 'OK', entregas})
    }
    else {
      res.status(204).json({msg: 'Sem entregas cadastradas'})
    }
  },


  async updateEntrega(req, res) {
    const { valor, status } = req.body
    
    var novovalor, novostatus

    const idBusca = req.params.id
    const idMotoboy = req.user.id
    
    // Pega lista de IDs do motoboy logado
    const listamoto = await Motoboy.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        login: idMotoboy
      }      
    })    
    var ids = ''
    for (var key in listamoto) {
      ids += listamoto[key].id+','
    }
 
    const Op = Sequelize.Op
    const atual = await Entrega.findOne({
      where: {
        id: idBusca,
        motoboy: {
          [Op.in]: [ids]
        },
      }
    })
    
    // Busca dados da entrega. Se encontrar, atualiza
    if (atual === null) {
      res.status(404).json({msg: 'Não foi encontrada entrega com esse ID'})      
    }
    else if (atual.status == 'Pendente') {
      novovalor = (valor) ? valor : atual.valor
      novostatus = (status) ? status : atual.status
      
      
      const entrega = await Entrega.update(
        {
          valor : novovalor,
          status : novostatus,
        },
        {
          where: {
            id: idBusca,
            motoboy: {
              [Op.in]: [ids]
            },
          }
        }
      ).catch((error) => {
        res.status(500).json({msg: 'Erro na alteração.', error})
      })

      if (entrega){
        res.status(201).json({msg: 'Entrega alterada.'})
      } else {
        res.status(404).json({msg: 'Houve algum erro ao alterar entrega.'})
      }
    }
    else {
      res.status(403).json({msg: 'Essa entrega não está na situação Pendente.'})
    }  
    
  }, 

  async deleteEntrega(req, res) {    
    const idBusca = req.params.id
    const idAssociado = req.user.id

    const deletado = await Entrega.destroy({
      where: {
        id:idBusca,
        associado: idAssociado,
        status: 'Pendente'
      }
    })
    
    if (deletado > 0) {
      res.status(200).json({msg: 'Entrega excluída com sucesso.'})
    } else {
      const atual = await Entrega.findOne({
        where: {
          id:idBusca,
          associado: idAssociado,
        }
      })
      if (atual && (atual.status != 'Pendente')) {
        res.status(404).json({msg: 'A entrega não está com status Pendente.'})
      }
      else {
        res.status(404).json({msg: 'Entrega não encontrada.'})
      }
    }
  },


 
}
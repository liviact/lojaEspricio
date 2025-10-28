const { pedidoModel } = require("../models/pedidoModel");
const { clienteModel } = require("../models/clienteModel");
const { produtoModel } = require("../models/produtoModel");


const pedidoController = {
  /**
   * controlador que lista todos os pedidos do banco de dados
   *
   * @async
   * @function listarPedidos
   * @param {object} req - objeto da requisição (recebido do cliente HTTP)
   * @param {object} res - objeto da resposta (enviado ao cliente HTTP)
   * @returns {promise<Void>} Retorna uma resposta JSON com a lista de pedidos.
   * @throws mostra no console e retorna erro 500 se ocorrer falha ao buscar pedidos.
   */
  listarPedidos: async (req, res) => {
    try {
      const pedidos = await pedidoModel.buscarTodos();

      res.status(200).json(pedidos);
    } catch (error) {
      console.error("erro ao listar pedidos:", error);
      res
        .status(500)
        .json({ erro: "erro interno no servidor ao listar pedidos!" });
    }
  },
  criarPedido: async (req, res) => {
    try {
      const { idCliente, dataPedido, statusPagamento, itens } = req.body;

      if (
        idCliente == undefined ||
        dataPedido == undefined ||
        statusPagamento == undefined ||
        itens.length < 1
      ) {
        return res
          .status(400)
          .json({ erro: "campos obrigatórios não preenchidos!" });
      }

      if (idCliente.length != 36) {
        return res.status(400).json({ erro: "id do cliente inválido!" });
      }

      const cliente = await clienteModel.buscarUm(idCliente);

      if (!cliente || cliente.length != 1) {
        return res.status(404).json({ errp: "cliente não encontrado!" });
      }

      for (const item of itens) {
        const { idProduto, qtdItem } = item;
        if (idProduto == undefined || qtdItem == undefined) {
          return res
            .status(400)
            .json({ err0: "campos obrigatórios não preenchidos! " });
        }
        if (idProduto.length != 36) {
          return res.status(400).json({ erro: "id do produto inválido!" });

        } 
        const produto = await produtoModel.buscarUm(idProduto);
        
        if (!produto || produto.length != 1){
            return res.status(404).json ({ erro: "produto não encontrado!"});
            
        }
      } 
      await pedidoModel.inserirPedido(idCliente, dataPedido, statusPagamento, {itens} );

       res.status(201).json({message: "pedido cadastrado com  sucesso!"});

    } catch (error) {
      console.error("erro ao cadastrar pedido:", error);
      res
        .status(500)
        .json({ erro: "erro interno no servidor ao cadastrar pedido!" });
    }
  },
};

module.exports = { pedidoController };

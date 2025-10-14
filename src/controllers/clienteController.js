const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  //-------------------
  //LISTAR TODOS OS CLIENTES
  // GET /clientes
  //-------------------

  listarClientes: async (req, res) => {
    try {
      const clientes = await clienteModel.buscarTodos();

      res.status(200).json(clientes);
    } catch (error) {
      console.error("err ao listar clientes:", error);
      res.status(500).json({ message: "erro ao buscar clientes." });
    }
  },

  //-------------------
  //CRIAR UM NOVO PRODUTO
  // POST /produtos
  /* 
        {
             "nomeProduto": "valor"
              "precoProduto": 0.00
        }
      */
  //-------------------

  criarCliente: async (req, res) => {
    try {
      const { nomeCliente, cpfCliente } = req.body;

      if (nomeCliente == undefined || cpfCliente == undefined) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatórios não preenchidos!" });
      }

      const clientes = await clienteModel.buscarPorCPF(cpfCliente);

      if (clientes.length > 0) {
        return res
          .status(409)
          .json({ erro: "CPF já cadastrado!" });
      }

      await clienteModel.inserirCliente(nomeCliente, cpfCliente);

      res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
    } catch (error) {
      console.error("erro ao cadastrar cliente:", error);
      res.status(500).json({ erro: "Erro no servidor ao cadastrar cliente!" });
    }
  },
};

module.exports = { clienteController };

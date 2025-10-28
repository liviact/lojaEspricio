const { getConnection } = require("../config/db");
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
buscarUm: async (idCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = `SELECT * FROM clientes WHERE idCliente = @idClientes`;

      const result = await pool
        .request()
        .input(`idClientes`, sql.UniqueIdentifier, idCliente)
        .query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error(`Erro ao buscar o cliente:`, error);
      throw error;
    }
  },
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
  atualizarCliente: async (req, res) => {
    try {
      const { cpfCliente } = req.params;
      const { nomeCliente } = req.body;

      if (cpfCliente.length !== 11) {
        return res.status(400).json({ erro: "cpf inválido!" });
      }

      const cliente = await clienteModel.buscarPorCPF(cpfCliente);

      if (!cliente || cliente.length !== 1) {
        return res.status(404).json({ erro: "cliente não encontrado!" });
      }
      const clienteAtual = cliente[0];

      const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;
      const cpfAtualizado = cpfCliente ?? clienteAtual.cpfCliente;

      await clienteModel.atualizarCliente(
        nomeAtualizado,
        cpfAtualizado
      );
      res.status(200).json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro no servidor ao atualizar cliente." });
    }
  },
  deletarCliente: async (req, res) => {
    try {
      const { cpfCliente } = req.params;

      if (cpfCliente.length !== 11) {
        return res.status(400).json({ erro: "cpf inválido!" });
      }
      
      const cliente = await clienteModel.buscarPorCPF(cpfCliente);
      
      if (!cliente || cliente.length !== 1) {
        return res.status(404).json({ erro: "cliente não encontrado!" });
      }
      // const produtoAtual = produto[0];
      
      // const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
      // const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;
      console.log(cpfCliente);

      await clienteModel.deletarCliente(cpfCliente);
      res.status(200).json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro no servidor ao excluir o cliente." });
    }
  },
};

module.exports = { clienteController };

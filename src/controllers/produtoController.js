const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  //-------------------
  //LISTAR TODOS OS PRODUTOS
  // GET /produtos
  //-------------------

  listarProdutos: async (req, res) => {
    try {
      const { idProduto } = req.query;
      if (idProduto) {
        if (idProduto.length !== 36) {
          return res.status(400).json({ erro: "id do produto inválido!" });
        }

        const produto = await produtoModel.buscarUm(idProduto);
        return res.status(200).json(produto);
      }
      const produtos = await produtoModel.buscarTodos();

      res.status(200).json(produtos);
    } catch (error) {
      console.error("erro ao listar produtos:", error);
      res.status(500).json({ message: "erro ao buscar produtos." });
    }
  },
  deletarProduto: async (req, res) => {
    try {
      const { idProduto } = req.params;

      if (idProduto.length !== 36) {
        return res.status(400).json({ erro: "id do produto inválido!" });
      }

      const produto = await produtoModel.buscarUm(idProduto);

      if (!produto || produto.length !== 1) {
        return res.status(404).json({ erro: "produto não encontrado!" });
      }
      // const produtoAtual = produto[0];

      // const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
      // const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

      await produtoModel.deletarProduto(idProduto);
      res.status(200).json({ message: "Produto excluído com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro no servidor ao excluir o produto." });
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

  criarProduto: async (req, res) => {
    try {
      const { nomeProduto, precoProduto } = req.body;

      if (
        nomeProduto == undefined ||
        precoProduto == undefined ||
        isNaN(precoProduto)
      ) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatórios não preenchidos!" });
      }

      await produtoModel.inserirProduto(nomeProduto, precoProduto);

      res.status(201).json({ message: "Produto cadastrado com sucesso!" });
    } catch (error) {
      console.error("erro ao cadastrar produto:", error);
      res.status(500).json({ erro: "Erro no servidor ao cadastrar produto!" });
    }
  },

  //-------------------
  //ATUALIZAR UM PRODUTO
  // PUT /produtos/idProduto
  //nomeProduto e precoProduto são opcionais
  /* 
        {
             "nomeProduto": "valor"
              "precoProduto": 0.00
        }
      */
  //-------------------

  atualizarProduto: async (req, res) => {
    try {
      const { idProduto } = req.params;
      const { nomeProduto, precoProduto } = req.body;

      if (idProduto.length !== 36) {
        return res.status(400).json({ erro: "id do produto inválido!" });
      }

      const produto = await produtoModel.buscarUm(idProduto);

      if (!produto || produto.length !== 1) {
        return res.status(404).json({ erro: "produto não encontrado!" });
      }
      const produtoAtual = produto[0];

      const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
      const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

      await produtoModel.atualizarProduto(
        idProduto,
        nomeAtualizado,
        precoAtualizado
      );
      res.status(200).json({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro no servidor ao atualizar produto." });
    }
  },
  deletarProduto: async (req, res) => {
    try {
      const { idProduto } = req.params;

      if (idProduto.length !== 36) {
        return res.status(400).json({ erro: "id do produto inválido!" });
      }

      const produto = await produtoModel.buscarUm(idProduto);

      if (!produto || produto.length !== 1) {
        return res.status(404).json({ erro: "produto não encontrado!" });
      }
      // const produtoAtual = produto[0];

      // const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
      // const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

      await produtoModel.deletarProduto(idProduto);
      res.status(200).json({ message: "Produto excluído com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro no servidor ao excluir o produto." });
    }
  },
};

module.exports = { produtoController };

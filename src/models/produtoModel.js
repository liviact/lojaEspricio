const { sql, getConnection } = require("../config/db");

const produtoModel = {
  /**
   * Busca todos os pedidos e seus respectivos itens no banco de dados.
   * 
   * @async
   * @function buscarTodos
   * @returns {Promise<Array>} Retorna uma lista com todos os pedidos e seus itens.
   * @throws mostra o erro e propaga o erro caso a busca falhe.
   */
  buscarTodos: async () => {
    try {
      const pool = await getConnection(); // cria conexão com o db

      let sql = "SELECT * FROM produtos";

      const result = await pool.request().query(sql);

      return result.recordset;
    } catch (error) {
      console.error("erro ao buscar produtos:", error);
      throw error; //passa o erro para o controller tratar
    }
  },

  buscarUm: async (idProduto) => {
    try {
      const pool = await getConnection();

      const querySQL = "SELECT * FROM Produtos WHERE IdProduto = @idProduto";

      const result = await pool
        .request()
        .input("idProduto", sql.UniqueIdentifier, idProduto)
        .query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
      throw error;
    }
  },

  inserirProduto: async (nomeProduto, precoProduto) => {
    try {
      const pool = await getConnection();
      let querySQL =
        "INSERT INTO Produtos(nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)";

      await pool
        .request()
        .input("nomeProduto", sql.VarChar(100), nomeProduto)
        .input("precoProduto", sql.Decimal(10, 2), precoProduto)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao inserir produto:", error);
      throw error; //passa o erro para o controller tratar
    }
  },
  atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
    try {
      const pool = await getConnection();
      const querySQL = `
      UPDATE produtos
      SET nomeProduto = @nomeProduto,
      precoProduto = @precoProduto
      WHERE idProduto = @idproduto
      `;
      await pool
        .request()
        .input("idProduto", sql.UniqueIdentifier, idProduto)
        .input("nomeProduto", sql.VarChar(100), nomeProduto)
        .input("precoProduto", sql.Decimal(10, 2), precoProduto)
        .query(querySQL);
    } catch (error) {}
  },
  deletarProduto: async (idProduto) => {
    try {
      const pool = await getConnection();

      const querySQL = "DELETE FROM Produtos WHERE idProduto=@idProduto";

      await pool.request()

      .input('idProduto', sql.UniqueIdentifier, idProduto)
      .query(querySQL);

    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },
};

module.exports = { produtoModel };

// async function teste() {
//   const produtos = await produtoModel.buscarTodos();
//   console.log(produtos);
// }

// teste();

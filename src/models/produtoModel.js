const { sql, getConnection } = require("../config/db");

const produtoModel = {
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

  inserirProduto:async (nomeProduto, precoProduto)=>{
    try {
      const pool = await getConnection();
      let querySQL = 'INSERT INTO Produtos(nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)';

      await pool.request()
      .input ('nomeProduto', sql.VarChar(100), nomeProduto) 
      .input ('precoProduto', sql.Decimal(10,2), precoProduto)
      .query (querySQL);

    } catch (error) {

      console.error('Erro ao inserir produto:', error);
      throw error; //passa o erro para o controller tratar
    }
  }
};

module.exports = {produtoModel}


// async function teste() {
//   const produtos = await produtoModel.buscarTodos();
//   console.log(produtos);
// }

// teste();
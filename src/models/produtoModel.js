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
      throw error; //passa o erro para o controlar e tratar
    }
  },
};

// async function teste() {
//   const produtos = await produtoModel.buscarTodos();
//   console.log(produtos);
// }

// teste();

module.exports = {produtoModel}
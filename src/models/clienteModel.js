const { sql, getConnection } = require("../config/db");

const clienteModel = {
  buscarTodos: async () => {
    try {
      const pool = await getConnection(); // cria conexão com o db

      let sql = "SELECT * FROM clientes";

      const result = await pool.request().query(sql);

      return result.recordset;
    } catch (error) {
      console.error("erro ao buscar clientes:", error);
      throw error; //passa o erro para o controller tratar
    }
  },

  buscarPorCPF: async (cpfCliente) => {
    try {
      const pool = await getConnection(); // cria conexão com o db

      let querySQL = "SELECT * FROM clientes where cpfCliente = @cpfCliente";

      const result = await pool.request()
        .input("cpfCliente", sql.VarChar(20), cpfCliente)
        .query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error("cpf já cadastrado!", error);
      throw error; //passa o erro para o controller tratar
    }
  },

  inserirCliente: async (nomeCliente, cpfCliente) => {
    try {
      const pool = await getConnection();
      let querySQL =
        "INSERT INTO Clientes(nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)";

      await pool
        .request()
        .input("nomeCliente", sql.VarChar(50), nomeCliente)
        .input("cpfCliente", sql.VarChar(20), cpfCliente)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao inserir cliente:", error);
      throw error; //passa o erro para o controller tratar
    }
  },
};

module.exports = { clienteModel };

// async function teste() {
//   const produtos = await produtoModel.buscarTodos();
//   console.log(produtos);
// }

// teste();

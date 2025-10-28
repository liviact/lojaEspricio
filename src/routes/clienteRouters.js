const express = require ('express');
const router = express.Router ();
const { clienteController } = require("../controllers/clienteController");

// GET /clientes --> Lista todos os clientes
router.get("/clientes", clienteController.listarClientes);

// POST /clientes --> Cria um novo cliente
router.post("/clientes", clienteController.criarCliente);

//PUT /clientes/cpfCliente --> atualizar um cliente
router.put("/clientes/:cpfCliente", clienteController.atualizarCliente);


//DELETE /clientes/cpfCliente --> deletar um cliente
router.delete("/clientes/:cpfCliente", clienteController.deletarCliente);

module.exports = {clienteRoutes: router};
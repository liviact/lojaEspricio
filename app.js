const express = require ('express');
const app = express();
const { produtoRoutes } = require("./src/routes/produtoRouters");
const { clienteRoutes } = require("./src/routes/clienteRouters");
const {pedidoRoutes} = require ("./src/routes/pedidoRoutes");

const PORT = 8081;

app.use(express.json());

app.use('/',produtoRoutes);
app.use('/',clienteRoutes);
app.use('/', pedidoRoutes);

 
app.listen (PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


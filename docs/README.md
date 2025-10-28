## API Reference 

### Produtos

#### GET /produtos
- **Descrição** : Obtém uma lista de produtos 
- **Response** : Array de produtos 

#### POST /produtos 
- **Descrição** : Cria um novo produto 
- **Body** : 
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto: 0.00
}
```

- **Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
} 
```

#### PUT /produtos
-**Descrição**: Atualiza um produto já existente
-**Body**: 
```
{
    "nomeProduto":"produtoExemplo"
}
```
-**Response**:
```
{
    "message":"Produto atualizado com sucesso!"
}
```

#### DELETE /produtos /idProduto
-**Descrição**: Deleta o produto com base no Id
- **Response**: 
```
{
    "message":"Produto deletado com sucesso!"
}
```


### Clientes

#### GET /clientes
- **Descrição** : Obtém uma lista de clientes
- **Response** : Array de clientes

#### POST /clientes
- **Descrição** : Cria um novo cliente
- **Body** : 
```
{
    "nomeCliente": "nomeExemplo",
    "cpfCliente": "123.456.789-10"
}
```
- **Response**:
```
{
	"message": "Cliente cadastrado com sucesso!"
} 
```
- **Error Response**:
```
{
	"erro": "CPF já cadastrado!"
}

```
#### PUT /clientes
-**Descrição**: Atualiza um cliente já existente
-**Body**: 
```
{
    "nomeCliente": "clienteExemplo"
}
```
-**Response**:
```
{
    "message":"Cliente atualizado com sucesso!"
}
```

#### DELETE /clientes /idCliente
-**Descrição**: Deleta o cliente com base no Id
- **Response**: 
```
{
    "message":"Cliente deletado com sucesso!"
}
```

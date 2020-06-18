const express = require('express');

const database = require('./database');

const cors = require('cors');

const server = express();


server.use(cors());
server.use(express.json());

server.get('/usuarios', async function(request, response) {
    const dados = await database.select();
    return response.json(dados); 
})

server.post('/usuarios', async function(request, response) {
    const {Nome, Telefone, Email, Senha}  = request.body;
    
    const result = await database.create(Nome, Telefone, Email, Senha);

    response.status(204).send();
})

server.put('/usuarios/idUsuario/:idUsuario', async function(request, response) {

    const idUsuario = request.params.idUsuario;
    const {Nome, Telefone, Email, Senha} = request.body;

    const result = await database.update(idUsuario, Nome, Telefone, Email, Senha);

    return response.status(204).send(); 
})

server.delete('/usuarios/:idUsuario', async function(request, response) {

    const idUsuario = request.params.idUsuario;

    const resullt = await database.delete(idUsuario);

    return response.status(204).send();
})
server.listen(process.env.PORT || 3000);
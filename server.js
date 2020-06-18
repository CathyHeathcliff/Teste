const express = require('express');
const database = require('./database');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/usuario', async function(request, response){
    const dados = await database.read();
    return response.json(dados); 
})

server.post('/usuario', async function(request, response) {
    const idUsuario = request.body.idUsuario;
    const Nome = request.body.Nome; //JSON
    const Telefone = request.body.Telefone;
    const Email = request.body.Email;
    const Senha = request.body.Senha;
    
    const result = await database.create(idUsuario, Nome, Telefone, Email, Senha);

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);
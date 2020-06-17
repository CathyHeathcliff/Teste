const express = require('express');
const database = require('./database');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', async function(request, response){
    const dados = await database.read();
    return response.json(dados);
})


server.post('/', async function(request, response) {
    const nome = request.body.nome; //JSON
    const telefone = request.body.telefone;
    const email = request.body.email;
    const senha = request.body.senha;
    
    const result = await database.create(nome, telefone, email, senha);

    return response.status(204).send();
})
/*server.use(express.json());

const usuarios = [
    { idUsuario: 'IsaMolaz', nome: 'Isa', telefone: 7070 , email: 'isa.com', senha: 123 }
]

server.get('/usuario', function(request, response) {
    return response.json(usuarios);
})

server.post('/usuario', function(request, response) {
    
    const {idUsuario, nome, telefone, email, senha} = request.body;
    
    usuarios.push({idUsuario, nome, telefone, email, senha});
    return response.status(204).send();
})

server.put('/usuario/:id', function(request, response) {
    const id = request.params.id;
    const {idUsuario, nome, telefone, email, senha} = request.body;
    
    for(let i = 0; i < idUsuario.length; i++){
        if(usuarios[i].idUsuario == id) {
            usuarios[i].idUsuario = idUsuario;
            usuarios[i].nome = nome;
            usuarios[i].telefone = telefone;
            usuarios[i].email = email;
            usuarios[i].senha = senha;
            break;
        }
    }
    
   return response.status(204).send();
})

server.delete('/usuario/:id', function(request, response) {
    const id = request.params.id;
   
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].idUsuario == id) {
            usuarios.splice(i, 1);
            break;
        }
    }
    
   return response.status(204).send();
})
*/

server.listen(process.env.PORT || 3000);
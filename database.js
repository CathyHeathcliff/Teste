
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'qnccaqvvphgane',
    password: '8e513a13e95ba6e7a4f494602a21fe3ef613dc34fc34621184735a6ac607dd95',
    host: 'ec2-50-17-90-177.compute-1.amazonaws.com',
    database: 'd40m7l97mbsdlt',
    port: '5432',
    ssl: {rejectUnauthorized: false} 
});

const sqlCreate = `CREATE TABLE IF NOT EXISTS usuario
    (
        idUsuario varchar(50) primary key,
        nome varchar(50) not null,
        telefone int not null, 
        email varchar(50) not null, 
        senha varchar(12) not null
    )
`;

pool.query(sqlCreate, function(error, result) {
    if(error)
        throw error
    console.log('Tabela criada com sucesso!')
} );
    
module.exports = {

    async create(idUsuario, Nome, Telefone, Email, Senha) {
        const sql = `INSERT INTO usuarios (idUsuario, Nome, Telefone, Email, Senha)
                        VALUES ($1, $2, $3, $4, $5)`;

        const result = await pool.query(sql[idUsuario, Nome, Telefone, Email, Senha]);
        return result.rowCount;
    },

    
    async read() {
        const sql = 'SELECT * FROM usuarios'
        const result = await pool.query(sql);
        return result.rows;
    }

}

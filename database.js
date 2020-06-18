
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'qnccaqvvphgane',
    password: '8e513a13e95ba6e7a4f494602a21fe3ef613dc34fc34621184735a6ac607dd95',
    host: 'ec2-50-17-90-177.compute-1.amazonaws.com',
    database: 'd40m7l97mbsdlt',
    port: '5432',
    ssl: {rejectUnauthorized: false} 
});

const sqlCreate = `CREATE TABLE IF NOT EXISTS usuarios
    (
        idUsuario serial primary key,
        Nome varchar(50) not null,
        Telefone int not null, 
        Email varchar(50) not null, 
        Senha varchar(12) not null
    )
`;

pool.query(sqlCreate, function(error, result) {
    if(error)
        throw error
    console.log('Tabela criada com sucesso!')
} );
    
module.exports = {

    async create(Nome, Telefone, Email, Senha) {
    const sql = `INSERT INTO usuarios (Nome, Telefone, Email, Senha)
                        VALUES ($1, $2, $3, $4)`;

    const result = await pool.query(sql, [Nome, Telefone, Email, Senha])
    
    return result.rowCount;
    
    },

    async select() {
        const sql = `SELECT * FROM usuarios order by idUsuario`;
        
        const result = await pool.query(sql)
        
        return result.rows;
    },

    async delete(idUsuario) {
        const sql = `DELETE FROM usuarios where $1 = idUsuario`;
        
        const result = await pool.query(sql, [idUsuario])
        
        return result.rowCount;
    },

    async update(idUsuario, Nome, Telefone, Email, Senha) {
        const sql = `UPDATE usuarios SET
        Nome = $2,
        Telefone = $3,
        Email = $4,
        Senha = $5

        where $1 = idUsuario`; 

        const result = await pool.query(sql, [idUsuario, Nome, Telefone, Email, Senha])

        return result.rowCount;
    }

}

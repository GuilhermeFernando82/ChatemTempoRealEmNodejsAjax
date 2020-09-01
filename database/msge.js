const squeLize = require('sequelize');
const connection = require('./conexao');

const text = connection.define('text',{
    name:{
        type: squeLize.STRING,
        allowNull: false,
    },
    titulo:{
        type: squeLize.STRING,
        allowNull: false,
    },
    message:{
        type: squeLize.TEXT,
        allowNull: false,
    },

 

});
text.sync({force:false}).then(() =>{console.log('Tabela Criada')}).catch(() => {console.log('Erro ao criar tabela')})
module.exports = text;
const express = require('express');
const message = require('./database/msge');
const app = express()
const bodyParser = require('body-parser');
const { render } = require('ejs');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs') 


app.listen(8080,'192.168.15.13', function (err){
    if(err){
        console.log('Error')
    }else{
        console.log('Ok')
    }
});
app.post('/create', (req, res)=>{
    var name = req.body.name
    var mensagem = req.body.msg
    var title = req.body.title
    message.create({
        name: name,
        message: mensagem,
        titulo: title
        
    }).then(() => { return res.redirect('/index')}).catch(()=>{return res.send('Falha')})
})
app.get('/index', (req, res)=>{
    message.findAll().then(mensagem =>{
    if(mensagem != undefined){
        
        res.render('index',{
            mensagem:mensagem
        })

        
    }else{
        return res.send('Not Found')
    }
}).catch(() => {return res.send('Erro')})
})
app.get('/chat', (req,res) =>{
    message.findAll().then(mensagem =>{
        if(mensagem != undefined){ 
            res.render('chat',{
                mensagem:mensagem
            })
        }else{
            return res.send('Not Found')
        }
}).catch(() => {return res.send('Erro')})
})
app.post('/remove/', (req, res)=>{
    var id = req.body.id;
    message.findOne({where:{id:id}}).then(produtos =>{
     if(produtos != undefined){
         produtos.destroy()
         return res.redirect('/index')
     }else{
         return res.send('Falha ao deletar')
     }
 }).catch(() => {return res.send('Erro')})
 })

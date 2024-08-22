const express = require('express');
const app = express();

//habilitar processamento/manipulacao de JSON
app.use(express.json());

//end point inicial
app.get('/', function(req, res) {
    res.send('hello world')
});

//endpoint inicial
app.get('/oi', function (req, res) {
    res.send('Ola mundo!')
});

//lista
const lista = ["Mulher maravilha", "Capitã Marvel", "Homem de ferro"];

//Read All -> [GET] /herois
app.get("/herois", (req, res)=> {
    //res.send(lista);
    res.send(lista.filter(Boolean));
})

//Create -> [POST] /herois
app.post("/herois", (req, res)=> {
    //debug pra verificar se esta recebendo requisicao corretamente
    console.log(req.body);
    //extrai o nome do corpo da requisicao
    /*const item = "";
    req.body.heros.forEach(element => {
        lista.push(element);
    });*/
    const item = req.body.nome;
    //inseri o item na lista
    lista.push(item);
    //envia uma resposta de sucesso para frontend
    res.send("Item add sucess!");

})

//Read by ID -> [GET] /heros/:id
app.get("/herois/:id", (req, res)=> {
    //pegamos incialmente o parametro  de rota (id)
    const id = req.params.id - 1;
    //buscamos a informacao na lista pelo id
    const item = lista [id];
    //exibimos o item na resposta
    res.send(item);

})

//Update -> [PUT] /heros/:id
app.put("/herois/:id", (req,  res)=>{
    //pegamos inicialmente o parametro de rota (id)
    const id = req.params.id - 1;
    //extrai o nome do corpo da requisicao
    const item = req.body.nome;
    //atualizamos na lista
    lista[id] = item;
    //exibimos o item na resposta
    res.send("Item atualizado");
})

//Delete -> [DELETE] /heros/:id
app.delete("/herois/:id", (req, res)=>{
    //pegamos inicialmente o parametro de rota (id) que queremos remover
    const id = req.params.id - 1;
    //removemos da lista
    delete lista[id];
    //exibimos o item na resposta
    res.send("Removed!")
});

app.listen(3000);
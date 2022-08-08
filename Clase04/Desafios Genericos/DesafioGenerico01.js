
const express=require("express")
const app = express();
const PORT=8080;
// https://docs.google.com/presentation/d/1ltprSV14jxHO3C-o3qgKqwOKQFjlSSi0U9oCn8S2I4c/edit#slide=id.gf9c09881f9_0_197

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let index=""

const frase="Hola mundo como estan!"
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/api/frase', (req, res) => {
    
    res.json(frase)
 })

 app.get('/api/letras/:num', (req, res) => {
  
    index=parseInt((req.params.num).slice(1))-1;
    if(!index && index !=0){
      return res.json({error: "el parametro no  es un numero"})
    }
    else if(index>=frase.length){
      return res.json({error: "parametro fuera de rango de palabra"})
    }
    res.json({letra: frase[index]})
    
  
})


const express=require("express")
const app = express();
const PORT=8080;
// https://docs.google.com/presentation/d/1ltprSV14jxHO3C-o3qgKqwOKQFjlSSi0U9oCn8S2I4c/edit#slide=id.gf9c09881f9_0_197

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });
  
  server.on("error", error => console.log(`Error en servidor ${error}`))

  app.get("/api/sumar/:id/:id2",(req,res)=>{
    let num1 =parseInt(req.params.id)
    let num2 =parseInt(req.params.id2)
    sum=num1+num2
    res.json(sum)
  });

  app.get("/api/sumar",(req,res)=>{
    let object=req.query;
   let resolve= parseInt(object.num1) + parseInt(object.num2)
    res.json(resolve)
  });

  app.get("/api/operacion/:id:id2",(req,res)=>{
    let num1 =parseInt(req.params.id)
    let num2 =parseInt(req.params.id2)
    sum=num1+num2
    res.json(sum)
  });


  // Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. 
  // Probar estas rutas con Postman, verificando que el servidor responda con el mensaje correcto.


  app.post("/api",(req,res)=>{

    res.json({ok : "post"})
  });

  app.put("/api",(req,res)=>{
    
    res.json({ok : "put"})
  });

  app.delete("/api",(req,res)=>{
    
    res.json({ok : "delete"})
  });


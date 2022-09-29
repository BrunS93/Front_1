import express from 'express';
const app=express();

import routerProducts from "./routes/routerProducts.js";
import routerCarrito from "./routes/routerCarrito.js";

const PORT=process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products",routerProducts);
app.use("/api/carrito",routerCarrito);
app.all("*",(req,res)=>{
    res.json({
      error:-2,
      descripcion:`ruta ${req.url} metodo ${req.method} no implementado`
    })
  })

const server=app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on=("error",(error)=>console.log("hubo un error"+ error));
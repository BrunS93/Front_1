const express= require("Express");
const app=express();
const routesProduct=require("./routes/routerProducts");
const routesCarrito=require("./routes/routerCarrito");

const PORT=process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products",routesProduct);
app.use("/api/carrito",routesCarrito);
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
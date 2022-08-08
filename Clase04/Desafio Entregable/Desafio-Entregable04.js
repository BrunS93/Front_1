// Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

// Cada producto estará representado por un objeto con el siguiente formato:

// {
//     title: (nombre del producto),
//     price: (precio),
//     thumbnail: (url al logo o foto del producto)
// }


// Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. 
// Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

// Para el caso de que un producto no exista, se devolverá el objeto:
// { error : 'producto no encontrado' }
// Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
// Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
// Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

const express =require("express");
const {Router}= express;
const router = Router();
const app=express();
const PORT=8080;
const Contenedor = require("./Productos");
const metodProductos=new Contenedor("productos.txt");


const server =app.listen(PORT,()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error",(error)=>console.log("hubo un error"+ error))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public",express.static(__dirname + "/public"));

app.use("/api/products",router)

//get all
router.get("/", (req, res) => {
  let getpage;
  async function getall(){
    try {
      getpage=await metodProductos.getAll()
      return res.json(getpage)
      
    } catch (error) {
      return res.json({error: "ERROR NO SE PUDO OBTENER LOS PRODUCTOS DE LA BASE DE DATOS"});
    }
  }
  getall()
  });


//get por id
router.get('/:id', (req, res) => {

  let {id} = req.params;
  let numerador= parseInt(id);
  
  if(numerador)
  {
    async function getporid(){
        try {
          let getid=await metodProductos.getById(numerador)
          if(getid)
          {
            res.json(getid)
          }
          else{
            res.json({error:"producto no encontrado!"});
          }
      } catch (error) {
        return res.json({error: "ERROR NO SE PUDO OBTENER LOS PRODUCTOS DE LA BASE DE DATOS"})
      }
        }
  getporid();
   
  }
  else{
    return res.json({error:"Ingrese un numero id valido!"})
  }

  });


//ENVIO DE HTML FORM para mandar post  
  router.get('/envio/form', (req, res) => {
      res.sendFile(__dirname+ "/index.html");
    });


//Post un producto y lo devuelve con su id asignado
router.post('/', (req, res) => {
    const {body} =req;
    body.price= parseFloat(body.price)
    async function postear(){
      try {
        let finish= await metodProductos.save(body)
        res.json(finish);
        
      } catch (error) {
        return res.json({error: "no se pudo guardar el producto en base de datos!"})
      }

    }
    postear();
  });



//put recibe y actualiza segun ID
router.put('/:id', (req, res) => {
    let {id}= req.params;
    const body= req.body
    let editid=parseInt(id)
    async function routerPut(){
      let validacion = await metodProductos.update(editid,body)
      if(!validacion)
      {
        res.json({error:"no se pudo actualizar el id en base de datos / no existe o el archivo esta vacio!"})
      }
      res.json({success: "Done", coments:"se modifico la base de datos"})

    }
    routerPut();
  });



//elimina segun su id
router.delete('/:id', (req, res) => {
   let {id} = req.params
   let deleteid= parseInt(id)
  async function deletid(){
    let validacion= await metodProductos.deleteById(deleteid)
    if(!validacion)
    {
      res.json({error:"no se pudo borrar id especificado / no se encontro archivo o esta vacio!"})
    }
    res.json({success: "Done",coments: "se borro archivo de la base de datos"})
  }
  deletid()
  });



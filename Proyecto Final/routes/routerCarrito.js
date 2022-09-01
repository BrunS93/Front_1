const express= require("Express");
const {Router}= express;
const Contenedor = require("../Productos");
const metodProductos=new Contenedor("productos.txt");

const routerCarrito=Router();




//get all
routerCarrito.get("/", (req, res) => {
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
  routerCarrito.get('/:id', (req, res) => {
  
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
    routerCarrito.get('/envio/form', (req, res) => {
        res.sendFile(__dirname+ "/index.html");
      });
  
  
  //Post un producto y lo devuelve con su id asignado
  routerCarrito.post('/', (req, res) => {
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
  routerCarrito.put('/:id', (req, res) => {
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
  routerCarrito.delete('/:id', (req, res) => {
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
  



module.exports=routerCarrito;
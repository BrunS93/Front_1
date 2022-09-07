const express= require("Express");
const {Router}= express;
const Contenedor = require("../Carrito");
const metodCarrito=new Contenedor("Carrito.txt");

const Contenedor2=require("../Productos");
const metodProductos=new Contenedor2("productos.txt")
const routerCarrito=Router();




  
  //get por id
  routerCarrito.get('/:id/products', (req, res) => {
  
    let {id} = req.params;
    let numerador= parseInt(id);
    
    if(numerador)
    {
      async function getporid(){
          try {
            let getid=await metodCarrito.getById(numerador)
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
  
  

  
 
  routerCarrito.post('/', (req, res) => {
        async function crear(){
          let newcarro={}
          console.log("first")
         let crearCarro=await metodCarrito.save(newcarro);
          res.json({id:crearCarro})
        }
        crear();
    });
  
  
    routerCarrito.post('/:id/productos', (req, res) => {
      async function crear(){
        let idCarro=parseInt(req.body.idCarrito) || 1
        let idProduct=req.params.id
       let objid= await metodProductos.getById(idProduct)
        
       let crearCarro=await metodCarrito.saveInCarritoID(objid,idCarro);
       res.json(crearCarro)
      }
      crear();
  });



  routerCarrito.put('/:id', (req, res) => {
      let {id}= req.params;
      const body= req.body
      let editid=parseInt(id)
      async function routerPut(){
        let validacion = await metodCarrito.update(editid,body)
        if(!validacion)
        {
          res.json({error:"no se pudo actualizar el id en base de datos / no existe o el archivo esta vacio!"})
        }
        res.json({success: "Done", coments:"se modifico la base de datos"})
  
      }
      routerPut();
    });
  
  
  

  routerCarrito.delete('/:id', (req, res) => {
     let {id} = req.params
     let deleteid= parseInt(id)
    async function deletid(){
      let validacion= await metodCarrito.deleteById(deleteid)
      if(!validacion)
      {
        res.json({error:"no se pudo borrar id especificado / no se encontro archivo o esta vacio!"})
      }
      res.json({success: "Done",coments: "se borro archivo de la base de datos"})
    }
    deletid()
    });
  

    routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
      let {id} = req.params
      let {id_prod}=req.params
      let deleteidCarrito= parseInt(id)
      let deleteidProduct= parseInt(id_prod)
     async function deletid(){
       let validacion= await metodCarrito.deleteByCarritoProd(deleteidCarrito,deleteidProduct)
       if(!validacion)
       {
         res.json({error:"no se pudo borrar id especificado / no se encontro archivo o esta vacio!"})
       }
       res.json({success: "Done",coments: "se borro archivo de la base de datos"})
     }
     deletid()
     });


module.exports=routerCarrito;
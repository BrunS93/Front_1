
const express= require("Express");
const {Router}= express;

const Contenedor = require("../Productos");
const metodProductos=new Contenedor("productos.txt");

const routerProducts=Router();
routerProducts.use(express.static(__dirname + "/src"));

routerProducts.use((req, res, next)=>{
  if(req.method!="GET"){
    if(req.body.Admin===false){
      console.log("Sin credenciales de admin")
      return res.json({ error : -1, descripcion: "Ruta método o no autorizado. Obtenga Permisos de administrador" });
    }
    
    return next();
  }
 next();
})


routerProducts.get('/', (req, res) => {

res.sendFile(__dirname+"/src/Home.html")

})

  //get por id y all
  routerProducts.get('/:id?', (req, res) => {
    
    let {id} = req.params;
    if(!id || isNaN(id)){ 
      let getpage;
          async function getall(){
            try {
              getpage=await metodProductos.getAll()
              return res.json(getpage)
              
            } catch (error) {
              return res.json({error: "ERROR NO SE PUDO OBTENER LOS PRODUCTOS DE LA BASE DE DATOS"});
            }
          }
         return getall()}

    let numerador= parseInt(id);
    if(numerador)
    {
      async function getporid(){
          try {
            let getid=await metodProductos.getById(numerador)
            if(getid)
            {
              return res.json(getid)
            }
            else{
              return res.json({error:"producto no encontrado!"});
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
  
  
  
 
  routerProducts.post('/', (req, res) => {

    
      const {body} =req;
      if(body.Admin){
        delete body.Admin
      }
      body.Precio= parseFloat(body.Precio)
      async function postear(){
        try {
          await metodProductos.save(body)
          return res.json({ok: "success"})
        } catch (error) {
          return res.json({error: "no se pudo guardar el producto en base de datos!"})
        }
  
      }
      postear();
    });
  
  
  
  //put recibe y actualiza segun ID
  routerProducts.put('/:id', (req, res) => {
      let {id}= req.params;
      const body= req.body;
      if(body.Admin){
        delete body.Admin
      }
      let editid=parseInt(id)
      async function routerPut(){
        let validacion = await metodProductos.update(editid,body)
        if(!validacion)
        {
          return res.json({error:"no se pudo actualizar el id en base de datos / no existe o el archivo esta vacio!"})
        }
        return res.json({success: "Done", coments:"se modifico la base de datos"})
  
      }
      routerPut();
    });
  
  
  
  //elimina segun su id
  routerProducts.delete('/:id', (req, res) => {
    async function deletid(){
     let {id} = req.params
     let deleteid= parseInt(id)
     console.log(deleteid)
       await metodProductos.deleteById(deleteid); 
       return res.status(200).json({ok:"sucess"})
    }
    deletid()
    }); 
    

module.exports=routerProducts;
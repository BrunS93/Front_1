const { application } = require("Express");
const express= require("Express");
const {Router}= express;

const Contenedor = require("../Productos");
const metodProductos=new Contenedor("productos.txt");

const routerProducts=Router();
routerProducts.use(express.static(__dirname + "/src"));

routerProducts.use((req, res, next)=>{
  const {body}=req
  if(body){
    if(body.Admin=="off")
    res.status(403).json({ error : -1, descripcion: "Ruta método o no autorizado. Obtenga Permisos de administrador" }
    )
  }

  next();
})

routerProducts.get('/', (req, res) => {

res.sendFile(__dirname+"/src/Home.html")

})

  //get por id y all
  routerProducts.get('/:id?', (req, res) => {
    
    let {id} = req.params;
    if(!id){ 
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
  
  
  
  //Post un producto y lo devuelve con su id asignado
  routerProducts.post('/', (req, res) => {
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
  routerProducts.put('/:id', (req, res) => {
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
  routerProducts.delete('/:id', (req, res) => {
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
  



module.exports=routerProducts;
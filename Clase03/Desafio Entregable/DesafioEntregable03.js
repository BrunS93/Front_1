// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

const express = require("express");
const app = express();
const Conten =require("./Productos.js")
const PORT = 8080;


const nuevo= new Conten("productos.txt")
let leida
let random
async function traer()
{   try {
    leida= await nuevo.getAll()
    
} catch (error) {
    return `Se encontro un error ${error}`
}
    
}
traer()


async function  leidarandom1(){
    try {
        random= await nuevo.getRandomProduct();
        
    } catch (error) {
        return `Se encontro un error ${error}`
    }

        
  
}

leidarandom1();



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });


  server.on("error", error => console.log(`Error en servidor ${error}`))

  app.get('/productos', (req, res) => {
    res.json(leida)
 })


 app.get('/productosRandom', (req, res) => {

    res.json(random)
 })
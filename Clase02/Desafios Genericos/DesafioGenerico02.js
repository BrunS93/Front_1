
// Realizar un programa que:
// A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
// B) Lea nuestro propio archivo de programa y lo muestre por consola.
// C) Incluya el manejo de errores con try catch (progresando las excepciones con
// throw new Error).
// Aclaración: utilizar las funciones sincrónicas de lectura y escritura de archivos del
// módulo fs de node.js




const fs= require("fs");
const fecha=Date();
fs.writeFileSync("./fyh.txt",fecha,(err)=>
{
  console.log(`Hubo un error  ${err} al crear un archivo`)
})

try{

  const leido =fs.readFileSync("./fyha.txt","utf-8")
  console.log(leido)
}
catch (err){
  
  console.log(`hubo un error ${err} `)
  
}



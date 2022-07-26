
// Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual: 
// Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
// Entre las 13 y las 19 hs será 'Buenas tardes!'. 
// De 20 a 5 hs será 'Buenas noches!'.



const http = require("http");
const moment=require("moment");




const server = http.createServer((peticion, respuesta) => {
  const diaHoy=moment();
  let hora=diaHoy.hour();
  if(hora>=6 && hora<12){ return respuesta.end("Buenas tardes!");}
  if(hora>=12 && hora<19){ return respuesta.end("Buenas tardes!");}
  if(hora>=19 && hora<=5){ return respuesta.end("Buenas noches!");}

 
});

const connectedServer = server.listen(8080, () => {
  console.log(`FUNCIONANDO Y ESCUCHANDO en el puerto ${connectedServer.address().port}`);
});


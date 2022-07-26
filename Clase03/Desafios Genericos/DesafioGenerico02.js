
// Realizar un proyecto en node.js que permita calcular cuántos años y días totales transcurrieron desde la fecha de tu nacimiento.
//  Para ello utilizar la dependencia moment instalándola en forma local desde npm. Imprimir los resultados por consola. 
// Hacer las modificaciones necesarias para que sólo se actualicen los patches para la librería recién instalada.



const moment=require("moment");

const diaNacimiento=moment("05/03/1993","L");

const diaHoy=moment();

const diferenciaAnos=diaHoy.diff(diaNacimiento,"years")
const diferencidias=diaHoy.diff(diaNacimiento,"days")

console.log(`Hoy es el dia ${diaHoy} y mi nacimiento fue ${diaNacimiento} `)
console.log(`La diferencia en años es:  ${diferenciaAnos} y la diferencia en dias ${diferencidias} `)

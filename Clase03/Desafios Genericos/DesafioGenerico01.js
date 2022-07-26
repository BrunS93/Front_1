
// 1-numeros aleatorios


// a-Crear un proyecto en Node.js que genere 10000 numeros aleatorios en el rango de 1 a 20
// b-Crear un objeto cuyas claves sean los numeros salidos y el valor asociado a cada clave sera la cantidad de veces 
// que salio dicho numero.Representar por consola resultados.


const genDiezMilNumerosRandom=(a,b)=>{
    
    arr=[]
    valores=[]
    
    for(let x= 0;x<=10000;x++)
    {
        // key+=Math.floor(Math.random()*(b-a)+a) 
        let entrada={}
        let keyss=Math.floor(Math.random()*(b-a)+a)
        entrada[keyss]=keyss
        arr.push( entrada )
      }

   const resultado = arr.reduce((acc, siguiente,i) => {
    acc[i] = ++acc[siguiente.acc]||0
    return acc;
  });
   
  console.log(resultado)
  }

genDiezMilNumerosRandom(1,20)

//   let keys=arr.filter((e,index)=>{
        
  //       return arr.indexOf(e)==index
  //     });

const personas = [
    { nombre: 'Edu', edad: 35 },
    { nombre: 'Manuel', edad: 37 },
    { nombre: 'Marta', edad: 42 },
    { nombre: 'Edu', edad: 25 },
    { nombre: 'Edu', edad: 25 },
    { nombre: 'Edu', edad: 25 },
  ];
  
  // const busqueda = personas.reduce((acc, persona) => {
  //   acc[persona.nombre] = ++acc[persona.nombre]||0
  //   return acc;
  // }, {});

  
  // const duplicados = personas.filter( (persona) => {
  //     return busqueda[persona.nombre];
  // });
  
  // console.log(busqueda);
  
  /*
  [
    { edad: 35, nombre: "Edu" },
    { edad: 25, nombre: "Edu" }
  ]
  */












//2
// const productos = [
//     { id:1, nombre:'Escuadra', precio:323.45 },
//     { id:2, nombre:'Calculadora', precio:234.56 },
//     { id:3, nombre:'Globo Terráqueo', precio:45.67 },
//     { id:4, nombre:'Paleta Pintura', precio:456.78 },
//     { id:5, nombre:'Reloj', precio:67.89 },
//     { id:6, nombre:'Agenda', precio:78.90 }
// ]

// // Y obtenga la siguiente información de dicho array
// // A) Los nombres de los productos en un string separados por comas. (reduce + foreach + for)
// // B) El precio total (reduce + for + foreach)
// // C) El precio promedio (reduce + for + foreach)
// // D) El producto con menor precio (for (aux))
// // E) El producto con mayor precio (for (aux))
// // F) Con los datos de los puntos A al E crear un objeto y representarlo por consola
// // Const resultado = {a: 100, b: res2, c:  res3….}
// // (Math.trunc)
// // Aclaración: todos los valores monetarios serán expresados con 2 decimales

// class manejarproducto{
//     constructor(productos){
//         this.productos=productos
//     }

//    stringdeNombres(){
//     let nombre=""
//     this.productos.forEach(element => {
//         nombre=nombre+" "+ element.nombre
//     })
//     return console.log(nombre)
//     ;
//    }

//    preciototal(){
//     let resultado=0;
//     this.productos.forEach(element=>{
//         resultado+=element.precio
//     })
//     resultado=Number.parseFloat(resultado.toFixed(2))
//     console.log(resultado)
//     }

//    promedio(){
//     let suma=0;
//     this.productos.forEach(element=>{
//         suma+=element.precio
//     })
//     let prom=(suma/(this.productos.length)).toFixed(2)
//     prom=Number.parseFloat(prom)
//     return console.log(prom)
//    }

//    menoPrecio(){
//     let menor=this.productos[0];
//     this.productos.forEach(e=>{
//         if(e.precio<menor.precio)
//         {
//             menor=e

//         }
//     })
//     return console.log(menor)
//    }
   
//    mayorPrecio(){
//     let mayor=this.productos[0];
//     this.productos.forEach(e=>{
//         if(e.precio>mayor.precio)
//         {
//             mayor=e

//         }
//     })
//     return console.log(mayor)
//    }


// }

// const instanciaProducto=new manejarproducto(productos)

// instanciaProducto.mayorPrecio();
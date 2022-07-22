
// Implementar programa que contenga una clase llamada Contenedor que reciba el
// nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
// ● save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// ● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// ● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// ● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// ● deleteAll(): void - Elimina todos los objetos presentes en el archivo.

// Formato: carpeta comprimida con el proyecto.
// Sugerencia: usar un archivo para la clase y otro de test, que la importe
// >> Aspectos a incluir en el entregable:
// - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id
// del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con
// async/await y manejo de errores.
// - Probar el módulo creando un contenedor de productos, que se guarde en el archivo:
// “productos.txt”
// - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para
// verificar el correcto funcionamiento del módulo construído.
// - El formato de cada producto será : {
// title: (nombre del producto),
// price: (precio),
// thumbnail: (url de la foto del producto)
// }



const fs=require("fs")

class Contenedor{
    constructor(nombreArchivo){
        this.nombre=nombreArchivo;
    }
    

    async save(Object){
       let arrayArchivo=[]
       try {
            let contenido= await fs.promises.readFile("./"+this.nombre,"utf-8");
            if(!contenido || contenido=="[]" || contenido=="{}")                               //si ya existe archivo vacio o con [] ejecuta esto
            {
                    Object.id=1;
                    arrayArchivo.push(Object)
                    try {
                        await fs.promises.writeFile("./"+this.nombre,JSON.stringify(arrayArchivo))
                        return console.log(`Se guardo en archivo ya creado id: ${Object.id}`)
                        } 
                        catch (error) {
                          return console.log(`Hubo un error! no se pudo escribir en archivo ya existente!! ${error}`)
                    }
            
            }
            contenido=JSON.parse(contenido)
            let numeros=contenido.map((x)=>x.id).sort();
            Object.id=numeros[numeros.length-1]+1;
            contenido.push(Object)
            console.log(`Ultimo ID guardado : ${Object.id}`)
            try {
                await fs.promises.writeFile("./"+this.nombre,JSON.stringify(contenido,null,2))
            } catch (error) {
                console.log(`no se pudo escribir en el archivo : Error : ${error}`)
            }
       
       } 

       catch (error) {
        if(error.code=="ENOENT"){
            Object.id=1;
            arrayArchivo.push(Object)
            try {
                await fs.promises.writeFile("./"+this.nombre,JSON.stringify(arrayArchivo))
                console.log(`Ultimo ID guardado : ${Object.id}`)
                } 
                catch (error) {
                  return console.log(`Hubo un error!  no se pudo crear el archivo!! Detalles: ${error}`)
            }
        }
       else{
            return console.log(`Error no se pudo ejecutar ninguna accion !! ${error} `)
       }
    
    } 
       
       
    }
    
    async getById(iddado){
        try {
            let lectura=await fs.promises.readFile("./"+this.nombre,"utf-8")
            if(!lectura||lectura=="[]"|| lectura=="{}" )
            {
                return console.log(`Estas tratando de leer un archivo vacio`)
            }
            lectura= await JSON.parse(lectura)
            if(lectura.find(leido=>leido.id === iddado)) {
                console.log(`Se obtuvo este objeto del ID ingresado`)
                console.log( lectura.find(leido=>leido.id === iddado))
             } else {
                console.log('Ese elemento no existe : '+null)
             }

        } catch (error) {
            console.log(`Error no se pudo obtener id . Error ${error}`)
        }
    }             
    
    async getAll(){
        try {
            let lectura=await fs.promises.readFile("./"+this.nombre,"utf-8")
            if(!lectura||lectura=="[]"|| lectura=="{}" )
            {
                return console.log(`Estas tratando de leer un archivo vacio`)
            }
            lectura= await JSON.parse(lectura)
            console.log(`Se obtuvieron estos datos:  `)
            console.log(lectura)

        } catch (error) {
            console.log(`No se pudo obtener los datos del archivo : ${error}`)
        }
    }
    
    async deleteById(iddado){
        try {
            let lectura=await fs.promises.readFile("./"+this.nombre,"utf-8")
            if(!lectura||lectura=="[]"|| lectura=="{}" )
            {
                return console.log(`Estas tratando de leer un archivo vacio`)
            }
            lectura= await JSON.parse(lectura)
            
                
                let buscado=lectura.find(leido=>leido.id === iddado)
                if(buscado==undefined){
                    return console.log(`el id no existe`)
                }
                let index=lectura.indexOf(buscado)
                lectura.splice(index,1)
                try {
                    await fs.promises.writeFile("./"+this.nombre,JSON.stringify(lectura,null,2))
                    console.log(`se borro id ${iddado}`)
                } catch (error) {
                    console.log(`Error al reescribir el archivo ${error}`)
                }
           

        } catch (error) {
            console.log(`no se pudo ejecutar ninguna accion! Error ${error}`)
        }
    }
    
    async deleteAll(){
        try {
            console.log("Se eliminara todo...")
            let arrayArchivo=[]
            arrayArchivo= await JSON.parse(arrayArchivo)
            await fs.promises.writeFile("./"+this.nombre,JSON.stringify(arrayArchivo))
            console.log("Se dejo los productos vacios")
        } catch (error) {
            console.log(`no se pudo borrar el contenido ${error}`)
        }
    }



}


objetoPrueba={
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}
objetoPrueba2={
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

objetoPrueba4={
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

//EJECUCION!

const nuevaInstancia=new Contenedor("productos.txt")


nuevaInstancia.save(objetoPrueba4)

 setTimeout(()=>nuevaInstancia.getById(1),1000)

 setTimeout(()=>nuevaInstancia.getAll(),1000)
 

 setTimeout(()=>nuevaInstancia.deleteById(2),1000)

// nuevaInstancia.deleteAll() ==>descomentar para probar borrar





















































  
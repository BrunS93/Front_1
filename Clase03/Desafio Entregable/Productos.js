
//IMPORTAR SERVIDOR



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
            let numeros=contenido.map((x)=>x.id).sort((a, b) => a.id - b.id);
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
            return lectura

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


    async getRandomProduct(){
        try {
           let lectura = await fs.promises.readFile("./"+this.nombre, "utf-8")
           if(!lectura||lectura=="[]"|| lectura=="{}" )
           {
               return console.log(`Estas tratando de leer un archivo vacio`)
           }
           lectura = await JSON.parse(lectura)
           let Random= Math.floor(Math.random()* lectura.length)
           let RandomProduct = lectura[Random]
           return RandomProduct
        } catch (error) {
            console.error(`no se pudo ejecutar ninguna accion! Error ${error}`)
        }
    }





}

module.exports = Contenedor;

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
    title: 'GLobo Terraqueo',
    price: 345.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

//EJECUCION!

const nuevaInstancia=new Contenedor("productos.txt")


// nuevaInstancia.save(objetoPrueba)
// nuevaInstancia.save(objetoPrueba2)
// nuevaInstancia.save(objetoPrueba4)


























































  

//IMPORTAR SERVIDOR



import fs from "fs";

export class Contenedor{
    constructor(nombreArchivo){
        this.nombre=nombreArchivo;
    }
    

    async save(Object){
       let arrayArchivo=[]
       let time=Date.now();
       let fecha=new Date(time).toLocaleDateString();
       try {
            let contenido= await fs.promises.readFile("./"+this.nombre,"utf-8");
            if(!contenido || contenido=="[]" || contenido=="{}")                               //si ya existe archivo vacio o con [] ejecuta esto
            {
                    Object.id=1;
                    Object.TimestampCarrito=fecha
                    Object.productos=[]
                    arrayArchivo.push(Object)
                    try {
                        await fs.promises.writeFile("./"+this.nombre,JSON.stringify(arrayArchivo))
                        return console.log(`Se guardo en archivo ya creado id: ${Object.id}`)
                        } 
                        catch (error) {
                          return console.log(`Hubo un error! no se pudo escribir en archivo ya existente!! ${error}`)
                    }
            
            }
            contenido=await JSON.parse(contenido)
            let numeros=contenido.map((x)=>x.id).sort((a, b) => a.id - b.id);
            Object.id=numeros[numeros.length-1]+1;
            Object.TimestampCarrito=fecha;
            Object.productos=[]
            contenido.push(Object)
            console.log(`Ultimo ID guardado : ${Object.id}`)
            try {
                await fs.promises.writeFile("./"+this.nombre,JSON.stringify(contenido,null,2))
                return Object.id;
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


    async saveInCarritoID(Objecto,carrito){
        let arrayArchivo=[]
        try {
             let contenido= await fs.promises.readFile("./"+this.nombre,"utf-8");
             if(!contenido || contenido=="[]" || contenido=="{}")                               //si ya existe archivo vacio o con [] ejecuta esto
             {
               console.log("Estas tratando de leer un archivo vacio!")
               return false
             }
             contenido=JSON.parse(contenido)
             let indexCarro=contenido.findIndex((e)=> e.id===carrito)
             console.log("asd")
             contenido[indexCarro].productos.push(Objecto)
            
             try {
                 await fs.promises.writeFile("./"+this.nombre,JSON.stringify(contenido,null,2))
                 return Objecto.id;
             } catch (error) {
                 console.log(`no se pudo escribir en el archivo : Error : ${error}`)
             }
        
        } 
 
        catch (error) {
         if(error.code=="ENOENT"){
             Objecto.id=1;
             arrayArchivo.push(Objecto)
             try {
                 await fs.promises.writeFile("./"+this.nombre,JSON.stringify(arrayArchivo))
                 console.log(`Ultimo ID guardado : ${Objecto.id}`)
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
          
            if(lectura.find(leido=>leido.id == iddado)) {
               let id= lectura.find(leido=>leido.id == iddado)
               return id
             } else {
                return false
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
                console.log(`Estas tratando de leer un archivo vacio`)
                return false
            }
            lectura= await JSON.parse(lectura)
            console.log("se envia json")
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
                console.log(`Estas tratando de leer un archivo vacio`)
                return false
            }
            lectura= await JSON.parse(lectura)
            
                
                let buscado=lectura.find(leido=>leido.id === iddado)
                if(buscado==undefined){
                     console.log(`el id no existe`)
                     return false
                }
                let index=lectura.indexOf(buscado)
                lectura.splice(index,1)
                try {
                    await fs.promises.writeFile("./"+this.nombre,JSON.stringify(lectura,null,2))
                    console.log(`se borro id ${iddado}`)
                    return true
                } catch (error) {
                    console.log(`Error al reescribir el archivo ${error}`)
                    return false
                }
           

        } catch (error) {
            console.log(`no se pudo ejecutar ninguna accion! Error ${error}`)
            return false
        }
    }


    async deleteByCarritoProd(iddado ,idprod){
        try {
            let lectura=await fs.promises.readFile("./"+this.nombre,"utf-8")
            if(!lectura||lectura=="[]"|| lectura=="{}" )
            {
                console.log(`Estas tratando de leer un archivo vacio`)
                return false
            }
            lectura= await JSON.parse(lectura)
            
                
                let buscado=lectura.find(leido=>leido.id === iddado)
                if(buscado==undefined){
                     console.log(`el id de carrito no existe`)
                     return false
                }
                let index=lectura.indexOf(buscado)
                let buscado2=lectura[index].productos.find(leido=>leido.id===idprod)
                if(buscado2==undefined){
                    console.log(`el id de producto no existe`)
                    return false
               }
               let index2=lectura[index].productos.indexOf(buscado2)
               lectura[index].productos.splice(index2,1)
                try {
                    await fs.promises.writeFile("./"+this.nombre,JSON.stringify(lectura,null,2))
                    console.log(`se borro id ${iddado}`)
                    return true
                } catch (error) {
                    console.log(`Error al reescribir el archivo ${error}`)
                    return false
                }
           

        } catch (error) {
            console.log(`no se pudo ejecutar ninguna accion! Error ${error}`)
            return false
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


    async update(iddado,Object){
        try {
             let contenido= await fs.promises.readFile("./"+this.nombre,"utf-8");
             if(!contenido || contenido=="[]" || contenido=="{}")                               //si ya existe archivo vacio o con [] ejecuta esto
             {
                console.log("El archivo esta vacio");
                return false
             }
             contenido=JSON.parse(contenido)
             if(contenido.find(leido=>leido.id == iddado)) {
                let inEdit=contenido.findIndex(leido=>leido.id==iddado)
                Object.id=iddado;
                contenido[inEdit]=Object;
                try {
                    await fs.promises.writeFile("./"+this.nombre,JSON.stringify(contenido,null,2))
                    return true;
                } catch (error) {
                    console.log(`no se pudo escribir en el archivo : Error : ${error}`)
                    return false
                }
                
              } else {
                console.log("no se enconto id para editar en base de datos!")
                 return false
              }

        
        } 
 
        catch (error) {
         if(error.code=="ENOENT"){
            console.log("eL ARCHIVO NO EXISTE EN LA BASE DE DATOS!")
            return false
         } 
        
        }
    }

}






























































  
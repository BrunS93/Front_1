
//MANEJO DE BASES DE DATOS



class Contenedor{
    constructor(configDb,nametabla){
       this.nametabla=nametabla;
       if(configDb.client=="sqlite3"){
       this.knex = require("knex")(configDb);
       }
       if(configDb.client=="mysql"){
        this.knex= require("knex")(configDb);
       }
    }
    

    async savethechat(Object){
     
      try {
       let exists= await this.knex.schema.hasTable(this.nametabla)
           if (!exists) {
             await this.knex.schema.createTable(this.nametabla, (t)=> {
               t.increments('id').primary();
               t.string('email', 100);
               t.string('textchat',100);
               t.string('hourmessage',100);
             })
            console.log("Se genero tabla")
           }
     
       
        let verificado =await this.knex(this.nametabla).insert(Object)
        if(verificado){
          return verificado
        }

      } 
 
      catch (error) {
       console.log("error "+ error)
       return false

   } 
      
      
   }
   



    async save(Object){
     
       try {
         let exists=await this.knex.schema.hasTable(this.nametabla)
          if (!exists) {
            this.knex.schema.createTable(this.nametabla, (t)=> {
              t.increments('id').primary();
              t.string('title', 100);
              t.decimal('price', 8,2);
              t.string('thumbnail',100);
            })
            console.log("Se genero tabla")
          }

        let confirm= await this.knex(this.nametabla).insert(Object)
        return confirm
        
        }
       

       catch (error) {
        console.log("error "+ error)
        return false
 
    } 
       
       
    }
    
  
    
  async getAll(){
    try {
     let result;
      let res= await this.knex.from("products").select("*")
        result = res.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail,
        }))
      
      
      return result


    } catch (error) {
      
      console.log("error "+ error)
      return false

    }
  

}

async getAllChat(){
  try {
    let result;
    let response= await this.knex.from("products").select("*")
      result = response.map((item) => ({
              email: item.email,
              textchat: item.textchat,
              hourmessage: item.hourmessage
              
      }))
    return result

    


  } catch (error) {
    
    console.log("error "+ error)
    return false

  }


}

}

module.exports = Contenedor;



// const {optionsMariaDB}= require("./options/optionsMariaDB")
// const nueva= new Contenedor(optionsMariaDB,"products")

// async function asd(){
// await nueva.getAll().then((res)=>{
//   console.log(res)
// })

// }
// asd();

// return res.render('pages/error',{title: "Vista de Productos", vacio: "No se pudo cargar/obtener productos lista vacia "})




















































  

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
    

    async save(Object){
     
       try {
        this.knex.schema.hasTable(this.nametabla).then((exists)=>{
            if (!exists) {
              this.knex.schema.createTable(this.nametabla, (t)=> {
                t.increments('id').primary();
                t.string('title', 100);
                t.decimal('price', 8,2);
                t.string('thumbnail',100);
              }).then(()=>{console.log("Se genero tabla")}).finally(() => this.knex.destroy())
            }

            this.knex(this.nametabla)
            .insert(Object).
            then(()=>{console.log("Se guardo en base de datos")}).finally(() => this.knex.destroy())
          })
       
       } 

       catch (error) {
        console.log("error "+ error)
        return false
 
    } 
       
       
    }
    
  
    
  async getAll(){
    try {
      let result;
      await this.knex.from("products").select("*").then((res) =>{
        result = res.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail,
        }))
       })
      .finally(()=>this.knex.destroy())
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




















































  

class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }


    getFullname(){
        return console.log(`${this.nombre}  ${this.apellido}`);
    }


    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
       return this.mascotas.length;
    }

    addBook(name,autors){
        let addBook={};
        addBook.nombre=name;
        addBook.autor=autors;
        this.libros.push(addBook);
    }

    getBookNames(){
        let array=[];
        for(let x=0;x<this.libros.length;x++)
        {
            array.push(this.libros[x].nombre);
        }
    
        return array;
    }


}

let libros=[{nombre:"Viaje al centro de la tierra",autor:"Julio Verne"}]
let mascotas=["perros","gatos","pollos"]



const usuario = new Usuario("Bruno","Silva",libros,mascotas);

//getfullname
usuario.getFullname();

//addmascotas
usuario.addMascota("conejo");

//countmascotas
const totalmascotas=usuario.countMascotas()
console.log(totalmascotas)


//addBook
usuario.addBook("Señor de las moscas","William Golding");

//getbooknames
const nombrelibros=usuario.getBookNames();
console.log(nombrelibros);



















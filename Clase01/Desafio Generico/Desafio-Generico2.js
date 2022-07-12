
// 1)Definir la funcion mostrarLista que reciba una lista de datos y muestre su contenido, si no esta vacia,
// de lo contrario que muestre el mensaje :"lista vacia"

let listaDatos=["dsdad","asdadasdasd"]

function mostrarLista (listaDatos){

    if (listaDatos == undefined)
    {
        return "lista vacia"
    }

    else{
        return listaDatos
    }
}

console.log(mostrarLista());


// 2)Definir una funcion anonima que haga lo mismo que la del punto 1 e invorcarla inmediatamente,pasando una lista con 3 numeros como argumento

let listanueva=[2,2,2]; //eliminar valor para probar lista vacia


(function (){
    if (listanueva ==undefined)
    {
        console.log("lista vacia")
    }

    else{
        console.log(listanueva)
    }
    
})(listanueva)


// 3)Crear la funcion crearMultiplicador que reciba un numero y devuelva una funcion anonima que reciba segundo numero
// y de como resultado el producto de ambos. Luego a partir de la funcion definida, crear dos funciones duplicar y triplicar
// y probarlas con diferentes valores

//1a
function crearMultiplicador(numero1){
  let resultado=0

    return function(numero2){
        return resultado=numero1*numero2
    }
}

const resultado =crearMultiplicador(10)

console.log(resultado(10));

//1b
function crearDuplicar(numero2){
  let resultado=0;

    return function(numero1){

        return resultado=numero1*numero2
    }
}

const Duplicando =crearDuplicar(2)
console.log(Duplicando(5))


//c

function crearTriplicar(numero2){
  let resultado=0;

    return function(numero1){

        return resultado=numero1*numero2
    }
}

const Triplicando =crearTriplicar(3)
console.log(Triplicando(5))
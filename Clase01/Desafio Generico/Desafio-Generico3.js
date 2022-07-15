class Contador{
    constructor(nombre,apellido, cuentaIndividual){

        this.nombre=nombre;
        this.apellido=apellido
        this.cuentaIndividual=cuentaIndividual;



    }
    obtenerResponsable(){
        return console.log(`Responsable : ${this.nombre}`);
    }

    static contadorstatico=0

    obtenerCuentaIndividual(){
       let conteopersonal=Object.values(this.cuentaIndividual[0])
        let sumacuenta=0;
        for(let x=0;x<conteopersonal.length;x++)
        {
            sumacuenta+=conteopersonal[x]
        }
        Contador.contadorstatico+=sumacuenta
        return sumacuenta
    }

    
    obtenerCuentaGlobal(){
        return Contador.contadorstatico;
    }

    contar(){
        obtenerCuentaIndividual()
        Contador.contadorstatico++;
    }

}


let cuentadealonso=[
    {
    ahorros: 12450,
    compras:15000,
    envios: 8500
    }
]

let cuentadeMario=[
    {
    ahorros: 12450,
    compras:15000,
    envios: 8500
    }
]

const instanciaMario=new Contador("mario","minchan",cuentadeMario);  // primera instancia
const marioindv=instanciaMario.obtenerCuentaIndividual();
console.log(marioindv)

const instanciaAlonso=new Contador("alonso","vazquez",cuentadealonso); // segunda instancia
const alonsindiv= instanciaAlonso.obtenerCuentaIndividual();
console.log(alonsindiv);

const global=instanciaAlonso.obtenerCuentaGlobal();
instanciaAlonso.contar();
console.log(global)
// const arr =Contador.contadorstatico;
// console.log(arr)



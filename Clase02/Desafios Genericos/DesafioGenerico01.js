
// Desarrollar una función ‘mostrarLetras’ que reciba un string como
// parámetro y permita mostrar una vez por segundo cada uno de sus
// caracteres.
// Al finalizar, debe invocar a la siguiente función que se le pasa también
// como parámetro: const fin = () => console.log('terminé')



const fin = () => console.log('terminé')

const mostrarLetras=(palabra,fin)=>{
    
  let x=0

    for( x=0;x<palabra.length;x++)
    {
        let w=palabra[x]
        let segundos=(x+1)*1000
        setTimeout((w) => {
            console.log(w)
        }, segundos,w);
        
    }
    let final=(x+1)*1000
    setTimeout(fin,final)
    
  
}



 mostrarLetras("hola",fin)



// Realizar tres llamadas a ‘mostrarLetras’ con el mensaje ‘¡Hola!’ y demoras
// de 0, 250 y 500 mS verificando que los mensajes de salida se intercalen



setTimeout(mostrarLetras,0,"¡Hola!",fin)
setTimeout(mostrarLetras,250,"¡Hola!",fin)
setTimeout(mostrarLetras,500,"¡Hola!",fin)





























  








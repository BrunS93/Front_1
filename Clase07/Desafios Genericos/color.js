
class randomColor {
    
    constructor(){
        this.value=this.crearColorRnd();
    }

crearColorRnd(){
   const random1= Math.round(Math.random()*255);
   const random2= Math.round(Math.random()*255);
    const random3= Math.round(Math.random()*255);
    return `${random1},${random2}, ${random3}`;
}


}



const ccolor= new randomColor();

console.log(ccolor.value)

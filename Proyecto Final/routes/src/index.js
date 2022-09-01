
let lecturaApi;
function mostrarProducts(){


//   const nombr=  document.getElementById("nombre").value
//   const a=  document.getElementById("nombre").value
//   const a=  document.getElementById("nombre").value
//   const a=  document.getElementById("nombre").value

fetch('/api/products/*')
.then(response => response.json())
.then(console.log);


}

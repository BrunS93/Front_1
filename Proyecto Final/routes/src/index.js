


let lecturaApi;
function mostrarProducts(){



fetch('/api/products/*')
.then(response => response.json())
.then(data => {
    lecturaApi=data;
    let nombr=  document.getElementById("deComprasProducts")
    let cardContent="";
    lecturaApi.forEach((element,i) => {
        id=`card${i+1}`
      let time= Date.now()
      let fecha= new Date(time).toLocaleDateString()
    cardContent +=  `<div class="card-products" id="${id}">
      <img src="${element.Url}" alt="${element.Nombre}">
      <p>ID:${element.id}</p>
      <p>Nombre:${element.Nombre}</p>
      <p>Timestamp:${fecha}</p>
      <p>Descripcion:${element.Descripcion}</p>
      <p>Codigo:${element.Codigo}</p>
      <p>Precio:${element.Precio}</p>
      <p>Stock:${element.Stock}</p>
      <input type="button" onclick="addCarrito(${id})"class="addCarrito" value="Agregar al carrito">
      <input type="button" onclick="EditarProduct(${id})"class="addCarrito" value="Editar">
      <input type="button" onclick="EliminarProduct(${id})"class="addCarrito" value="Eliminar">
  
  </div>`
    });
    nombr.innerHTML=cardContent;
    document.getElementById("selectCarritotext").style.display="initial"
    document.getElementById("numcarrito").style.display="initial"
    document.querySelector(".verButton2").style.display="block"
    document.querySelector(".verButton4").style.display="block"

})
    
}


function envio(){
    let lectura={};
    let time= Date.now()
    let fecha= new Date(time).toLocaleDateString();
    let span;
    lectura.Nombre =document.getElementById("nombre").value;
    lectura.Timestamp =fecha;
    lectura.Descripcion= document.getElementById("Descripcion").value;
    lectura.Precio= document.getElementById("Precio").value;
    lectura.Codigo= document.getElementById("Codigo").value;
    lectura.Stock= document.getElementById("Stock").value;
    lectura.Url= document.getElementById("Url").value;

    lectura.Admin= document.getElementById("admin").checked;
    

    fetch("/api/products/",{
        method: "POST",
        body: JSON.stringify(lectura),
        headers: {"Content-type": "application/json; charset=UTF-8"},
    }).then(response=>{
        if(response){
            console.log(response)
            span=document.createElement("span")
            span.innerText="Se guardo con Exito!"
            document.getElementById("admin-options").appendChild(span)
        }
        else{
            span=document.createElement("span")
            span.innerText="Ocurrio un Problema!"
            document.getElementById("admin-options").appendChild(span)
        }
    
    })



}

const adminEnable= document.getElementById("admin")
adminEnable.addEventListener('click',adminEnableOk)

function adminEnableOk(){
    const adminEnableisOk=document.querySelectorAll(".add")
    adminEnableisOk.forEach((e)=>{

        if(e.style.display=="block"){
            return e.style.display="none"
        }
        e.style.display="block"
    })
}


function getCarrito(){
    
   let carritoElegido=document.getElementById("numcarrito").value
   console.log(carritoElegido)
    window.location.href = `http://localhost:8080/api/carrito/${carritoElegido}/products`
}

function addCarrito(id){
   
    const as= id.querySelectorAll("p")
    arr=as[0].textContent.split(":")
    
   let carritoElegido=document.getElementById("numcarrito").value
   if(!carritoElegido){
    return alert("Crea o Eliga un carrito antes de agregar un producto!!!! A menos que eliga otro se guardara siempre en el N°1")
   }

   fetch(`/api/carrito/${arr[1]}/productos`,{
    method: "POST",
    body: JSON.stringify({idCarrito:carritoElegido}),
    headers: {"Content-type": "application/json; charset=UTF-8"},
}).then(response=>{
    if(response){
       let as=id.querySelector("p");
      let newid= as.textContent.split(":")
       document.getElementById(`card${newid[1]}`).style.display="none"
    }

})
}

function crearCarrito(){

    fetch("/api/carrito",{
        method:"POST"
    }).then((response)=>response.json())
      .then((data)=>{
        let textdiv=`<span id="tempP" >Se genero carrito N° ${data.id}</span>`
        let newSpan=document.createElement("span")
        let notifi=document.querySelector(".user-options").appendChild(newSpan)
        notifi.innerHTML=textdiv
        setTimeout(()=>{
            document.getElementById("tempP").remove();
          }, 2500)
       

      })

    

}

function eliminarCarrito(){

    let carritoElegido=document.getElementById("numcarrito").value
    console.log(carritoElegido.length)
    if(carritoElegido.length>1){
        let nuevo=carritoElegido.split("/")
        console.log(nuevo)

        fetch(`/api/carrito/${nuevo[0]}/productos/${nuevo[1]}`,{
            method: "DELETE",
        }).then(response=>response.json()).then(data=>{
            if(data){
                let textdiv=`<span id="tempP" >Se elimino producto N° ${nuevo[1]} del carrito ${nuevo[0]}</span>`
                let newSpan=document.createElement("span")
                let notifi=document.querySelector(".user-options").appendChild(newSpan)
                notifi.innerHTML=textdiv
                setTimeout(()=>{
                    document.getElementById("tempP").remove();
                  }, 2500)
                }
        })
    
    }
else{
    fetch(`/api/carrito/${carritoElegido}`,{
        method: "DELETE",
    }).then(response=>response.json()).then(data=>{
        if(data){
            let textdiv=`<span id="tempP" >Se elimino carrito N° ${carritoElegido}</span>`
            let newSpan=document.createElement("span")
            let notifi=document.querySelector(".user-options").appendChild(newSpan)
            notifi.innerHTML=textdiv
            setTimeout(()=>{
                document.getElementById("tempP").remove();
              }, 2500)
            }
    })
    
}
   
    

}
function EliminarProduct(id){
    const adminok=document.getElementById("admin").checked;
    const as= id.querySelectorAll("p")
    arr=as[0].textContent.split(":")
    fetch(`/api/products/${arr[1]}`,{
        method: "DELETE",
        body: JSON.stringify({Admin:adminok}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        
    }).then(response=>{
        console.log(response)
        if(response){
            let tas=id.querySelector("p");
            let newid= tas.textContent.split(":")
            console.log(newid)
            document.getElementById(`card${newid[1]}`).style.display="none"
            let textdiv=`<span id="tempP" >Se elimino Producto!</span>`
            let newSpan=document.createElement("span")
            let notifi=document.querySelector("#admin-options").appendChild(newSpan)
            notifi.innerHTML=textdiv
            setTimeout(()=>{
                document.getElementById("tempP").remove();
              }, 2500)
        }
    })
}

function EditarProduct(id){

           let tas=id.querySelector("p");
            let newid= tas.textContent.split(":")
            console.log(newid)
            document.getElementById(`card${newid[1]}`).style.display="none"
            document.getElementById("Gproduct").style.display="none"
            let newinput=document.createElement("input")
            newinput.setAttribute("type","button")
            newinput.setAttribute("value","Editar")
            newinput.setAttribute("class","temporal")
            document.querySelector("#admin-options").appendChild(newinput)

            const editenable= document.querySelector(".temporal")

            editenable.addEventListener('click',editpro)

         
            function editpro(){

                let lectura={};
                let time= Date.now()
                let fecha= new Date(time).toLocaleDateString();
                lectura.Nombre =document.getElementById("nombre").value;
                lectura.Timestamp =fecha;
                lectura.Descripcion= document.getElementById("Descripcion").value;
                lectura.Precio= document.getElementById("Precio").value;
                lectura.Codigo= document.getElementById("Codigo").value;
                lectura.Stock= document.getElementById("Stock").value;
                lectura.Url= document.getElementById("Url").value;

                lectura.Admin= document.getElementById("admin").checked;

                fetch(`/api/products/${newid[1]}`,{
                    method: "PUT",
                    body: JSON.stringify(lectura),
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                }).then(response=>{
                    if(response){
                        console.log(response)
                        span=document.createElement("span")
                        span.innerText="Se guardo con Exito!"
                        document.getElementById("admin-options").appendChild(span)
                    }
                    else{
                        span=document.createElement("span")
                        span.innerText="Ocurrio un Problema!"
                        document.getElementById("admin-options").appendChild(span)
                    }
                
                })
            }



}
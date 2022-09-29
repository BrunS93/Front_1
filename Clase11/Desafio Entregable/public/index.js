
const socket = io(); // se carga la pagina!!! ----enlace a socket
socket.on("connect", () => {
   
  console.log("se conecto el user --ID: "+ socket.id);
});


socket.on("NewProducts", (data) => {
      console.log("refresh received")
      
      let html="<thead><tr><th>Nombre</th><th>Precio</th><th>Foto</th></tr></thead>"

      for(const e of data){
       
        html +=  `<tbody>
        <tr >
        <td>${e.title}</td>
        <td>${e.price}</td>
        <td>
        <img src ="${e.thumbnail}">
        </td>
        </tr>
        </tbody>`
        
        
      }
      document.getElementById("tabla").innerHTML=html
     
    });

function enviarChat(){
  let enviObject={};
  let email=document.getElementById("email").value;
  if(!email){
    let obligatorio="NECESITAS LLENAR ESTE CAMPO !!!"
    return document.getElementById("error").innerText=obligatorio;
  }
  document.getElementById("error").innerText="";
  let textchat=document.getElementById("msg").value;
  let hourmessage = Date()
  enviObject.hourmessage=hourmessage
  enviObject.email=email;
  enviObject.textchat=textchat;
  socket.emit("chatactive", enviObject);

}

socket.on("chatactive",(object)=>{
  console.log("chat refresh received")
 console.log(object)
  html=""
  chat=""
  for(const e of object)
  {
    
     html = `<span class="email">${e.email}</span>
                <span class="hora">${e.hourmessage}</span>
                <span class="message">${e.textchat}<br>`

    chat=html+chat;
  }
  
  document.getElementById("chatarea").innerHTML =chat;

})


socket.on("errorOnline",(e)=>{
  let errorOnline=`se produjo error ${e} `
  document.getElementById("error").innerText=errorOnline;
})
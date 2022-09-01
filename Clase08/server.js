const express = require("express");
const app = express();
const claseContenedor =require("./Productos")
const {optionsMariaDB} = require("./options/optionsMariaDB")
const {optionsSQLite}=require("./options/optionsSQLite")

const metodProductos= new claseContenedor(optionsMariaDB,"products")
const backchats= new claseContenedor(optionsSQLite,"products")

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
let lista1;
// let chatactive;
httpServer.listen(process.env.PORT || 8080, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



io.on('connection', socket => {
  console.log('Usuario conectado '+ socket.id)
  if(lista1)
  {  
    io.sockets.emit("NewProducts",lista1) 
  }                                       
                                          

  socket.on("chatactive",(data)=>{
    async function saveChats(){
      try {
       await backchats.save(data)
      } catch (error) {
        io.sockets.emit("errorOnline",error)
      }

      try {
        let lectura =await backchats.getAll()
        io.sockets.emit("chatactive",lectura)
       } catch (error) {
        io.sockets.emit("errorOnline",error)
       }
    }
    saveChats();

  })
  
  
})
 

app.get('/', (req, res) => { //raiz
  console.log('aqui products');
  res.render('pages/index', { title: 'Ingreso de productos'});
});


app.post('/', (req, res) => {
  const {body} =req;
  body.price= parseFloat(body.price)
  if(isNaN(body.price)){return res.render('pages/error',{title: "Error", vacio: "Error debe llenar los campos"})}
  async function postear(){
    try {
     await metodProductos.save(body);
     const lect =await metodProductos.getAll();
     if(!lect){console.log("first")}
     lista1=lect
    } catch (error) {
      return res.render('pages/error',{title: "Error", vacio: "Error al guardar el Producto"})
    }

  }
 postear();
  
  res.redirect('/')
});







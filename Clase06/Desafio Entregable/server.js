const express = require("express");
const app = express();
const Contenedor = require("./Productos");
const metodProductos=new Contenedor("productos.txt");
const backchats=new Contenedor("chats.txt")
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
    io.sockets.emit("NewProducts",lista1) //aca ES VALIDO MANEJARSE ASI? ANDA PERFECTO!
  }                                       // corriganme si o si hay que mandarlo DENTRO DE UN SOCKET.ON ! y es mala practica  esto o es
                                          //una opcion valida!!  GRACIAS!!

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
  async function postear(){
    try {
     await metodProductos.save(body)
    } catch (error) {
      return res.render('pages/error',{title: "Error", vacio: "Error al guardar el Producto"})
    }

    lista1= await metodProductos.getAll();
    if(!lista1){
      return res.render('pages/error',{title: "Vista de Productos", vacio: "No se pudo cargar/obtener productos lista vacia "})
    }
  }

 postear();
  
  res.redirect('/')
});







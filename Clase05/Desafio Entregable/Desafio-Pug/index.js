const express = require('express');
const app = express();
const {Router}= express;
const router = Router();
const PORT = 8080;
const Contenedor = require("./Productos");
const metodProductos=new Contenedor("productos.txt");

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",router)
app.set('view engine', 'pug');
app.set('views', './views');



router.get('/', (req, res) => {
  console.log("aqui products")
  res.render('index.pug', { msg: 'Ingreso de Productos' });
});

router.post('/api/products', (req, res) => {
  const {body} =req;
  body.price= parseFloat(body.price)
  async function postear(){
    try {
     await metodProductos.save(body)
    } catch (error) {
      return res.render('error',{title: "Error en servidor", vacio: "No se pudo guardar el producto!"})
    }
  }
  postear();
  res.redirect('/')

});


router.get('/api/products', (req, res) => {
  async function gettodo(){
    lista1= await metodProductos.getAll();
    if(!lista1){
      return res.render('error',{title: "Vista de Productos", vacio: "No se encontraron productos!"})
    }

    return res.render('indexGetProducts', { title: 'Vista de Productos', lista : lista1});
  }
  gettodo();
});
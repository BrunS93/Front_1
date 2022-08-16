const express = require('express');
const app = express();
const {Router}= express;
const router = Router();
const { engine } = require("express-handlebars");
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

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);



router.get('/', (req, res) => {
  
  res.render('indexform', { products: "Ingreso de Productos"});
});

router.post('/', (req, res) => {
  const {body} =req;
  body.price= parseFloat(body.price)
  async function postear(){
    try {
     await metodProductos.save(body)
    } catch (error) {
      return res.render('error',{title: "Error en servidor", vacio: "No se pudieron guardar los productos!"})
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

    return res.render('productslist', { title: 'Vista de Productos', lista : lista1});
  }
  gettodo();
});
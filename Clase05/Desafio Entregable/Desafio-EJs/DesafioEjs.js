const { json } = require('express');
const express = require('express');
const {Router}= express;
const router = Router();
const app = express();
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
app.set('view engine', 'ejs');



router.get('/', (req, res) => { //raiz
  console.log('aqui products');
  res.render('pages/index', { title: 'Ingreso de productos'});
});


router.post('/api/products', (req, res) => {
  const {body} =req;
  body.price= parseFloat(body.price)
  async function postear(){
    try {
     await metodProductos.save(body)
    } catch (error) {
      return res.json({error: "no se pudo guardar el producto en base de datos!"})
    }
  }
  postear();
  res.redirect('/')
});

router.get('/api/products', (req, res) => {
  console.log('aqui products');
  
  async function gettodo(){
    lista1= await metodProductos.getAll();
    if(!lista1){
      return res.render('pages/error',{title: "Vista de Productos", vacio: "No se encontraron productos!"})
    }

    return res.render('pages/indexGetproducts', { title: 'Vista de Productos', lista : lista1});
  }
  gettodo();
  
});
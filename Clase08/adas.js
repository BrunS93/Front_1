const { optionsMariaDB } = require("./options/optionsMariaDB");
const knexMariaDB = require("knex")(optionsMariaDB);



const { optionsSQLite } = require("./options/optionsSQLite");
const knexSQLite = require("knex")(optionsSQLite);

const products = [
    { name: "cartera", price: 100, stock: 12 },
    { name: "pelota", price: 11, stock: 2 },
    { name: "zapato", price: 500, stock: 25 },
  ];


// knexSQLite.schema.createTableIfNotExists("products", (table) => {
//     table.increments("id_products"), table.string("name"),
//  table.integer("price"),
//  table.integer("stock");
//   })
//   .then(() => {
//     console.log("todo bien");
//   })
//   .catch((err) => {
//     console.log(err);
//     throw new Error(err);
//   })
//   .finally(() => {
//     knexSQLite.destroy();
//   });

// knexSQLite("products")
//   .insert(products)
//   .then((res) => console.log("todo ok", res))
//   .catch((e) => console.log(e))
//   .finally(() => knexSQLite.destroy());



// console.log(options)
// knex.schema.dropTableIfExists("products");

// const products = [
//     { name: "cartera", price: 100, stock: 12 },
//     { name: "pelota", price: 11, stock: 2 },
//     { name: "zapato", price: 500, stock: 25 },
//   ];
  



// ("products", (table) => {
//     table.increments("id_products"), table.string("name"),
//  table.integer("price"),
//  table.integer("stock");
//   })
//   .then(() => {
//     console.log("todo bien");
//   })
//   .catch((err) => {
//     console.log(err);
//     throw new Error(err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// knex("products")
//   .insert(products)
//   .then((res) => console.log("todo ok", res))
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());

// knex
//   .from("products")
//   .select("*")
//   .then((res) => {
//     /* res = res.map((item) => ({
//       idProduct: item["id_product"],
//       name: item.name,
//       price: item.price,
//       stock: item.stock,
//     })); */
//     res.forEach((item) => console.log(item));
//   })
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());





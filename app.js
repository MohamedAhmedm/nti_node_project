const express = require("express");
const app = express();
//dotenv requires
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const authJwt = require("./helper/jwt");
// const { authJwt } = require("./helper/jwt");
// const authJwt = require("./helper/jwt");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use( authJwt );

//Database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});

const express = require("express");
const Router = express.Router();
const Product = require("../Controller/Admin/productController");
const verifyToken = require("../MiddleWare/verifyToken");

Router.route("/")
  .get(Product.getAllProducts)
Router.route("/:productId")
  .get(verifyToken, Product.getSingleProduct)


module.exports = Router;

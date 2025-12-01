const express = require("express");
const Router = express.Router();
const Product = require("../Controller/productController");
const verifyToken = require("../MiddleWare/verifyToken");
Router.route("/").get(Product.getAllProducts).post(verifyToken, Product.addProduct);

Router.route("/:productId")
  .get(verifyToken, Product.getSingleProduct)
  .patch(verifyToken, Product.updateProduct)
  .delete(verifyToken, Product.deleteProduct);

module.exports = Router;

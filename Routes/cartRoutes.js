const express = require("express");
const Router = express.Router();
const Cart = require("../Controller/cartController");

Router.route("/")
  .get(Cart.showItemCart)
  .post(Cart.addToCart)
  .delete(Cart.removeFromCart);

module.exports = Router;

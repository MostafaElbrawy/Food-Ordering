const express = require("express");
const Router = express.Router();

const verifyToken = require("../MiddleWare/verifyToken");
const User = require("../Controller/usersController");
const LogIn = require("../Controller/logIn");
const Register = require("../Controller/register");

Router.route("/").get(User.getAllUsers);

Router.route("/login").get(LogIn);

Router.route("/register").post(Register);

Router.route("/:userId")
  .get(verifyToken, User.getSingleUser)
  .patch(verifyToken, User.updateUser)
  .delete(verifyToken, User.deleteUser);

module.exports = Router;

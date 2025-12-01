const express = require("express");
const cors = require('cors');
const {SUCCESS,FAIL,ERROR} = require('./MiddleWare/errorHandling')
const productRouter = require("./Routes/productRoutes");
const usersRouter = require('./Routes/usersRoutes');
const cartRouter = require("./Routes/cartRoutes");
const generateError = require("./MiddleWare/generateError");
require("dotenv").config();
const app = express();

console.log();


app.use(express.json());
app.use(cors());




app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use('/users',usersRouter);


app.use((req, res, next) => {
  next(generateError("Page not found", 404, ERROR));
});


app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ state: err.errorState || ERROR, message: err.message });
});




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
 
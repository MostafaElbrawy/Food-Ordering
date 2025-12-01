const { connectDB, sql } = require("../MiddleWare/connectToDB");
const generateError = require("../MiddleWare/generateError");
const handleRes = require("../MiddleWare/handleRes");
const asyncWrapper = require("../MiddleWare/errorHandling");
const { FAIL, SUCCESS } = require("../MiddleWare/handleResStatus");


const showItemCart = asyncWrapper(async (req,res,next)=>{


      const { user_id } = req.body;
      const pool = connectDB();

      const result = await pool
        .request()
        .input("user_id", user_id)
        .query("select * from cart where user_id=@user_id");
      const data = result.recordset;
      if (data.length === 0)
        return next(generateError("not item on the Cart", 400, FAIL));


      handleRes(res, 201, SUCCESS, "cart became empty");
    

    
})

const addToCart = asyncWrapper(async (req, res, next) => {
  const pool = await connectDB();

  let { product_id, user_id, quantity } = req.body;
  if (!quantity) quantity = 1;

  if (!product_id || !user_id)
    return next(generateError("product and user id required", 400, FAIL));

  const result = await pool
    .request()
    .input("productId", product_id)
    .query(`SELECT price FROM products WHERE id = @productId;`);

  const data = result.recordset;
  if (data.length === 0)
    return next(generateError("no product exist with this ID", 400, FAIL));

  let price = data[0].price;

  await pool
    .request()
    .input("userId", sql.Int, user_id)
    .input("productId", sql.Int, product_id)
    .input("quantity", sql.Int, quantity).query(`
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (@userId, @productId, @quantity)
        `);

  let totalPrice = quantity * price;
  handleRes(res, 201, SUCCESS, { product_id, quantity, totalPrice });
});

const removeFromCart = asyncWrapper(async (req, res, next) => {
  const { user_id } = req.body;
  const pool = connectDB();

  const result = await pool
    .request()
    .input("user_id", user_id)
    .query("select * from cart where user_id=@user_id");
  const data = result.recordset;
  if (data.length === 0)
    return next(generateError("not item on the Cart", 400, FAIL));

  await pool.request().input("user_id", user_id).query(`DELETE FROM cart
                            WHERE user_id = @user_id;
                                `);



  handleRes(res, 201, SUCCESS, "cart became empty");

                                
});

module.exports = {
  addToCart,
  removeFromCart,
  showItemCart,
};

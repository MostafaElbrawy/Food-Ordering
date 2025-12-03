const { connectDB, sql } = require("../MiddleWare/connectToDB");
const generateError = require("../MiddleWare/generateError");
const handleRes = require("../MiddleWare/handleRes");
const { SUCCESS, FAIL } = require("../MiddleWare/handleResStatus");

const showOrders = asyncWrapper(async (req, res, next) => {
  handleRes(res, 201, SUCCESS, "User deleted successfully");

  const { delivery_id } = req.params; // from URL

  const pool = await connectDB();

  const result = await pool.request().input("delivery_id", sql.Int, delivery_id)
    .query(`
      SELECT top 1
        id,
        delivery_id,
        location,
        date_placed,
        sub_total,
        delivery_fees,
        total_price,
      FROM orders
      WHERE delivery_id = @delivery_id
      ORDER BY date_placed DESC
    `);

  let order = result.recordset;
  let order_id = order[0].id;
  if (order.length == 0)
    return next(generateError("No orders yet", 400, SUCCESS));

  // 2) Update delivery profile to busy
  await pool.request().input("delivery_id", sql.Int, delivery_id).query(`
      UPDATE delivery_profiles
      SET status = 'busy'
      WHERE user_id = @delivery_id
    `);

  // 3) Update order status to on_the_way
  await pool.request().input("order_id", sql.Int, order_id).query(`
      UPDATE orders
      SET status = 'on_the_way'
      WHERE id = @order_id
    `);

  return handleRes(res, 200, SUCCESS, order);
});

const completeOrder = asyncWrapper(async (req, res, next) => {
  const pool = await connectDB();

  const { delivery_id } = req.params; // from URL

  const result = await pool.request().input("delivery_id", sql.Int, delivery_id)
    .query(`
      SELECT top 1
        id
      FROM orders
      WHERE delivery_id = @delivery_id
      ORDER BY date_placed DESC
    `);

  let order = result.recordset;
  let order_id = order[0].id;

  // 3) Update order status to delivered
  await pool.request().input("order_id", sql.Int, order_id).query(`
      UPDATE orders
      SET status = 'delivered'
      WHERE id = @order_id
    `);

  return handleRes(res, 200, SUCCESS, "order completed successfully");
});

module.exports = { showOrders, completeOrder };

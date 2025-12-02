const {connectDB,sql} = require('../MiddleWare/connectToDB');
const generateError = require('../MiddleWare/generateError');
const handleRes = require('../MiddleWare/handleRes');
const {SUCCESS,FAIL}= require('../MiddleWare/handleResStatus');

const showOrders = asyncWrapper(async(req,res,next)=>{

  handleRes(res, 201, SUCCESS, "User deleted successfully");

    const { delivery_id } = req.params; // from URL

    const pool = await sql.connect();

      const result = await pool
        .request()
        .input("delivery_id", sql.Int, delivery_id).query(`
      SELECT 
        id,
        delivery_id,
        location,
        date_placed,
        sub_total,
        delivery_fees,
        total_price,
        rating
      FROM orders
      WHERE delivery_id = @delivery_id
      ORDER BY date_placed DESC
    `);

    let orders = result.recordset;

    if (orders.length==0) 
        return next(generateError("No orders yet",200,SUCCESS));

return handleRes()



})
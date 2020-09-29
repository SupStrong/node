var express = require('express');
var router = express.Router();

let db = require('../config/db');

router.get('/', async function (req, res, next) {
  let tenantId = req.query.tenantId
  let siteId = req.query.siteId
  let sqlString = "select id,name,city_id from stores where (merchant_id = "+ tenantId +" and city_id = "+ siteId +" ) and (status = 1) ";
  try {
    let result = await db.find(sqlString)
    res.send({
      status: 1,
      message: '请求成功',
      data: result
    });
  } catch (error) {
    res.send({
      status: 0,
      message: '请求失败',
      data: []
    });
  }
  return;
})

// (is_online = 1 and group_id = 20)




module.exports = router;
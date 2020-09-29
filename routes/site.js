var express = require('express');
var router = express.Router();

let db = require('../config/db');

router.get('/', async function (req, res, next) {
  try {
    // let result = await db.find("select city_id,name from sites where city_id in (select DISTINCT city_id from merchants where status = 1)")
    let result = await db.find("select city_id,name from sites where status = 1")
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
});


module.exports = router;
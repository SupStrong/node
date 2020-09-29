var express = require('express');
var router = express.Router();

let db = require('../config/db');

router.get('/',async function (req, res, next) {
  let siteId = req.query.siteId
  try {
    let result = await db.find(`select id,name from merchants where (status=1 and city_id = ${siteId}) and is_dev = 0`)
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

router.get('/card',async function (req, res, next) {
  let tenantId = req.query.tenantId
  let sqlString = `select id from cards where merchant_id = ${tenantId} and status=1  `;
  try {
    let result = await db.find(sqlString)
    let id = 0
    if(result.length != 0){
      id = result[0].id
    }
    res.send({
      status: 1,
      message: '请求成功',
      data: {id:id}
    });
  } catch (error) {
    res.send({
      status: 0,
      message: '请求失败',
      data: []
    });
  }
  return;





  db.find(connection, sqlString, function (result) {
    let id = 0
    if(result.length != 0){
      id = result[0].id
    }
    res.send({
      status: 1,
      message: '请求成功',
      data: {id:id}
    });
    return;
  })
})

router.get('/activity', async function (req, res, next) {
  let tenantId = req.query.tenantId
  let sqlString = `select id,stores from signs where merchant_id = ${tenantId} and status = 1`;
  try {
    let result = await db.find(sqlString)
    console.log(result,'result');
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

module.exports = router;
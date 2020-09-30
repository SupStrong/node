var express = require('express');
var router = express.Router();

let db = require('../config/db');

/* GET home page. */
router.post('/',async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(`select id,username,password from tenant_user where username = ${username}`);
    try {
      let result = await db.find(`select id,username,password from tenant_user where username='liuchen'`)
    console.log(result);
      res.send({
        status:1,
        message: '请求成功',
        data: result
      });
    } catch (error) {
      res.send({
        status: 0,
        message: '请求失败',
        data: {}
      });
    }
    return;
  })

  router.get('/user',async function (req, res, next) {
    try {
      let result = await db.find(`select * from user`)
    console.log(result);
      res.send({
        status:1,
        message: '请求成功',
        data: result
      });
    } catch (error) {
      res.send({
        status: 0,
        message: '请求失败',
        data: {}
      });
    }
    return;
  })




module.exports = router;
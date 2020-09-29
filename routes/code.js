var express = require('express');
var router = express.Router();
var https=require('https');
var querystring=require('querystring');
const url = require('url');

let db = require('../config/db');
const { features } = require('process');
const { resolve } = require('path');

let defaultData = {
  1:{
    appid:'wxcbe60162f9dc451c',
    secret:'43210c99dd2617403fe0f268059cfb8a'
  }
}




router.get('/', async function (req, res, next) {
  let {type,path} =  req.query
  let config = defaultData[type]
  try {
    let {access_token} = await getAccessToken(config)
    let {imgBuffer, contentType} = await getCodeImg(access_token,path)
    // res.setHeader('Content-type', contentType)
    res.send({
      status: 1,
      message: '请求成功',
      data: {
        image:`data:image/jpeg;base64,${imgBuffer.toString('base64')}`
      }
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



 function getAccessToken(config){
  return new Promise((resolve) =>{
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`;
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        resolve(body)
      });
    });
  })


}


function getCodeImg(access_token,path){
  return new Promise((resolve) =>{
    let options = url.parse(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`);
    let postData = JSON.stringify({path:path})
    options = Object.assign(options, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
      }
  });
 
    const req = https.request(options, (res) => {
      let resData = ''
      res.setEncoding("binary");
      res.on('data', (d) => {
        resData += d;
      });
      res.on('end', () => {
        // 微信api可能返回json，也可能返回图片二进制流。这里要做个判断。
        const contentType = res.headers['content-type'];
        if ( !contentType.includes('image') ) {
            return resolve(null);
        }
        const imgBuffer = Buffer.from(resData, 'binary');
        resolve( {imgBuffer, contentType} );
    });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postData);
    req.end();
  })
}

module.exports = router;
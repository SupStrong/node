let mysql = require('mysql');
let db = {}

//插入操作，注意使用异步返回查询结果
db.insert = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results.insertId);
    });
}
//查询操作，注意使用异步返回查询结果
db.find = function(sql){
    return new Promise(function (resolve, reject) {
        let connection = db.connection();
        connection.query(sql, function (error, results, fields) {
          db.close(connection);
          if (error) {
            reject(error)
            // throw error
          };
          resolve(results)
        });
      })
}




//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}

//获取数据库连接
db.connection = function(){
    //数据库配置
    let connection = mysql.createConnection({
        // host:'localhost',
        host:'127.0.0.1',
        user:'root',
        // user:'root',
        password:'123456',
        // password:'root',
        database:'node',
        port:3306,
        dateStrings: true  //将时间转换为字符串
    });
    //数据库连接
    connection.connect(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    return connection;
}
module.exports = db;

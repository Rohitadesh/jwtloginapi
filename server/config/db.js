const mysql = require('mysql2')

const pool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'login',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    password:'adesh'
  });


const getConnectionFromPool = () => {
      return new Promise((resolve,reject) => {
          pool.getConnection((err,connection) => {
              if(err){
                  console.log(err)
                  reject(err)
              }else{
                  resolve(connection)
            }
        })
  })
}


const getFormattedQuery = (connection,query,params) => {
    return connection.format(query,params)
}


module.exports={getConnectionFromPool,getFormattedQuery}
const { singleSuccessResponse, multipleSuccessResponse, failureResponse } = require('./constant')

const getAll = (connection,query) => {
    return new Promise((resolve,reject) => {
        connection.query(query,(err,result) => {
            if(err){
                console.log(query)
                console.log(err.sqlMessage)
                // reject({error:err.sqlMessage,resCode: 500})
                reject({error:{...failureResponse,message:err.sqlMessage},resCode: 200})
            }else{
                result.length
                    ? resolve( {result:{...multipleSuccessResponse,response:result}, resCode: 200 } )
                    : resolve({ result: {response:[]}, resCode: 204 })
            }
        })
    })
}



const getOne = (connection,query) => {
    // console.log('query === ',query)
    return new Promise((resolve,reject) => {
        connection.query(query,(err,result) => {
            if(err){
                console.log(query,"usercalling")
                console.log(err.sqlMessage)
                // reject( { error: err.sqlMessage, resCode: 500 } )
                reject({error:{...failureResponse,message:err.sqlMessage},resCode: 200})
            }else{
                // console.log(result[0],"result")
                result.length
                    ? resolve( { result: {...singleSuccessResponse,response:result[0]}, resCode: 200 } )
                    : reject( { result: [], resCode: 204 } )
            }
        })
    })
}

const execute = (connection,query) => {
    return new Promise((resolve,reject) => {
        connection.query( query, (err,result) => {
            if(err){
                console.table({query})
                console.log( { error: err.sqlMessage, resCode: 500 } )
                // reject( { error: err.sqlMessage, resCode: 500 } )
                reject({error:{...failureResponse,message:err.sqlMessage},resCode: 200})
            }else{
                
                resolve( { result:{...singleSuccessResponse }, resCode: 200 } )
            }
        } )
    })
}

const bulkInsert = (connection,query) => {
    return new Promise((resolve,reject) => {
        connection.query(query,[params],(err,result) => {
            if(err){
                console.log(query)
                console.log(err.sqlMessage)
                reject( { error:err.sqlMessage,resCode:200 } )
            }else{
                console.log("-----------===================-----------------")
                console.log(result)
                connection.release()
                resolve({result,resCode:200})
            }
        })
    })
}


module.exports={getAll,getOne,bulkInsert,execute}
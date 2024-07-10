const bcrypt = require('bcrypt');



const encryptPassword = (password) =>{
    const saltRounds = 10;
    
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                reject(err)
            }
            else{
                resolve(hash)
            }
        });

    })  

}

const comparePassword = (userPassword,hashPassword) =>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(userPassword,hashPassword,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
}


module.exports={encryptPassword,comparePassword}
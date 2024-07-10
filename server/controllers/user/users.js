const {getConnectionFromPool,getFormattedQuery}=require('../../config/db')
const {getAll,getOne,execute,bulkInsert}=require('../../models/generalOperation')
const {user} =require('./queries')
const {encryptPassword, comparePassword}=require('../../models/global')
const { compare } = require('bcrypt')
const jwt =require('jsonwebtoken')



let accessTokenSecret='0459b8bc0568b097541e21ef2b7d681a045020abe8a0f58fda55465b69bab9daafc5a2e89af117572df91ceb13c9426398fa381ca4d6e79a08a028d3e8bb037f'



const postRegisterUser =async (req,res)=>{
    let connection,formattedQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }


    try{
        let {name,userName,phonenumber,password,email}= await req.body
        let passwordEncrypted = await encryptPassword(password)
        // console.log(result,"ecnrytedpassword")
        formattedQuery=getFormattedQuery(connection,user.post,[name,userName,passwordEncrypted,email,phonenumber])
         await execute(connection,formattedQuery)
         res.status(200).send("successfull uploaded")
    }
    catch(err){
        let {resCode,error}= err
        res.status(400).send(error)
    }
    finally{
        connection.release()
    }

}

const LoginUser = async (req,res)=>{
    let connection,formattedQuery,accessToken
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }
    try{
        let {userName,password}= await req.body
        // let passwordEncrypted = await encryptPassword(password)
        // console.log(passwordEncrypted)
        formattedQuery=getFormattedQuery(connection,user.getLoginCredential,[userName])
        let {result,resCode} = await getOne(connection,formattedQuery);
        let resultBool = await compare(password,result.response.password)
        console.log(resultBool,result.response,"ecnrytedpassword")
        if(resultBool==true){
            accessToken = jwt.sign(result.response,accessTokenSecret,{expiresIn:'365d'})
            console.log(accessToken)
            res.status(resCode).send({token:accessToken,flag:resultBool})
        }
    }
    catch(err){
        let {resCode,error}= err
        res.status(400).send(error)
    }
    finally{
        connection.release()
    }
}


const updateUser = async (req,res) => {
    let connection,formattedQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }


    try{

        let {name,userName,phonenumber,password,email}= await req.body
        let userId = await req.params
        console.log(userId.id)
        // formattedQuery=getFormattedQuery(connection,user.getIdUser,[userId.id])
        // let {result} = await getOne(connection,formattedQuery)
        let query = []
        let values=[]
        // console.log(result.response,"result")
        if(name){
            query.push(`name = ?`)
            values.push(name)
            // result.response.name=name
        }
        if(userName){
            query.push(`user_name=?`)
            values.push(userName)
        }
        if(phonenumber){
            query.push(`phonenumber = ?`)
            values.push(phonenumber)
        }
        if(email){
            query.push(`email=?`)
            values.push(email)
        }
            console.log(user.updateUser+query.join(','),values,"log")
          formattedQuery=getFormattedQuery(connection,user.updateUser+query.join(',')+" where id=? ",[...values,userId.id])
          await execute(connection,formattedQuery)
          res.status(200).send("Successfull")
    }
    catch(err){
        let {resCode,error}= err
        res.status(400).send(error)
        console.log(err)
    }
    finally{
        connection.release()
    }
}



const getAllUser = async (req,res)=>{
    let connection,formattedQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }

    try{
        console.log("helloworld")
        formattedQuery = getFormattedQuery(connection,user.getuser)
        let {result,resCode} = await getAll(connection,formattedQuery)
        console.log(result)
        res.status(resCode).send(result)

    }
    catch(err){
        let {resCode,error}= err
        res.status(resCode).send(error)
    }finally{
        connection.release()
    }


}

const UpdatePassword = async(req,res)=>{
    let connection,formattedQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }

    try{

        let {password}= await req.body
        let userId = await req.params
        console.log(userId.id)
        let passwordEncrypted = await encryptPassword(password)
        formattedQuery=getFormattedQuery(connection,user.updateUser+"password= ? where id=?",[passwordEncrypted,userId.id])
        await execute(connection,formattedQuery)
        res.status(200).send("Successfull")
    }
    catch(err){
        let {resCode,error}=err
        res.status(resCode).send(error)
    }finally{
      connection.release()  
    }


}


const singleUser= async (req,res)=>{
    let connection,formattedQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("no database found")
    }
    
    
    try{
        let {id}= await req.params
        formattedQuery=getFormattedQuery(connection,user.getIdUser,[id])
        let {result,resCode}= await getOne(connection,formattedQuery)
        res.status(resCode).send(result)
    
    }catch(err){
        let {error,resCode}=err
        res.status(resCode).send(error)
    }finally{
        connection.release()
    }




}


const 








module.exports={postRegisterUser,LoginUser,updateUser,getAllUser,UpdatePassword,singleUser}
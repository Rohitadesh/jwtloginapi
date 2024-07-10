const jwt = require('jsonwebtoken')


let accessTokenSecret='0459b8bc0568b097541e21ef2b7d681a045020abe8a0f58fda55465b69bab9daafc5a2e89af117572df91ceb13c9426398fa381ca4d6e79a08a028d3e8bb037f'



const authentication = (req,res,next) =>{
    console.log('$$$$$$$$$$$$$$$$')
    // console.table(req.headers)
    const token = req.headers['authorization']
    // console.log('---Query---',req.query)
    console.log(token,"token")
    console.log('---BODY----',req.body) 
    console.log('token=',token)
    if(!token) return res.status(401).send('no token')
    jwt.verify(token,accessTokenSecret,(err,user)=>{
        if(err) return res.status(403).send('not valid token')
        else{
            req.body= trimString(req.body)
            req.params=trimString(req.params)
            req.query= trimString(req.query)
            req.user=user
            console.log('===after auth===')
            // console.log('==new begins==')
            console.log("param",req.params,"body",req.body,"query",req.query,"user",req.user)
            next()
        }

    })

}



function trimString(object){
    let keys = Object.keys(object)
    if(keys.length){
        for(let key of keys){
            if(typeof(object[key]!="string"))
                continue
                object[key]=object[key].trim()

        }
    }
    return object
}



module.exports={authentication}


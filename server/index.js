const express = require('express')

const app = express()
const port =3080
const cors = require('cors')


app.use(cors('*'))

app.use(express.json())





app.listen(port,()=>{
    console.log(`${port} runing sucessfull`)
})


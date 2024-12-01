const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5001
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('COFFEE SERVER IS RUNNING')
})

app.listen(port,()=>{
    console.log(`COFFEE SERVER IS RUNNING ON PORT : ${port}`)
})
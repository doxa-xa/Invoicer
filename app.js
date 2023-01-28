const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
require('./utils/routing')(app)
const assetsPath = path.join(__dirname,'./public')

app.use(express.static(assetsPath))
app.set('view engine','hbs')
app.set('views','./views')


// app.get('/',(req,res,next)=>{
//     res.send('Express app active')
// })
app.listen(3000,(res)=>{
    console.log('Listening on port 3000')
})
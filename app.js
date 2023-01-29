const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const sessionStore = require('./utils/database').sessionStore
const passport = require('passport')
const app = express()

const assetsPath = path.join(__dirname,'./public')
app.use(express.static(assetsPath))
app.use(session({
    secret:'whatLiesBeyondTheCoridor?',
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge: 1000*60*60*24
    }
}))
require('./utils/passport')
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','hbs')
app.set('views','./views')

require('./utils/routing')(app)
// app.get('/',(req,res,next)=>{
//     res.send('Express app active')
// })
app.listen(3000,(res)=>{
    console.log('Listening on port 3000')
})
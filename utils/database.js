const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.set('strictQuery',false)
const connectMongoStore = mongoose.createConnection('mongodb://127.0.0.1:27017/',{useNewUrlParser:true,useUnifiedTopology:true})
const connect = mongoose.connect('mongodb://127.0.0.1:27017/Users',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) console.log(err)
    console.log('Connected to Database')
})
const CompanySchema = new mongoose.Schema({
    username:String,
    password:String,
    company:String,
    uic:String,
    vat:String,
    address:String,
    contact:String,
    email:String
})

const sessionStore = new MongoStore({
    mongooseConnection:connectMongoStore,
    collection:'sessions'
})

const Company = mongoose.model('Company',CompanySchema)


module.exports = {sessionStore,Company}


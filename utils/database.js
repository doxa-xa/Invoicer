const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectionOptions ={useNewUrlParser:true,useUnifiedTopology:true}
mongoose.set('strictQuery',false)
const connectMongoStore = mongoose.createConnection('mongodb://127.0.0.1:27017/',connectionOptions,(err)=>{
    if(err) console.log(err)
    console.log('Connected to Users Database')
})
const connect = mongoose.connect('mongodb://127.0.0.1:27017/Users',connectionOptions,(err)=>{
    if(err) console.log(err)
    console.log('Connected to Company Database')
})
const CompanySchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    company:String,
    uic:String,
    vat:String,
    address:String,
    contact:String,
    email:String,
    hash:String,
    salt:String
})

const ClientSchema = new mongoose.Schema({
    company:String,
    uic:String,
    vat:String,
    address:String,
    contact:String,
    email:String,
})

const sessionStore = new MongoStore({
    mongooseConnection:connectMongoStore,
    collection:'sessions'
})


const Company = mongoose.model('Company',CompanySchema)
const Client = mongoose.model('Client',ClientSchema)

module.exports = {sessionStore,Company,Client}


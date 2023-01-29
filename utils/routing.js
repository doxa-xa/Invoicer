const express = require('express')
const router = express.Router()
const Company = require('./database').Company
const Client = require('./database').Client
const path = require('path')
const passport = require('passport')
const validatePassword = require('./passport').validatePassword
const genPassword = require('./passport').genPassword
const hbs = require('hbs')
const partialsPath = path.join(__dirname,'./partials')
hbs.registerPartials(partialsPath)

const routes = (router)=>{
//---------- GET Requests
router.get('/',(req,res)=>{
    //console.log(req.session)
    Company.findOne({_id:req.session.passport.user}).then(
        (user)=>{
            res.render('index',{
                user:user.username,
                date: new Date().getFullYear()
            })
        }
    )
    
})
router.get('/logout',(req,res)=>{
    res.redirect('/login')
})
router.get('/about',(req,res)=>{
    res.send('about page')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/add',(req,res)=>{
    Company.findOne({_id:req.session.passport.user}).then(
        (user)=>{
            res.render('client',{
                user:user.username,
                date: new Date().getFullYear()
            })
        }
    )
})
router.get('/invoice',(req,res)=>{
    Client.find()
    .then((data)=>{
        res.render('invoice',{
            data:data,
            date:new Date().getFullYear()
        })
    })
})
router.get('/unauthorised',(req,res,next)=>{
    res.send('<h1>Username or password is invalid. You can try again <a href="/login">here</a></h1>')
})
//----------- POST request
router.post('/login',passport.authenticate('local',{
    failureRedirect:'/unauthorised',
    successRedirect:'/'
}))
router.post('/register',(req,res,next)=>{
        //console.log(req.body)
        const saltHash = genPassword(req.body.password)

        const company = new Company({
            username:req.body.username,
            password:req.body.password,
            company: req.body.companyName,
            uic: req.body.uic,
            vat: req.body.vat,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email,
            hash:saltHash.hash,
            salt:saltHash.salt
        })
        company.save((err,data)=>{
            if(err) console.log(err)
            console.log('New User created')
            res.redirect('/login')
        })
    })

    router.post('/client',(req,res,next)=>{
        const client = new Client({
            company:req.body.companyName,
            uic: req.body.uic,
            vat: req.body.vat,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email,
        })
    
        client.save()
        .then((cli)=>{
            console.log(`Company ${cli.company} added`)
            res.redirect('/add')
        })
    })
} //<==== END OF ROUTER EXPORT SCOPE!!!!



module.exports = routes

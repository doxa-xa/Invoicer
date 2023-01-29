const express = require('express')
const router = express.Router()
const Company = require('./database').Company

const routes = (router)=>{
//---------- GET Requests
router.get('/',(req,res)=>{
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
router.get('/profile',(req,res)=>{
    res.send('profile page')
})
router.get('/invoice',(req,res)=>{
    res.send('invoice page')
})
//----------- POST request
router.post('/login',(req,res,next)=>{

})
router.post('/register',(req,res,next)=>{
        //console.log(req.body)
        const company = new Company({
            username:req.body.username,
            password:req.body.password,
            company: req.body.companyName,
            uic: req.body.uic,
            vat: req.body.vat,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email
        })
        company.save((err,data)=>{
            if(err) console.log(err)
            res.redirect('/login')
        })
    })
}

module.exports = routes

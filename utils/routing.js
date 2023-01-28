const express = require('express')
const router = express.Router()

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
}

module.exports = routes
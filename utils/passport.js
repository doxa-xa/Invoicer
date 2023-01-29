const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const sessionStore = require('./database').sessionStore
const Company = require('./database').Company
const crypto = require('crypto')

const verifyCallback = (username,password,done)=>{
    Company.findOne({username:username})
    .then((user)=>{
        if(!user){return done(null,false)}
        
        const isValid = validatePassword(password,user.hash,user.salt)
        
        if(isValid){
            done(null,user)
        }else{
            done(null,false)
        }
    })
    .catch((err)=>{
        done(err)
    })
}

const Strategy = new LocalStrategy(verifyCallback)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((userId,done)=>{
    Company.findById(userId)
    .then((user)=>{
        done(null,user)
    })
    .catch((err)=>{done(err)})
})

function validatePassword (password, hash, salt){
    let hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return hash === hashVerify
}
function genPassword(password){
    let salt = crypto.randomBytes(32).toString('hex')
    let genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return{
        salt:salt,
        hash:genHash
    }
}

passport.use(Strategy)

module.exports = {validatePassword,genPassword}
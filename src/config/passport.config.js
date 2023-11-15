import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import userModel from "../models/user.model.js"
import jwt from "passport-jwt"

const LocalStrategy = local.Strategy
const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt
const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["token"]
    }
    return token
}

const initializePassport = () => {
    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "Secret-key"
    }, async(jwt_payload, done)=>{
        try{
            return done(null, jwt_payload)
        }
        catch(error){
            return done(error)
        }
    }
    ) 
    )
}

export default initializePassport

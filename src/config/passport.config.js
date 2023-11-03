import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import userModel from "../models/user.model.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email"},
            async(req, username, password, done)=>{
                const {first_name, last_name, email, age, rol} = req.body

                try{
                    let user = await userModel.findOne({ email: username})
                    if(user){
                        console.log("Correo ya registrado, intente con otro correo")
                        return done(null,false);
                    }

                    const hashedPassword = await createHash(password);

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: hashedPassword,
                        rol
                    }

                    let result = await userModel.create(newUser)
                    return done(null, result) 

                } catch(error){
                    return done("Error al obtener el usuario" + error)
                }
            }
        )
    )

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id).lean(); /*OJOOOO */
        done(null,user)
    })
    passport.use("login", new LocalStrategy({usernameField: "email"}, async(username, password, done)=>{
        try
        {
            const user = await userModel.findOne({ email: username})
            if(!user){
                console.log("El usuario no existe")
                return done(null,false)
            }
            if(!isValidPassword(user,password)) return done(null, false)

            return done(null,user)

        }catch(error){
            return done(error)
        }
    }))
    passport.use("github", new GitHubStrategy({
        clientID:"Iv1.92bc74de8bc7545b",
        clientSecret:"9c13b2adb68fe0475f47c09803e45e403f19c3c0",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done)=>{
        try
        {
            let user = await userModel.findOne({ email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "GitHubStrat",
                    age: 10,
                    email: profile._json.email,
                    password:"",
                    rol:"usuario"
                }
                let result = await userModel.create(newUser)
                done(null,result)
            }else{
                done(null,user)
            }
        }catch(error){
            return done(error)
        }
    }))
}

export default initializePassport

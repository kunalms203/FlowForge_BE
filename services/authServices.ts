import bcrypt from "bcrypt"
import { findUserByMail } from "../repository/authRepo"
import { sign } from "jsonwebtoken";

const secret = process.env.JWTSECRET;



const login = async(email:string,name:string,password:string)=>{
    const user = await findUserByMail(email);

    const isAuthenticated = await bcrypt.compare(password,user.passwordHash);


    if(!isAuthenticated){
        throw new Error ("NOT_FOUND")
    }

    if(!secret){
        throw new Error ("Please add JWT secret in ENV")
    }

    const token = sign({id:user.id,name:user.fullName,mail:user.email},secret)

}
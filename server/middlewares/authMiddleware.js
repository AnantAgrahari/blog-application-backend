import jwt from "jsonwebtoken";
import authmodels from "../models/authmodels.js";
const checkIsUserAuthenticated=async(req,res,next)=>{
    let token;
    const{authorization}=req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token=authorization.split(" ")[1];
            //verify token
            const {userID}=jwt.verify(token,"pleaseSubscribe");
            //get user from token
            req.user=await authmodels.findById(userID).select("--password");
            next();
        } catch (error) {
            return res.status(401).json({message:"unAuthorised user"});
        }
    }
    else{
        return res.status(401).json({message:"unauthorised uder"});
    }
};
export default checkIsUserAuthenticated; 

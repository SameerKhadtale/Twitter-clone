import UserModal from  "../Modals/User.modal.js"
import bcrypt from 'bcrypt'

export const Login = async(req , res)=>{
    try{
     const {email , password }=req.body 
 
     if(!email || !password)return res.status(400).json({success :false , message:'email password required'})
     const user = await UserModal.findOne({email})
     if (!user) return res.status(401).json({ success: false, message: "invalid email" })
 
 
     const checkUser =await bcrypt.compare(password , user.password)
     if(!checkUser)return res.status(400).json({success :false , message:'incorrect password'})
 
    if(checkUser){
     return res.status(200).json({success:true , message:"login successful"})
    }
    }
    catch(error){
     console.log(error)
     return res.status(500).json({success:true , message:error})
    }
 } 
 
 export const Register = async(req , res)=>{
     try{
         const {email , name , password} = req.body
 
         if(!name || !email || !password)return res.status(400).json({success :false , message:'all fields required'})
 
         const hashedPassword =await bcrypt.hash(password , 10)
         
         const user = new UserModal ({
             name , email ,
              password : hashedPassword
         })
 
         await user.save()
 
         return res.status(200).json({success:true , message:"registration successful",user})
 
 
     } catch(error){
     console.log(error)
     return res.status(500).json({success:true , message:error})
    }
 }
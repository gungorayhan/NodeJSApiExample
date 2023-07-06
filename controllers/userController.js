const User = require("../models/userModel")
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser =asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fileds ara mandatory")
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered!")
    }

    //Hash Password
    const hashedPassword= await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(200),json({_id:user.id,email:user.emmail})
    }else{
        res.status(400)
        throw new Error("user data is not valid")
    }
    res.json({
        message: "register the user"
    })
})

//@desc User login
//route POST /api/user/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email,username} = req.body;
    if(!email || !username){
        res.status(400)
        throw new Error("All fileds are mandatory")
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=json.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
            },
            process.env.ACCESS_TOKRN_SCRET,
            {expiresIn:"15"}
        );
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }

})

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });
module.exports={
registerUser,
loginUser,
currentUser
}
const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Place add the username"]
        },
        email: {
            type: String,
            required: [true, "Pleace add the email"]
        },
        password: {
            type: String,
            required: [true, "Pleace add the userpassword"]
        }
    }
    ,
    {
        timstamps: true
    })

module.exports=mongoose.model("User",userSchema)
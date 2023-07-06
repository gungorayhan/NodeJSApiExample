const dotenv=require("dotenv").config()
const express= require("express")
const errorHandler = require("./middleware/errHandler");
const connectDB = require("./config/dbConnection");


connectDB();
const app=express();

const PORT =process.env.PORT || 5000;

app.use(express.json())

app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
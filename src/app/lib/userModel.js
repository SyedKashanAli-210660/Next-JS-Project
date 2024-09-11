const {default:mongoose}=require ("mongoose");
const userModel = new mongoose.Schema({
    name:String,
    contact:String,
    password:String,
    area:String,
    email:String,

})

export const userSchema= mongoose.models.users || mongoose.model("users",userModel)
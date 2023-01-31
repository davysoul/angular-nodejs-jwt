import { Schema,model } from 'mongoose';
const userSchema = new Schema({
    email:String,
    password:String
},{
    timestamps:true
});

export const modelUser = model("User",userSchema);
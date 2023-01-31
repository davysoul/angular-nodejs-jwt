import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
export const database = mongoose.connect('mongodb://127.0.0.1/angular-auth',{

}).then(db=>{
    console.log("Database is connected")
}).catch(err=> console.log(err));


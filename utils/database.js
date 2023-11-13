import mongoose from 'mongoose';
let isConnected = false;
export const connectToDb = async ()=>{
    mongoose.set("strictQuery",true);
    if(isConnected){
        console.log('Already connected to the database');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"TechPost",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true;
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}
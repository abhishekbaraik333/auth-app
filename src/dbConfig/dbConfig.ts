import mongoose from "mongoose";

export async function DBConnect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB Connected Successfully!");
            
        })
        connection.on("error",(err)=>{
            console.log("MongoDB Connection Unsuccessful Error:",err);
            process.exit()

        })
    } catch (error) {
        console.log("Something went wrong Error:", error);
        
    }
}
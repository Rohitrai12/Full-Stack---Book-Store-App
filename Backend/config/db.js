import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const mongo_con= process.env.MongoDBURI || "mongodb://localhost:27017";
 export const db=async()=>{
    mongoose
    .connect(mongo_con)
    .then((con)=>{console.log(`Connection established successfully on ${con.connection.host}`)})
    .catch((err)=>{
        console.log(err.message)
        process.exit(1) // connection exit in 1 min
    })   
}
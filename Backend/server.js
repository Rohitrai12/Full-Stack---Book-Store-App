import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";

const port = process.env.PORT || 4000;

// place app on server
app.listen(port,()=>{
    console.log(`server placed successfully on ${port}`)
});
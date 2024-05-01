import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:[true,'fullname required'],

    },
    email: {
        type: String,
        required: [true,'email required'],
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required:[true,'password required'],
        min:[6,'minimum password should be 6'],
        max:[15,'maximum password should be 15'],
        trim:true // trim the extraSpace
    },
},{timestamps:true}
);
const User = mongoose.model("User", userSchema);
export default User;
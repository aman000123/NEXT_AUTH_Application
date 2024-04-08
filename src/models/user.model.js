
import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})


//next js jan nhi pata ki first time run karna hai ya pahle se comnnet
//already bna ho to refrence de do nhi to connect kare
const User = mongoose.models.usersData || mongoose.model("usersData", userScheema);

export default User
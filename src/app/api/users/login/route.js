
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
connect();

export async function POST(NextRequest) {
    try {
        const { email, password } = await NextRequest.json();
        // Check if user already exists
        //database call so await use
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User is not  exists" }, { status: 400 })
        }
        //check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }


        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, "secretkey", { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        //next js me response me coolie rhta hai alag se nhi install karna hota hain
        response.cookies.set("token", token, {
            httpOnly: true,//ab cookies ko server manipulate karega browser kewal dekh pata hai

        })
        return response;

    } catch (error) {
        console.error("Error in login", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

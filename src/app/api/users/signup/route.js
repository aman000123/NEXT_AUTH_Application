

import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { sendEmail } from "@/helpers/mailer";

//next me har file me database ko connect karana hoga
connect()

export async function POST(NextRequest) {
    try {
        const { username, email, password } = await NextRequest.json();
        //req promise hota so await
        //req json me ane pr time le sakta hai 
        //next edge pr run karta hai
        //express js kafi chijen behind see work
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })

        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);


        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword // Save hashed password
        });

        // Save user to database
        const savedUser = await newUser.save();


        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        //send verificatio email

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        console.error("Error in POST signup", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

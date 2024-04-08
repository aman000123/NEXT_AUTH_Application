import { NextResponse, NextRequest } from "next/server";

import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        const { token } = reqBody;
        console.log("token in verify", token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Invalid token details" }, { status: 400 })
        }
        console.log("user in verify", user);

        user.isVarified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()
        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
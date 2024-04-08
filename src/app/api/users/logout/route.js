import { connect } from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        return response;
    } catch (error) {
        console.log("error in logout", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
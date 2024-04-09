
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/helpers/getdatafromToken";


connect()

export async function GET(NextRequest) {

    //EXTRA DATAS FROM TOKEN
    const userId = await getDataFromToken(NextRequest)

    console.log("id===", userId)
    const user = await User.findOne({ _id: userId }).select("-password")//select me -jiske pahle lgta hai usko nho chahiye hota
    console.log("user in profile", user)
    //check if no user
    return NextResponse.json({
        message: "User found",
        data: user
    })
} 
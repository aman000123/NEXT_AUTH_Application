
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        //decode token for geting value
        const decodedToken = jwt.verify(token, "secretkey")

        ///decoded me wahi info milegi jo dala tha generate me login time pr
        // //  const tokenData = {
        //     id: user._id,
        //     username: user.username,
        //     email: user.email
        // }
        return decodedToken.id


    } catch (error) {
        throw new Error(error.message)
    }
}
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
    id: string; // Adjust type based on your JWT payload structure
    iat?: number;
    exp?: number;
  }

export const getDataFromToken = async(request: NextRequest) =>{
    try {
        const token = request.cookies.get("token")?.value || ''
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!) as DecodedToken       
        return decodedToken.id

    } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}
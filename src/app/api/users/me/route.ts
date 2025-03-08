import { DBConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

DBConnect()

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);

   const user = await User.findById(userID).select("-password")
   
   return NextResponse.json({
    message:"User found",
    data: user
   })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

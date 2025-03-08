import { DBConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

DBConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid Token for user" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword,10)

    user.password = hashedNewPassword;
    user.forgotPasswordToken= undefined
    user.forgotPasswordTokenExpiry= undefined
    await user.save();

    
    const response = NextResponse.json({
      message: "Password Reset Successfully",
      success: true,
    });

    response.cookies.set("token","",{
      httpOnly:true,
      expires:new Date(0),
    })

    return response;

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

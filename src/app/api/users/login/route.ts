import User from "@/models/userModel";
import { DBConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "console";

DBConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    if (user.isVerified === false) {
      return NextResponse.json({ error: "Please verify your email"},{status:400});
    }

    // validating Password

    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }

    //creating a token
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

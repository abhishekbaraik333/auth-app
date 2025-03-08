import { DBConnect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

DBConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 400 });
    }

    await sendMail({ email: user.email, emailType: "FORGOT", userID: id });

    return NextResponse.json({
      message: "Reset Password Email sent to User",
      success: true,
    });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

import Connect from "@/dbconfig/connect";
import User from "@/dbmodels/usermodel";
import {NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
export async function POST(request) {
  try {
    await Connect();
    const { username, email, password } = await request.json();
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const isExist = await User.findOne({ email: email, username: username });
    if (isExist) {
      return NextResponse.json({
        message: "User Already Exist",
        status: 205,
      });
    }
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      message: "User Created",
      status: 200,
      newUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured",
      status: 400,
      error,
    });
  }
}

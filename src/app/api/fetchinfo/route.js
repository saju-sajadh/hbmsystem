import { NextResponse } from "next/server";
import Connect from "@/dbconfig/connect";
import User from "@/dbmodels/usermodel";


export async function POST(request){
    try {
        await Connect();
        const { email } = await request.json()
        const user = await User.findOne({ email }).select('-password');
        if(!user) return NextResponse.json({message: 'Unauthorized user', status: 401})
        return NextResponse.json({message: 'ok', status: 200, user: user})
    } catch (error) {
        return NextResponse.json({message: error, status: 500})
    }
}
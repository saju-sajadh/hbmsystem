import { NextResponse } from "next/server";
import Connect from "@/dbconfig/connect";
import User from "@/dbmodels/usermodel";


export async function POST(request){
    try {
        await Connect();
        const { email, name, phone ,gender, bio, username, dob, address, profile } = await request.json()
        const filter = {email: email};
        const update = {name: name, gender: gender, contactNumber: phone, bio: bio, username: username, dateOfBirth: dob, address: address, profilePicture: profile }
        const user = await User.findOneAndUpdate(filter, update, { new: true })
        if(!user) return NextResponse.json({message: 'Unauthorized user', status: 401})
        return NextResponse.json({message: 'ok', status: 200, user: user})
    } catch (error) {
        return NextResponse.json({message: error, status: 500})
    }
}
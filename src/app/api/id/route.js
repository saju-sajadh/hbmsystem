import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Place from '../../../dbmodels/listing'
import User from "@/dbmodels/usermodel";


export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const {id} = await request.json()
        const place = await Place.findById(id)
        const user = await User.findById(place.owner)
        return NextResponse.json({place, user})
    } catch (error) {
        return NextResponse.json({message: 'Internal server error', error})
    }
}
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Place from '../../../dbmodels/listing'


export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const {title, address, filteredArray, description, features, extraInfo, checkin, checkout, maxguest, price, userId} = await request.json()
        const place = new Place({
            owner: userId, 
            title: title, 
            address: address, 
            photos: filteredArray, 
            description: description, 
            features: features, 
            extrainfo: extraInfo, 
            checkin: checkin, 
            checkout: checkout, 
            maxguest: maxguest,
            price:price
          });
      
          await place.save();
          return NextResponse.json({place})
    } catch (error) {
        return NextResponse.json({message: 'Internal server error', error})
    }
}
import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import {foodSchema} from ".././../../lib/foodsModel"
import { NextResponse } from "next/server";


export async function POST (request){
    const payload= await request.json();
    let success=false;
    await mongoose.connect(connectionStr);
    const food = new foodSchema(payload);
    const result = await food.save();
    if(result){
        success=true;
    }
    return NextResponse.json({result, success})
}
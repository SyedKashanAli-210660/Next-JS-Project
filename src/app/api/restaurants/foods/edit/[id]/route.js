import mongoose from "mongoose";
import {NextResponse} from "next/server";
import { connectionStr } from "../../../../../lib/db";
import { foodSchema } from "../../../../../lib/foodsModel";

export async function GET(request,content){
    const id=content.params.id;
    let success=false;
    await mongoose.connect(connectionStr);
    const result =await foodSchema.findOne({_id:id});
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})
}
//For Data Update
export async function PUT(request,content){
    const id = content.params.id;
    const payload= await request.json();
    let success=false;
    await mongoose.connect(connectionStr);
    const result= await foodSchema.findOneAndUpdate({_id:id},payload)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}
import mongoose, { Mongoose } from "mongoose";
import {NextResponse} from "next/server";
import { connectionStr } from "../../../lib/db";
import restaurantSchema from "../../../lib/restaurantsModel";
import {foodSchema} from "../../../lib/foodsModel";

export async function GET(request,content){
    console.log(content.params.id);
    const id = content.params.id;
    await mongoose.connect(connectionStr);
    const details= await restaurantSchema.findOne({_id:id})
    const foodItems= await foodSchema.find({resto_id:id})
    return NextResponse.json({success:true,details,foodItems})
}

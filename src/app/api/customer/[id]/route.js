import mongoose from "mongoose";
import {NextResponse} from "next/server";
import { connectionStr } from "../../../lib/db";
import {foodSchema} from "../../../lib/foodsModel";
import { restaurantSchema } from "../../../lib/restaurantsModel";

export async function GET(request,content){
    console.log(content.params.id);
    const id = content.params.id;
    await mongoose.connect(connectionStr);
    const details= await restaurantSchema.findOne({_id:id})
    const foodItems= await foodSchema.find({resto_id:id})
    return NextResponse.json({success:true,details,foodItems})
}

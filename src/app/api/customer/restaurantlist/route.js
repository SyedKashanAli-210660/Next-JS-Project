import mongoose from "mongoose";
import {NextResponse} from "next/server";
import { connectionStr } from "../../../lib/db";
import { restaurantSchema } from "../../../lib/restaurantsModel";

export async function GET(request){
    let queryParams= request.nextUrl.searchParams
    console.log(queryParams.get('location'))

    let filter={}
    if(queryParams.get("location")){
        let area=queryParams.get("location");
        filter={area:{$regex:new RegExp(area,'i')}}
    }
    else if(queryParams.get("restaurant")){
        let name=queryParams.get("restaurant");
        filter={name:{$regex:new RegExp(name,'i')}}
    }
    await mongoose.connect(connectionStr);

    let result=await restaurantSchema.find(filter)
    return NextResponse.json({success:true,result})
}
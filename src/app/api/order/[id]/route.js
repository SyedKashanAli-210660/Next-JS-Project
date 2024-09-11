import mongoose from "mongoose";
import { orderSchema } from "../../../lib/ordersModel";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../lib/restaurantsModel";
import { connectionStr } from "../../../lib/db";


export async function GET(request) {
    const user_id = request.nextUrl.searchParams.get("id");
    await mongoose.connect(connectionStr);
    let success = false;
    let result = await orderSchema.find({user_Id:user_id});
    if (result.length > 0) {
        let restoData = await Promise.all(result.map(async (item) => {
            let restoInfo = {};
            restoInfo.data = await restaurantSchema.findOne({ _id:item.resto_id });
            restoInfo.amount = item.amount;
            restoInfo.status = item.status;
            return restoInfo;
        }));
        result = restoData;
        success = true;
    }
    return NextResponse.json({ result,success })
}
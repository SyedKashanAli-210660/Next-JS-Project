import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { orderSchema } from "../../lib/ordersModel";
import { connectionStr } from "../../lib/db";


export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionStr)
    let success = false;
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save()
    if (result) {
        success = true;
    }

    return NextResponse.json({ result, success })
}
import mongoose from "mongoose";
import { connectionStr } from "../../lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/restaurantsModel";


console.log("MongoDB Connection String:", connectionStr);

export async function GET() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(connectionStr);
        console.log("Connected to MongoDB");

        const data = await restaurantSchema.find();
        console.log("Data fetched from MongoDB:", data);

        return NextResponse.json({ result: data });
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await mongoose.connection.close(); // Ensure connection is closed
        console.log("MongoDB connection closed");
    }
    
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success=false
    await mongoose.connect(connectionStr)
    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if(result){
            success=true;
        }
        //use for login
    } else {
        let restaurant = new restaurantSchema(payload)
        result = await restaurant.save();
        if(result){
            success=true;
        }
        //use for signup
    }

    return NextResponse.json({ result, success})
}

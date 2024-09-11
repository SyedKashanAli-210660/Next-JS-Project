import { connectionStr } from "../../lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { userSchema } from "../../lib/userModel";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const user = new userSchema(payload);
    const result = await user.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });
}

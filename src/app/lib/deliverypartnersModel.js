import mongoose from "mongoose";

const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    contact:String,
    password:String,
    area:String,
});

export const deliveryPartnersSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnersModel, "deliverypartners");


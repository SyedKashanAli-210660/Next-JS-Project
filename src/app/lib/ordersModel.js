const {default: mongoose}=require("mongoose")

const orderModel = new mongoose.Schema({
    user_Id: mongoose.Schema.Types.ObjectId,
    foodItemsIds:String,
    resto_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:mongoose.Schema.Types.Number,
});

export const orderSchema = mongoose.models.orders || mongoose.model("orders", orderModel);

 
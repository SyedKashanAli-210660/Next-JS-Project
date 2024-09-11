const {default:mongoose}=require ("mongoose");

const restaurantModel = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    area:String,
    contact:String,

    // Add other fields as necessary
});

export const restaurantSchema = mongoose.models.Resto || mongoose.model("Resto", restaurantModel, "Resto");


"use client"
import RestaurantHeader from "../../_components/RestaurantHeader";
import RestaurantFooter from "../../_components/RestaurantFooter";

import './../style.css'
import AddFoodItems from "../../_components/AddFoodItem";
import FoodItemList from "../../_components/FoodItemList";

import { useState } from "react";
const Dashboard=()=>{
    const [addItem,setAddItem]=useState(false)
    return( <div>
        <RestaurantHeader/>
        <button onClick={()=>setAddItem(true)}>Add Food</button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem?<AddFoodItems setAddItem={setAddItem}/>:<FoodItemList/>
        }
                    <RestaurantFooter/>

        
    </div>)
}
export default Dashboard;
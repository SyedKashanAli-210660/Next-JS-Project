'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import './style.css';
import RestaurantFooter from "../_components/RestaurantFooter";
const Restaurant = () => {
    const [login, setlogin] = useState(true);
    return (
        <>
        <div className="container">
            <RestaurantHeader />
            <h1 style={{ textAlign: "center" }}>Restaurant Login/Signup Page</h1>{
                login ? <RestaurantLogin /> : <RestaurantSignUp />

            }
            <div >
                <button className="button-link" onClick={() => setlogin(!login)}>
                    {
                        !login ? "Already Have Account? Login" : "New User? Signup"
                    }
                </button>
                
            </div>
            </div>
            <RestaurantFooter/>
        </>
    );
}

export default Restaurant;

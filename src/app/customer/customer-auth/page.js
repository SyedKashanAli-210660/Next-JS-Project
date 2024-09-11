'use client'
import React, { useState } from 'react'
import UserSignUp from '../../_components/UserSignUp'
import UserLogin from '../../_components/UserLogin'

import CustomerHeader from '../../_components/CustomerHeader'
import RestaurantFooter from '../../_components/RestaurantFooter'

const page = (props) => {
    const [login, setlogin] = useState(true);
    console.log("order flag",props)
    return (
        <>
        <div className="container">
            <CustomerHeader />
            <h1 style={{ textAlign: "center" }}>User Login/Signup Page</h1>{
                login ? <UserLogin redirect={props.searchParams}/> : <UserSignUp redirect={props.searchParams}/>

            }
            <div >
                <button className="button-link" onClick={() => setlogin(!login)}>
                    {
                        !login ? "Already Have Account? Login" : "New User? Signup"
                    }
                </button>
                
            </div>
            <RestaurantFooter/>
            </div>
        </>
    );
}

export default page
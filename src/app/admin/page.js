'use client'
import React from 'react'
import AdminLogin from '../_components/AdminLogin'
import RestaurantFooter from '../_components/RestaurantFooter'
import AdminHeader from '../_components/AdminHeader'

const page = () => {
    return (
        <>
            <div className="container">
                

                <AdminHeader />

                <h1 style={{ textAlign: "center" }}>Admin Login Page</h1>{
                    <AdminLogin />
                }
                <div >
                    <button className="button-link" onClick={() => setlogin(!login)}></button>
                </div>
                <RestaurantFooter />
            </div>
        </>
    )
}

export default page
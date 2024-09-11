'use client'
import React, { useState } from 'react'
import RestaurantFooter from '../_components/RestaurantFooter';
import DeliveryHeader from '../_components/DeliveryHeader';
import { useRouter } from 'next/navigation';
import DeliveryLogin from '../_components/DeliveryLogin';
import DeliverySignUp from '../_components/DeliverySignUp';

const page = () => {
  const [login, setlogin] = useState(true);

  return (
    <>
      <div className="container">
        <DeliveryHeader />

        <h1 style={{ textAlign: "center" }}>Delivery Login/Signup Page</h1>{
                login ? <DeliveryLogin/> : <DeliverySignUp />

            }
        <div >
          <button className="button-link" onClick={() => setlogin(!login)}>
            {
              !login ? "Already Have Account? Login" : "New User? Signup"
            }
          </button>

        </div>
        <RestaurantFooter />
      </div>
    </>
  )
}

export default page
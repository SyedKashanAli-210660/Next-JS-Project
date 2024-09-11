'use client'
import React from 'react'
import RestaurantFooter from './_components/RestaurantFooter'
import Link from 'next/link'
import Headers from './_components/Headers'

const page = () => {
  return (
    <>
      <Headers />
      <div className='home-page-banner'>
        <div className='home'>
          <h1><Link href="/customer" className="custom-link">Customer</Link></h1>
          <h1><Link href="/restaurant" className="custom-link">Sign-up as a Restaurant Owner</Link></h1>
          <h1><Link href="/deliverypartner" className="custom-link">Register as a Delivery Partner</Link></h1>
          <h1><Link href="/admin" className="custom-link">Admin</Link></h1>
        </div>
      </div>
      <RestaurantFooter />
    </>
  )
}

export default page;
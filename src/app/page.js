'use client'
import React from 'react'
import RestaurantFooter from './_components/RestaurantFooter'
import Link from 'next/link'
import RestaurantHeader from './_components/RestaurantHeader'

const page = () => {
  return (<>
  <RestaurantHeader/>
    <div className='main-page-banner'>
    <div className='home'>
        <h1><Link href="/customer">Customer</Link></h1>
          <h1><Link href="/restaurant">Sign-up as a Restaurant Owner</Link></h1>
          <h1><Link href="/deliverypartner">Register aa Delivery Partner</Link></h1>
          
          
          
        </div>
        </div>
                <RestaurantFooter/>
</>
  )
}

export default page;
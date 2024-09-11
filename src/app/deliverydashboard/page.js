'use client'
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader';
import { useRouter } from 'next/navigation';
import RestaurantFooter from '../_components/RestaurantFooter';

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const deliveryData = JSON.parse(localStorage.getItem('delivery'));
      if (!deliveryData) return;

      try {
        const response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${deliveryData._id}`);
        const data = await response.json();
        if (data.success) {
          setMyOrders(data.result);
        } else {
          // Handle failure case
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchMyOrders();
  }, []);

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    if (!delivery) {
      router.push('deliverypartner');
    }
  }, [router]);

  return (
    <div>
      <DeliveryHeader />
      <h1>Delivery Dashboard</h1>
      {
        myOrders.map((item) => (
          <div className='restaurant-wrapper' key={item._id}>
            <h4>Name: {item.data.name}</h4>
            <div>Amount: {item.amount}</div>
            <div>Address: {item.data.area}</div>
            <div>Status: {item.status}</div>
            <div>
              Update Status:
              <select>
                <option>Confirm</option>
                <option>On The Way</option>
                <option>Delivered</option>
                <option>Failed To Deliver</option>
              </select>
            </div>
          </div>
        ))
      }
      <RestaurantFooter />
    </div>
  );
}

export default Page;

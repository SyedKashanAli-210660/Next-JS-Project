'use client';
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import RestaurantFooter from '../_components/RestaurantFooter';
import { Delivery_Charges, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    // Fetch user and cart data from localStorage
    const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) || [];
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate total price of cart items
    const [total] = useState(() => {
        if (cartStorage.length === 1) {
            return cartStorage[0].price;
        } else if (cartStorage.length > 1) {
            return cartStorage.reduce((a, b) => Number(a.price || a) + Number(b.price), 0); // Add initial value
        } else {
            router.push("/customer")// Return 0 if cart is empty
        }
    });

    const [removeCartData, setRemoveCartData] = useState(false);

// Update ordernow function
const ordernow = async () => {

    let user_id=JSON.parse(localStorage.getItem('user'))._id;
    let area =JSON.parse(localStorage.getItem('user')).area;
    let cart = JSON.parse(localStorage.getItem('cart'));

    const foodItemsIds = cart.map(item => item._id).toString();

    // Fetch delivery partner by area
    let deliveryBoyResponse = await fetch('http://localhost:3000/api/deliverypartners/'+area);
    deliveryBoyResponse = await deliveryBoyResponse.json();
    
    let deliveryBoyIds = deliveryBoyResponse.result.map(item => item._id);
    let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
    console.log(deliveryBoyResponse);
    // Handle if no delivery partner is available
    if (!deliveryBoy_id) {
        alert("No Delivery Partner available in your area currently");
        return false;
    } else {
        const resto_id = cart[0].resto_id;
        const collection = {
            user_id,
            resto_id,
            foodItemsIds,
            deliveryBoy_id,
            status: 'confirm',
            amount: Number(total) + (Number(total) * Number(TAX) / 100) + Number(Delivery_Charges),
        };

        // Post order to the server
        let response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            
            body: JSON.stringify(collection),
        });

        response = await response.json();
        
        if (response.success) {
            alert("Order confirmed");
            localStorage.removeItem('cart');
            setRemoveCartData(true); 
            router.push('/profile');
        } else {
            alert("Order failed");
        }
    }
};


    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className='total-price-wrapper'>
                <div className='block-1'>
                    <h2>User Details</h2>
                    <div className='row'>
                        <span>Name: </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className='row'>
                        <span>Address: </span>
                        <span>{userStorage.area}</span>
                    </div>
                    <div className='row'>
                        <span>Contact: </span>
                        <span>{userStorage.contact}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className='row'>
                        <span>Food Price: </span>
                        <span>{total}</span>
                    </div>
                    <div className='row'>
                        <span>Tax: </span>
                        <span>{(total * TAX / 100).toFixed(2)}</span>
                    </div>
                    <div className='row'>
                        <span>Delivery Charges: </span>
                        <span>{Delivery_Charges}</span>
                    </div>
                    <div className='row'>
                        <span>Total Amount: </span>
                        <span>{(Number(total) + (Number(total) * Number(TAX) / 100) + Number(Delivery_Charges)).toFixed(2)}</span>
                    </div>
                    <h2>Payment Method</h2>
                    <div className='row'>
                        <span>Cash on Delivery: </span>
                        <span>{(Number(total) + (Number(total) * Number(TAX) / 100) + Number(Delivery_Charges)).toFixed(2)}</span>
                    </div>
                </div>
                <div className='block-2'>
                    <button onClick={ordernow}>Place Your Order Now!</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default Page;

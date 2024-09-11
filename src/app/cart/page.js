'use client'
import React, { useState, useEffect } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import RestaurantFooter from '../_components/RestaurantFooter';
import { Delivery_Charges, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    // Fetch cart from localStorage on component mount
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCartStorage(cartData);
        calculateTotal(cartData);

    }, []);

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart); // Recalculate total after removing item
        window.location.reload();
    };


// Function to calculate total price
const calculateTotal = (cart) => {
    let cartTotal;

    if (cart.length === 1) {
        cartTotal = cart[0].price;
    } else if(cart.length==0){
        router.push("/customer");
    }else {
        cartTotal = cart.reduce((a, b) => {
            return Number(a.price || a) + Number(b.price);
        }, 0);
    }

    setTotal(cartTotal);
};



    const ordernow = () => {
        if (JSON.parse(localStorage.getItem('user'))) {
            router.push('/order');
        } else {
            router.push('/customer/customer-auth?order=true');
        }
    };

  
    return (
        <div>
            <CustomerHeader />

            <div className="food-item-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((item) => (
                        <div className="list-item" key={item._id}>
                            <div className='list-item-block-1'>
                                <img src={item.img_path} alt={item.name} />
                            </div>
                            <div className='list-item-block-2'>
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                            </div>
                            <div className='list-item-block-3'>Price: {item.price}</div>
                        </div>
                    ))
                        : <h1>No Food Items Right Now</h1>
                }
            </div>

            <div className='total-price-wrapper'>
                <div className='block-1'>
                    <div className='row'>
                        <span>Food Price: </span>
                        <span>{total}</span>
                    </div>
                    <div className='row'>
                        <span>Tax: </span>
                        <span>{(total * TAX / 100)}</span>
                    </div>
                    <div className='row'>
                        <span>Delivery Charges: </span>
                        <span>{Delivery_Charges}</span>
                    </div>
                    <div className='row'>
                        <span>Total Amount: </span>
                        <span>{(Number(total) + (Number(total) * Number(TAX) / 100) + Number(Delivery_Charges))}</span>
                    </div>
                </div>
                <div className='block-2'>
                    <button onClick={ordernow}>Order Now!</button>
                </div>
            </div>

            <RestaurantFooter />
        </div>
    );
};

export default Page;

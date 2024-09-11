'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [cartItem, setCartItem] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : undefined;
    });
    const router = useRouter();

    // Update cart when props.cartData changes
    useEffect(() => {
        if (props.cartData) {
            let updatedCartItem;
            if (cartItem.length === 0 || cartItem[0].resto_id !== props.cartData.resto_id) {
                updatedCartItem = [props.cartData];
            } else {
                updatedCartItem = [...cartItem, props.cartData];
            }
            setCartItem(updatedCartItem);
            localStorage.setItem('cart', JSON.stringify(updatedCartItem));
        }
    }, [props.cartData]);
    

    // Remove item from cart when props.removeCartData changes
    useEffect(() => {
        if (props.removeCartData) {
            if (props.removeCartData === true) {
                // Clear entire cart
                setCartItem([]);
                localStorage.removeItem('cart');
            } else {
                const updatedCartItem = cartItem.filter(item => item._id !== props.removeCartData);
                setCartItem(updatedCartItem);
                localStorage.setItem('cart', JSON.stringify(updatedCartItem));
                if (updatedCartItem.length === 0) {
                    localStorage.removeItem('cart');
                }
            }
        }
    }, [props.removeCartData]);

    const logout = () => {
        localStorage.removeItem('user');
        router.push("/customer/customer-auth");
    };

    const cartNumber = cartItem.length;

    

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 100 }} src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/39-Food-Delivery-Logos-That-Will-Leave-You-Hungry-For-More/food-express-by-gigih-rudya-designcrowd.png" />
            </div>
            <ul>
                <li>
                    <Link href="/customer">Home</Link>
                </li>
                {
                    user ?
                        <>
                            <li>
                                <Link href="/profile">Profile: {user?.name}</Link>
                            </li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                        :
                        <>
                            <li>
                                <Link href="/customer/customer-auth">Login/SignUp</Link>
                            </li>
                        </>
                }
                <li>
                    <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerHeader;

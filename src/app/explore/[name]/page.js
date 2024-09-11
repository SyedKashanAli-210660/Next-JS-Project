'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../../_components/CustomerHeader";
import RestaurantFooter from "../../_components/RestaurantFooter";

const Page = (props) => {
    console.log(props);
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([])
    const [cartData, setCartData] = useState();
    const[cartStorage,setCartStorage]=useState(JSON.parse(localStorage.getItem('cart')))
    const[cartId,setCardId]=useState(cartStorage?()=>cartStorage.map((item)=>{
        return item._id;
    }):[]);
    const [removeCartData,setRemoveCartData]=useState()
    console.log(cartId);
    useEffect(() => {
        loadRestaurantDetails()
    }, []);
    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;

        let response = await fetch("http://localhost:3000/api/customer/" + id)
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.details)
            setFoodItems(response.foodItems);
        }
    }
    const addToCart = (item) => {
        setCartData(item)
        let localCartIds=cartId;
        localCartIds.push(item._id)
        setCardId(localCartIds)
        setCartData(item)
        setRemoveCartData();
    }
    const removeFromCart=(id)=>{
        setRemoveCartData(id);
        var localIds=cartId.filter(item=>item!=id);
        setCardId(localIds)
        setCartData()
    }
    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>

            </div>
            <div className="detail-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>Area: {restaurantDetails?.area}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-item-wrapper">
                {
                    foodItems.length > 0 ? foodItems.map((item) => (
                        <div className="list-item">
                            <img src={item.img_path} />
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                {
                                    cartId.includes(item._id)?
                                    <button onClick={()=>removeFromCart(item._id)}>Remove From Cart</button>:
                                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                                }
                            </div>
                        </div>

                    ))
                        : <h1>No Food Items Right Now</h1>

                }
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default Page;
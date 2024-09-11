'use client'
//import Image from "next/image";
//import styles from "./page.module.css";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')
    const [showLocation, setShowLocation] = useState(false)
    const [restaurants, setRestaurants] = useState([]);
    const router = useRouter();

    useEffect(() => {
        loadlocations();
        loadRestaurants();
    }, [])

    const loadlocations = async () => {
        let response = await fetch('http://localhost:3000/api/customer/locations');
        response = await response.json()
        if (response.success) {
            setLocations(response.result)
        }
    }


    const loadRestaurants = async (params) => {
        let url = "http://localhost:3000/api/customer/restaurantlist";
        if (params?.location) {
            url = url + "?location=" + params.location
        } else if (params?.restaurant) {
            url = url + "?restaurant=" + params.restaurant
        }
        let response = await fetch(url);
        response = await response.json()
        if (response.success) {
            setRestaurants(response.result)
        }

    }

    const handleListItem = (item) => {
        setSelectedLocation(item)
        setShowLocation(false)
        loadRestaurants({ location: item })
    }

    console.log(locations);
    return (
        <main>
            <CustomerHeader />
            <div className="main-page-banner">
                <h1>Food Delivery App</h1>
                <div className="input-wrapper">
                    <input type="text" value={selectedLocation}
                        onClick={() => setShowLocation(true)}
                        className="select-input" placeholder="Select Place" />

                    <ul className="location-list">

                        {
                            showLocation && locations.map((item, index) => (
                                <li key={index} onClick={() => handleListItem(item)}>{item}</li>
                            ))
                        }

                    </ul>
                    <input type="text" 
                        onChange={(event) => loadRestaurants({ restaurant: event.target.value })}
                        className="select-search" placeholder="Enter Restaurant Name" />

                </div>
            </div>
            <div className="restaurant-list-container">

                {
                    restaurants.map((item, index) => (
                        <div key={index} onClick={() => router.push('explore/' + item.name+"?id="+item._id)} className="restaurant-wrapper">

                            <div className="heading-wrapper">
                                <h3>{item.name}</h3>
                                <h5>Contact:{item.contact}</h5>
                            </div>
                            <div className="address-wrapper">
                                <div>Location: {item.area},Email: {item.email}</div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <RestaurantFooter />
        </main>
    );
}
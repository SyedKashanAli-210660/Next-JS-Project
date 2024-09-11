import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeliverySignUp = () => {
    const [password, setPassword] = useState('');
    const [c_password, setC_password] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (delivery) {
            router.push('deliverydashboard')
        }
    }, [])
    const handleSignup = async () => {
        if (!contact || !password || !c_password || !name || password !== c_password || contact.length !== 11) {
            setError(true)
            return false

        } else {
            setError(false)
        }
        console.log(contact, password, c_password, name, area);
        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
            method: "POST",
            body: JSON.stringify({ contact, password, name, area })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            alert("Success");
            router.push('/deliverydashboard')
        } else {
            alert("Failed to Signup")
        }
    }

    return (
        <>
            <h2>Signup</h2>
            <div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Conatct No." className="input-feild"
                        value={contact} onChange={(event) => setContact(event.target.value)} />
                    {
                        error && !contact && (<span className="input-error">Please enter valid contact</span>)
                    }
                    {
                        error && contact && contact.length !== 11 && (<span className="input-error">Contact Number Must be 11 digit long.</span>)
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" className="input-feild"
                        value={password} onChange={(event) => setPassword(event.target.value)} />
                    {
                        error && !password && (
                            <span className="input-error">Please enter valid confirm password</span>
                        )
                    }
                    {
                        error && password && password !== c_password && (
                            <span className="input-error">Password and Confirm Password do not match</span>
                        )
                    }

                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password" className="input-feild"
                        value={c_password} onChange={(event) => setC_password(event.target.value)} />
                    {
                        error && !c_password && (
                            <span className="input-error">Please enter valid confirm password</span>
                        )
                    }
                    {
                        error && c_password && password !== c_password && (
                            <span className="input-error">Password and Confirm Password do not match</span>
                        )
                    }

                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Name" className="input-feild"
                        value={name} onChange={(event) => setName(event.target.value)} />
                    {
                        error && !name && <span className="input-error">Please enter valid name</span>
                    }

                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Area" className="input-feild"
                        value={area} onChange={(event) => setArea(event.target.value)} />
                    {
                        error && !area && <span className="input-error">Please enter valid area</span>
                    }


                </div>
                <div className="input-wrapper">
                    <button onClick={handleSignup} className="button" >Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default DeliverySignUp
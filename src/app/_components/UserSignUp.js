import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/navigation';

const UserSignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_password] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [contact, setContact] = useState('');
    const router = useRouter();
    const [error, setError] = useState(false);

    const handleSignup = async () => {

        if (!email || !password || !c_password || !name || !area || !contact || password !== c_password || contact.length !== 11) {
            setError(true)
            return false

        } else {
            setError(false)
        }
        let response = await fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({
                name, email, password, area, contact
            })
        })
        response = await response.json();
        if (response.success) {
            alert("Success");
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props.redirect?.order) {
                router.push("/order")
            } else {
                router.push("/customer")
            }
        } else {
            alert("failed")
        }
    }
    return (
        <>
            <h2>Signup</h2>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Email id" className="input-feild"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                    {
                        error && !email && <span className="input-error">Please enter valid email</span>
                    }
                    {
                        error && email && !email.includes('@') && (<span className="input-error">Please enter valid email including @ symbol</span>)
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
                    <input type="text" placeholder="Enter Address" className="input-feild"
                        value={area} onChange={(event) => setArea(event.target.value)} />
                    {
                        error && !area && <span className="input-error">Please enter valid Area</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Phone No." className="input-feild"
                        value={contact} onChange={(event) => setContact(event.target.value)} />
                    {
                        error && !contact && (<span className="input-error">Please enter valid contact</span>)
                    }
                    {
                        error && contact && contact.length !== 11 && (<span className="input-error">Contact Number Must be 11 digit long.</span>)
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default UserSignUp;
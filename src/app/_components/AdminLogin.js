'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const adminlogin = () => {
    const credentials = {
        email: 'admin',
        password: 'admin123',
    };

    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('admin'));
        if (admin) {
            router.push('/adminDashboard');
        }else{
            router.push('/admin');
        }
    }, []);

    const handleLogin = () => {
        if (!loginMobile || !loginPassword) {
            setError(true);
            return;
        }
        setError(false);

        // Check if the entered credentials match the predefined ones
        if (loginMobile === credentials.email && loginPassword === credentials.password) {
            const admin = { email: loginMobile };
            localStorage.setItem("admin", JSON.stringify(admin));
            alert("Login Successful");
            router.push('/adminDashboard');
        } else {
            alert("Login Failed. Please try again with the correct email and password.");
        }
    }

    return (
        <>
            <h2>Login</h2>
            <div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="input-feild"
                        value={loginMobile}
                        onChange={(e) => setLoginMobile(e.target.value)}
                    />
                    {error && !loginMobile && <span className="input-error">Please enter a valid email</span>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="input-feild"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {error && !loginPassword && <span className="input-error">Please enter a valid password</span>}
                </div>
                <div className="input-wrapper">
                    <button onClick={handleLogin} className="button">Login</button>
                </div>
            </div>
        </>
    );
}

export default adminlogin;

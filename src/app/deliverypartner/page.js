'use client'
import React, { useEffect, useState } from 'react'
import RestaurantFooter from '../_components/RestaurantFooter';
import DeliveryHeader from '../_components/DeliveryHeader';
import { useRouter } from 'next/navigation';

const page = () => {
  const [loginMobile,setLoginMobile]=useState();
  const [loginPassword,setLoginPassword]=useState();
  
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [contact, setContact] = useState('');
  const router=useRouter();

  useEffect(()=>{
    const delivery=JSON.parse(localStorage.getItem('delivery'));
    if(delivery){
      router.push('deliverydashboard')
    }
  },[])
  const handleSignup = async () => {
    console.log(contact, password, c_password, name, area);
    let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
      method: "POST",
      body: JSON.stringify({ contact, password, name, area })
    })
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery",JSON.stringify(result));
      alert("Success");
      router.push('/deliverydashboard')
    }else{
      alert("Failed to Signup")
    }}

    const handleLogin=async ()=>{
      let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
        method: "POST",
        body: JSON.stringify({ contact:loginMobile, password:loginPassword})
      });
      response = await response.json();
      if (response.success) {
        const{result}=response;
        delete result.password;
        localStorage.setItem("delivery", JSON.stringify(result));
        alert("success");    
        router.push('/deliverydashboard')
      }else{
        alert("Login Failed.Please try again with valid Mobile No. and Password")
      }
    }
  
  return (
    <div>
      <DeliveryHeader/>
     
    <div>
      
        <h1>Delivery Partner</h1>
        <div className='auth-container'>
            <div className='login-wrapper'>
            <h2>Login</h2>
      <div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Phone Number" className="input-feild" 
          value={loginMobile} onChange={(e)=>setLoginMobile(e.target.value)}/>
        
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter Password" className="input-feild"
          value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
        </div>
        <div className="input-wrapper">
          <button  onClick={handleLogin} className="button">Login</button>
        </div>
      </div>

            </div>
            <div className='signup-wrapper'>
            <h2>Signup</h2>
      <div>

      <div className="input-wrapper">
          <input type="text" placeholder="Enter Conatct No." className="input-feild"
            value={contact} onChange={(event) => setContact(event.target.value)} />
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter Password" className="input-feild"
            value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Confirm Password" className="input-feild"
            value={c_password} onChange={(event) => setC_password(event.target.value)} />
         
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Restaurant Name" className="input-feild"
            value={name} onChange={(event) => setName(event.target.value)} />
        
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Area" className="input-feild"
            value={area} onChange={(event) => setArea(event.target.value)} />
        
        </div>
        <div className="input-wrapper">
          <button onClick={handleSignup} className="button" >Sign Up</button>
        </div>
      </div>
            </div>
        </div>
    </div>
    <RestaurantFooter/>
    </div>
  )
}

export default page
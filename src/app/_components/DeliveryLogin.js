import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeliveryLogin = () => {

  const [loginMobile,setLoginMobile]=useState();
  const [loginPassword,setLoginPassword]=useState();
  const [error, setError] = useState(false);
  const router=useRouter();


  useEffect(()=>{
    const delivery=JSON.parse(localStorage.getItem('delivery'));
    if(delivery){
      router.push('deliverydashboard')
    }
  },[])

  const handleLogin=async ()=>{
    if (!loginMobile || !loginPassword) {
        setError(true);
        return;
      }
      setError(false);
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
    <>
    <h2>Login</h2>
      <div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Phone Number" className="input-feild" 
          value={loginMobile} onChange={(e)=>setLoginMobile(e.target.value)}/>
          {
            error && !loginMobile && <span className="input-error">Please enter valid Phone No.</span>
          }
        
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter Password" className="input-feild"
          value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
          {
            error && !loginPassword && <span className="input-error">Please enter valid password</span>
          }
        </div>
        <div className="input-wrapper">
          <button  onClick={handleLogin} className="button">Login</button>
        </div>
      </div>
</>
  )
}

export default DeliveryLogin
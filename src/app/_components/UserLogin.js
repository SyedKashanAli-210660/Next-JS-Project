import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async() => {
    if (!email || !password){
      setError(true)
      return false
    }else{
      setError(false)
    }
    let response=await fetch("http://localhost:3000/api/user/login",{
      method:'POST',
      body:JSON.stringify({email,password})
  })
  response=await response.json();
  if(response.success){
      alert("Success");
      const {result}=response;
      delete result.password;
      localStorage.setItem('user',JSON.stringify(result));
      if(props.redirect?.order){
        router.push("/order")
      }else{
      router.push("/customer")
      }
  }else{
      alert("Failed to Login! , Please try again with valid Email/Password")
  }
    
  };
  return (
    <>
      <h2>User Login</h2>
      <div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Email id" className="input-feild" 
          value={email} onChange={(e)=>setEmail(e.target.value)}/>
        {
            error && !email && <span className="input-error">Please enter valid email</span>
          }
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Enter Password" className="input-feild"
          value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {
            error && !password && <span className="input-error">Please enter valid password</span>
          }
        </div>
        <div className="input-wrapper">
          <button onClick={handleLogin} className="button">Login</button>
        </div>
      </div>
    </>
  )
}

export default UserLogin
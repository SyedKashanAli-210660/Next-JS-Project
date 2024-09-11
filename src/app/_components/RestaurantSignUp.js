import { useRouter } from "next/navigation";
import { useState } from "react"

const RestaurantSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contacterror, setContactError] = useState(false);


  const handleSignup = async () => {
    if (!email || !password || !c_password || !name || !area || !contact) {
      setError(true)
      return false

    } else {
      setError(false)
    }


    console.log(email, password, c_password, name, area, contact);
    let response = await fetch("http://localhost:3000/api/restaurants", {
      method: "POST",
      body: JSON.stringify({ email, password, name, area, contact })
    }
    )
    response = await response.json();
    console.log(response);
    if (response.success) {
      console.log(response);
      const { result } = response
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
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
            error && !email && (<span className="input-error">Please enter valid email</span>)
          }
          {
            error && email && !email.includes('@')&& (<span className="input-error">Please enter valid email including @ symbol</span>)
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
          <input type="text" placeholder="Enter Restaurant Name" className="input-feild"
            value={name} onChange={(event) => setName(event.target.value)} />
          {
            error && !name && <span className="input-error">Please enter valid name</span>
          }
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter Area" className="input-feild"
            value={area} onChange={(event) => setArea(event.target.value)} />
          {
            error && !area && <span className="input-error">Please enter valid Area</span>
          }
        </div>
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
          <button className="button" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </>
  )
}

export default RestaurantSignUp
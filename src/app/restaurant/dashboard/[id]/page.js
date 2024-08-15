'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const EditFoodItems = (props) => {

    console.log(props.params.id);
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [path,setPath]=useState("");
    const [description,setDescription]=useState("");
    const [error,setError]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        handleLoadFoodItem();

    },[])
    const handleLoadFoodItem=async()=>{
        let response= await fetch("http://localhost:3000/api/restaurants/foods/edit/"+props.params.id)
        response= await response.json();
        if(response.success){
            console.log(response.result);
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.img_path)
            setDescription(response.result.description)

        }
    }
    const handleeditfooditem=async ()=>{
        if(!name || !path || !price || !description){
            setError(true);
            return false
        }else{
            setError(false)
        }
        console.log(name,price,path,description);
        let response = await fetch("http://localhost:3000/api/restaurants/foods/edit/"+props.params.id,{
            method:'PUT',
            body:JSON.stringify({name,price,img_path:path,description})
        });
        response= await response.json();
        if(response.success){
            alert("Data Has Been Updated Successfully")
            router.push('../dashboard/')
        }else{
            alert("Error")
        }

        
    }
    return (
        <div className="container">
            <h1>Update Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Name" 
                value={name} onChange={(e)=>setName(e.target.value)}/>
            {
                error && !name && <span className="input-error">* Please enter Valid Name</span>
            }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Price" 
                value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {
                error && !price && <span className="input-error">* Please enter Valid price</span>
            }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Image URL" 
                value={path} onChange={(e)=>setPath(e.target.value)}/>
            {
                error && !path && <span className="input-error">* Please enter Valid path</span>
            }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Description" 
                value={description} onChange={(e)=>setDescription(e.target.value)}/>
            {
                error && !description && <span className="input-error">* Please enter Valid description</span>
            }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleeditfooditem}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button"  onClick={()=>router.push('../dashboard/')}>Done</button>
            </div>
        </div>
    )
}

export default EditFoodItems;
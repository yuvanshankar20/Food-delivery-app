import React from "react";
import Adminheader from "../Components/Adminheader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const UploadItems=()=>{
    const handleSubmit=(event)=>{
        event.preventDefault();
        const form=event.target;
        const foodname=form.foodname.value;
        const imgurl=form.imgurl.value;
        const price=form.price.value;
        const description=form.description.value;
        const category=form.category.value;
        const quantity=1;

        if(foodname==="" || imgurl==="" || price==="" || description==="" || category===""){
            toast.warn("Fill all the fields")
        }

        const foodObj={
            foodname,imgurl,price,description,category,quantity
        }
        console.log(foodObj);

        fetch('http://localhost:5000/upload.food',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(foodObj)
        }).then((res)=> res.json())
        .then((data)=>{
            toast.success("Food added succesfully")
            form.reset();
        })
    }
    return(
        <div>
            <Adminheader/>
            <div className="admin">
                <div className="admin-container">
                    <form onSubmit={handleSubmit} className='uploadform'>
                        <div>
                            <label htmlFor="foodname" value="foodname">Food Name</label><br/>
                            <input type="text" id='foodname' name='foodname' required placeholder="Enter food name"/><br/>
                        </div>
                        <div>
                            <label htmlFor="imgurl" value="imgurl">Image URL</label><br/>
                            <input type='text' id="imgurl" name="imgurl" placeholder="Enter Image URL" required />
                        </div>
                        <div>
                            <label htmlFor="price" value="price">Price</label><br/>
                            <input type="text" id="price" name="price" placeholder="Enter Price" required/>
                        </div>
                        <div>
                            <label htmlFor="description" value="descriptiom">Description</label><br/>
                            <textarea id="description" name="description" rows="4" cols="100" placeholder="Description"></textarea>
                        </div>
                        <div>
                            <label htmlFor="category" value="category">Category</label><br/>
                            <input id="category" name="category" type="text" placeholder="Category"/> 
                        </div>
                        <button type="submit">Add Food</button>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}
export default UploadItems;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Adminheader from "../Components/Adminheader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import '../Styles/update.css';

const Updateitems = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/all-foods`)
            .then((res) => res.json())
            .then((data) => 
            setFoodItems(data));
    }, []);

    const deleteItem = (id) => {
        fetch(`http://localhost:5000/food/${id}`, {
            method: 'DELETE'
        })
        .then((res) => res.json())
        .then((data) => {
            toast.success("Successfully deleted the item!");
            setFoodItems(prevFoodItems => prevFoodItems.filter(item => item._id !== id));
            // You may want to update the state here to reflect the changes
        });
    };

    const displayFoods = foodItems.map(food => (
        <div className="card" key={food._id}>
            <li>
                <div className="div1">
                    <a href='/food'><img src={food.imgurl} alt={food.foodname}></img></a>
                </div>
                <div className="div2">
                    <h4><span>Category : </span>{food.foodname}</h4>
                    <h4><span>Price: </span>₹{food.price}/-</h4>
                </div>
                <div className="div3">
                    <Link to={`/admin/edititems/${food._id}`}>
                        <button>Edit Item <GrEdit /></button>
                    </Link>
                    <button onClick={() => deleteItem(food._id)}>Delete Item <RiDeleteBin6Line /></button>
                </div>
            </li>
        </div>
    ));

    return (
        <div>
            <Adminheader />
            <div className="admin">
                <div className="admin-conatainer">
                    <ul>
                        {displayFoods}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Updateitems;

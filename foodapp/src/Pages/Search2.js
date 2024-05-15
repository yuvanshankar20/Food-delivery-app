import React, { useEffect, useState } from "react";
import '../Styles/Search2.css'
import Navbar from "../Components/Navbar";
import biriyani from '../images/searchimages/biriyani.avif'
import dessert from '../images/searchimages/Dessert.avif'
import cakes from '../images/searchimages/cake.avif'
import tea from '../images/searchimages/tea.avif'
import south from '../images/searchimages/southindian.avif'
import north from '../images/searchimages/northindian.avif'
import pizza from '../images/Pizza.avif'
import { useDispatch, useSelector} from "react-redux";
import { addToCart,deleteFromCart } from "../store/Slice/CartSlice.js";
import { Link } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search2 = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    console.log(cartItems);
    const addCart = (item) => { // Modified to pass the entire item object
        dispatch(addToCart(item));
        notify(); // Dispatching the entire item object
    }

   
    const [foodItems,setFoodItems]=useState([]);
    useEffect(()=>{
            fetch('http://localhost:5000/all-foods').then((res)=>{return res.json();}).then((data)=>{setFoodItems(data);});   
        },[]);

        const [inputValue, setInputValue] = useState(""); 
        const filteredItems = foodItems.filter(item => 
            item.foodname.toLowerCase().includes(inputValue.toLowerCase())
        ); 

    
    const searchitems = filteredItems.map(item => (
        <div className="foods-container" key={item._id}>
            
            <li>
                <Link to={`/food/${item._id}`}>
                    <img src={item.imgurl} alt={item.foodname} />
                </Link>
                <h4><span>Category : </span>{item.foodname}</h4>
                <h4><span>Price: </span>₹{item.price}/-</h4>
                {cartItems.find(cartItem => cartItem._id === item._id) ? (
                    <button onClick={() => removeItem(item)}>Remove from Cart</button>
                ) : (
                    <button onClick={() => addCart(item)}>Add to Cart</button>
                )}
            </li>
        </div>
    ));
    
    const removeItem = (item) => {
        dispatch(deleteFromCart(item));
        notify1();
    };

    const notify = () => toast.success('Item added Successfully!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });

        const notify1 = () => toast.success('Item removed Successfully!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            });
    
    const storedata = useSelector((state) => state.cart);
    console.log(storedata, "storedata");
    return (
        <div>
            <Navbar />
            <div className="container">
                <div>
                    <form>
                        <input
                            type='text'
                            id="myInput"
                            placeholder='Search for restaurants and food'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        ></input>
                    </form>
                </div>
                <div className="dispitems">
                    <h4>Popular Cuisines</h4>
                    <ul>
                        <img src={biriyani} alt="biriyani" />
                        <img src={cakes} alt="cakes" />
                        <img src={dessert} alt="dessert" />
                        <img src={south} alt="south" />
                        <img src={north} alt="north" />
                        <img src={tea} alt="tea" />
                        <img src={pizza} alt="pizza" />
                    </ul>
                </div>
                <div className="popcuisines">
                    <ul className="searchitems">
                        {searchitems}
                    </ul>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default Search2;

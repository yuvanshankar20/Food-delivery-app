import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';
import '../Styles/Navbar.css'
import { BiSolidCart } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { auth } from '../Firebase/FirebaseConfig';

function Navbar() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const totalQuantity = cartItems.items.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/signin");
            console.log("Signed out successfully");
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className='navbar'>
            <a className='atag' href='/'><img src={logo} alt="logo" className='logo' /></a>
            <ul className='nav-links'>
                <h4 className='others' onClick={() => navigateTo('/')}>Home</h4>
                <ul className='nav-link'>
                    <li className='nav' onClick={() => navigateTo('/search2')}>Menu</li>
                    <li className='nav' onClick={() => navigateTo('/offers')}><BiSolidOffer /> &nbsp;Offers</li>
                    <li className='nav' onClick={() => navigateTo('/help')}><FaHandsHelping /> &nbsp;Help</li>
                    {auth.currentUser ? (
                        <>
                            <li className='nav' onClick={handleLogout}><BiLogIn /> &nbsp;Sign Out</li>
                            <li className='nav' onClick={() => navigateTo('/cart')}><BiSolidCart /> &nbsp;Cart<span>&nbsp;{totalQuantity}&nbsp;</span> </li>    
                        </>
                    ) : (
                        <>
                            <li className='nav' onClick={() => navigateTo('/signin')}><BiLogIn /> &nbsp;Sign In</li>
                            <li className='nav'><BiSolidCart /> &nbsp;Cart<span>&nbsp;0&nbsp;</span> </li>    
                        </>
                        
                    )}
                </ul>
            </ul>
        </div>
    );
}

export default Navbar;

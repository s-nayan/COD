import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import Headroom from 'react-headroom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user from "./user.png";
import { useState } from "react";

function Nav(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/Login');
    };

    const sellHandler = () => {
        if (localStorage.getItem('token')) {
            navigate("/Addproduct");
        } else {
            toast("Login first to sell");
            navigate('/Login');
        }
    };

    return (
        <Headroom>
            <nav className="NavBar">
                <div className="bar">
                    <Link to="/" className="logo-container">
                        <div className="brand-title">
                            Clean<span className="highlight">Stream</span>
                        </div>
                    </Link>
                    <div className="search">
                        <input 
                            type="text" 
                            value={props.search || ''} 
                            onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} 
                            placeholder="Search products..."
                        />
                        <button className="search-btn" onClick={props.handleClick}>
                            <i className="fa fa-search" id="sch"></i>
                        </button>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <ul className={`link ${showMenu ? 'active' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/Ourteam">Our Team</Link></li>
                        <li><button className="sell" onClick={sellHandler}>Sell Your Product</button></li>
                    </ul>
                    {!userId && <button className="login"><Link to="/Login">Login/Signup</Link></button>}
                    <div className="user-container" onClick={toggleDropdown}>
                        <img src={user} alt="User" className="user-image1" />
                    </div>
                </div>
            </nav>
            {showDropdown && (
                <div className="dropdown1">
                    <ul>
                        <li><Link to="/like-product">Favourites</Link></li>
                        <li><Link to="/my-products">Your Products</Link></li>
                        <li><Link to="/UserProfile">User Profile</Link></li>
                        <li><button onClick={handelLogout}>Logout</button></li>
                    </ul>
                </div>
            )}
            <ToastContainer />
        </Headroom>
    );
}

export default Nav;

import React, { useEffect, useState } from "react";
import '../components/css/navBar.css';
import { Link, NavLink } from "react-router-dom";
import {getCart} from '../services/userService';



const NavBar = ({user}) => {

  const [count,setCount]=useState(0);

  useEffect(() => {
    async function fetchData(){
      const itms = await getCart();
      setCount(itms.data.length);
    }
    fetchData();
  },[]);

  return (
    <div className="navBar">
      <div className="upper">
        <div className='logo'>
          <Link className="logo-text" to="/">
            ShoppeR@RnC
          </Link> 
        </div>
        
        <div className='accountStuff'>
          {user && user.isAdmin &&
              <NavLink className="section" to="/customers">History</NavLink>
          }
          {!user &&
            <React.Fragment>

                <NavLink className="section" to="/login">
                  Login
                </NavLink>

                <NavLink className="section" to="/register">
                  Register
                </NavLink>

            </React.Fragment>
          }

          {user &&
            <React.Fragment>

                <NavLink className="section" to="/cart">
                  <i className="fa fa-shopping-cart pr-1" aria-hidden="true"></i>
                  <span className="badge badge-pill badge-warning bt"> {count} </span>
                </NavLink>

                <NavLink className="section" to="/profile">
                  {user.name}
                </NavLink>

            <NavLink className="section" to="/logout">
              Logout
            </NavLink>

            </React.Fragment>
          }
        </div>
      </div>
      <div className="down"></div>
    </div>
  );
};
  
export default NavBar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import payverLogo from "../../../img/header/payverLogo.jpg";
import "./Header.scss";

import getCategories from "../../../API/getCategories";
import { connect } from "react-redux";
import pin from "../../../img/header/Pin.svg";
import search from "../../../img/header/search.svg";
import profile from "../../../img/header/profile.png";
import basket from "../../../img/header/Basket.svg";
import logo from "../../../img/header/logo.svg";
const Header = (props) => {

 
  const [categories, setCategories] = useState([]);




  useEffect(() => {
    getCategories().then((response) => {
      if (response.status === 200) {
        setCategories(
          response.data.map((category, index) => {
            return category;
          })
        );
      }
    });
    let storage = JSON.parse(localStorage.getItem("cart"));

  }, []);





  return (
    <>
  
      <header className="header">
        
        <div className="center-header">
          <div className="container-fluid">
            <div className="wrapper">
              <div className="logo" onClick={(event) => {}}>
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="address d-flex align-items-center">
                <img src={pin} alt=""/>
                <p>Александровск-Са...</p>
              </div>
              <div className="search">
                  <div className="input">
                    <input type="text" name="" id=""/>
                    <button><img src={search} alt=""/></button>
                  </div>
              </div>
              <div className="right-side-header">
                <div className="buttons">

                  
                  {props.cart.length > 0 ? (
                    <div className="head right profile">
                      <div className="add_product  d-flex align-items-center">
                      <Link className="basket" to="/basket">
                          <span className=""><img src={basket} alt=""/></span>
                          <span className="badge">{props.cart.length}</span>
                        </Link>
                      </div>
                  </div>
                  ) : (
                    <div className="head right profile">
                      <div className="add_product  d-flex align-items-center">
                      <div className="basket">
                        <span className=""><img src={basket} alt=""/></span>
                          <span className="badge">0</span>
                        </div>
                      </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="accaunt">
              <img src={profile} alt=""/>
            </div>
            </div>
          </div>
        </div>
        <div className="menu" id="menu">
          <div className="container-fluid">
            <nav>
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={(event) => {}}
                  >
                    <Link
                      to={{ pathname: "/", search: `category=${category.id}` }}
                      className="dropbtn"
                    >
                      <div className="subCategoryLeft">
                        <span>{category.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
       
      </header>
    </>
  );
};



const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};


export default connect(mapStateToProps)(Header);

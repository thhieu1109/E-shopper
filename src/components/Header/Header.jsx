import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {

    let user = JSON.parse(localStorage.getItem('User'));

    const navigate = useNavigate();

    const checkLogin = () => {
        if (user) {
            return (

                <div>
                    <li>
                        <Link to="/member/account">
                            <i className="fa fa-user"></i>
                            Account
                        </Link>
                    </li>
                    <li>
                        <a onClick={handleLogout}>
                            <i className="fa fa-lock"></i>
                            Logout
                        </a>
                    </li>


                </div>



            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/member/account">
                            <i className="fa fa-user"></i>
                            Account
                        </Link>
                    </li>

                    <li>
                        <Link to="/member/auth">
                            <i className="fa fa-lock" ></i>
                            Login
                        </Link>
                    </li>
                </div>

            );
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('User');
        alert('Logout successfully!');
        navigate('/');
    }




    return (
        <header id="header">

            {/* HEADER TOP */}
            <div className="header_top">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-phone"></i>
                                            +2 95 01 88 821
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <i className="fa fa-envelope"></i>
                                            info@domain.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* HEADER MIDDLE */}
            <div className="header-middle">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-md-4 clearfix">

                            <div className="logo pull-left ">
                                <Link to="/">
                                    <img src="/images/home/logo.png" alt="logo" />
                                </Link>
                            </div>

                            {/* COUNTRY & CURRENCY */}

                            <div className="btn-group pull-right clearfix luxury-dropdown-group">

                                {/* COUNTRY */}

                                <div className="btn-group">

                                    <button
                                        type="button"
                                        className="btn btn-default dropdown-toggle luxury-btn"
                                        data-toggle="dropdown"
                                    >
                                        USA
                                        <span className="caret"></span>
                                    </button>

                                    <ul className="dropdown-menu luxury-dropdown-menu">

                                        <li>
                                            <a href="#">
                                                Canada
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                UK
                                            </a>
                                        </li>

                                    </ul>

                                </div>

                                {/* CURRENCY */}

                                <div className="btn-group">

                                    <button
                                        type="button"
                                        className="btn btn-default dropdown-toggle luxury-btn"
                                        data-toggle="dropdown"
                                    >
                                        Dollar
                                        <span className="caret"></span>
                                    </button>

                                    <ul className="dropdown-menu luxury-dropdown-menu">

                                        <li>
                                            <a href="#">
                                                Canadian Dollar
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                Pound
                                            </a>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>



                        <div className="col-md-8 clearfix">

                            <div className="shop-menu clearfix pull-right">


                                <ul className="nav navbar-nav">



                                    <li>
                                        <a href="#">
                                            <i className="fa fa-star"></i>
                                            Wishlist
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <i className="fa fa-crosshairs"></i>
                                            Checkout
                                        </a>
                                    </li>

                                    <li>
                                        <Link to="/product/cart">
                                            <i className="fa fa-shopping-cart"></i>
                                            Cart
                                        </Link>
                                    </li>

                                    {checkLogin()}

                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* HEADER BOTTOM */}
            <div className="header-bottom">
                <div className="container">

                    <div className="row">

                        <div className="col-sm-9">

                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className="navbar-toggle"
                                    data-toggle="collapse"
                                    data-target=".navbar-collapse"
                                >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>

                            <div className="mainmenu pull-left">

                                <ul className="nav navbar-nav collapse navbar-collapse">

                                    <li>
                                        <Link to="/" className="active">
                                            Home
                                        </Link>
                                    </li>

                                    <li className="dropdown">

                                        <a href="#">
                                            Shop
                                            <i className="fa fa-angle-down"></i>
                                        </a>

                                        <ul role="menu" className="sub-menu">

                                            <li><a href="#">Products</a></li>
                                            <li><a href="#">Product Details</a></li>
                                            <li><a href="#">Checkout</a></li>
                                            <li><a href="#">Cart</a></li>

                                        </ul>

                                    </li>

                                    <li className="dropdown">

                                        <Link to="/blog/list">
                                                    Blog
                                                </Link>

                                        
                                    </li>

                                    <li>
                                        <a href="#">404</a>
                                    </li>

                                    <li>
                                        <a href="#">Contact</a>
                                    </li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-sm-3">

                            <div className="search_box pull-right">
                                <input
                                    type="text"
                                    placeholder="Search luxury products..."
                                />
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </header>
    );
}

export default Header;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {

    const [products, setProducts] = useState([]);

    const [userIdInDataResponse, setUserIdInDataResponse] = useState([]);

    const getDataProducts = () => {

        axios.get('http://localhost/laravel8/public/api/product')
            .then(response => {
                setProducts(response.data.data);
                setUserIdInDataResponse(response.data.data.map(product => product.id_user));
                console.log('Products:', response.data);
                console.log('User IDs in data response:', userIdInDataResponse);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    useEffect(() => {
        getDataProducts();
    }, []);

    const addToCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ id: productId, quantity: 1 });
        }
        alert("Product added to cart!");
        localStorage.setItem("Cart", JSON.stringify(cartItems)); 
    }



    const renderProducts = () => {
        return products.map((product) => {

            const images = JSON.parse(product.image);
            const firstImage = images[0];

            return (
                <div className="col-sm-4" key={product.id}>
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">

                                <img
                                    src={"http://localhost/laravel8/public/upload/product/" + userIdInDataResponse[products.indexOf(product)] + "/" + firstImage}
                                    alt={product.name}
                                />

                                <h2>${product.price}</h2>
                                <p>{product.name}</p>

                                <a href="#" className="btn btn-default add-to-cart" onClick={() => addToCart(product.id)}>
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to cart
                                </a>

                            </div>

                            <div className="product-overlay">
                                <div className="overlay-content">
                                    <h2>${product.price}</h2>
                                    <p>{product.name}</p>

                                    <a href="#" className="btn btn-default add-to-cart" onClick={() => addToCart(product.id)}>
                                        <i className="fa fa-shopping-cart"></i>
                                        Add to cart
                                    </a>

                                    <Link
                                        to={`/product/detail/${product.id}`}
                                        className="btn btn-default add-to-cart"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        <i className="fa fa-eye"></i>
                                        More Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-plus-square"></i>
                                        Add to wishlist
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-plus-square"></i>
                                        Add to compare
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        });
    };


    return (
        <div>

            <div className="col-sm-9 padding-right">
                <div className="features_items">
                    <h2 className="title text-center">Features Items</h2>

                    {renderProducts()}

                </div>



                <div className="recommended_items">
                    <h2 className="title text-center">recommended items</h2>

                    <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend1.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend1.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/recommend3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default HomePage;
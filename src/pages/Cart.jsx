import React, { useEffect, useState } from "react";
import "../components/Css/Cart.css"
import axios from "axios";
function Cart(props) {



    const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];

    const productsInCart = {};

    cartItems.forEach(item => {
        productsInCart[item.id] = item.quantity;
    });

    // console.log(productsInCart);

    // console.log("Products in Cart State:", productsInCart);

    const [cartData, setCartData] = useState([]);
    // console.log("Cart Data State:", cartData);



    const sendCartDataToServer = () => {

        axios.post("http://localhost/laravel8/public/api/product/cart",
            productsInCart
        ).then(response => {
            console.log("Cart data sent successfully:", response.data);

            setCartData(response.data.data);
        })
            .catch(error => { console.error("Error sending cart data:", error); });
    }

    useEffect(() => {
        sendCartDataToServer();
    }, []);

    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;
        cartData.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
        });
        setTotalPrice(total);
    }

    useEffect(() => {
        calculateTotalPrice();
    }, [cartData]);




    const renderCartItems = () => {
        return cartData.map((item, index) => {

            const images = JSON.parse(item.image);
            const firstImage = images[0];

            const plusQty = () => {
                const newCartData = [...cartData];
                newCartData[index].qty += 1;
                setCartData(newCartData);
                localStorage.setItem("Cart", JSON.stringify(cartData.map(item => ({ id: item.id, quantity: item.qty }))));
            }

            const minusQty = () => {
                const newCartData = [...cartData];

                newCartData[index].qty = newCartData[index].qty - 1 < 1 ? 1 : newCartData[index].qty - 1;

                setCartData(newCartData);
                localStorage.setItem("Cart", JSON.stringify(cartData.map(item => ({ id: item.id, quantity: item.qty }))));
            };

            const removeItem = () => {
                const newCartData = cartData.filter((item, productIndex) => index !== productIndex);
                // index là vị trí của sản phẩm trong cartData ở hàm map bên trên, productIndex là vị trí của sản phẩm sau khi filter
                // Nếu index trùng với productIndex thì sản phẩm đó sẽ bị loại bỏ khỏi newCartData
                setCartData(newCartData);
                localStorage.setItem("Cart", JSON.stringify(newCartData.map(item => ({ id: item.id, quantity: item.qty }))));
            }

            return (
                <div className="item-card" key={index}>
                    <div className="item-img beige">
                        <img
                            src={
                                "http://localhost/laravel8/public/upload/product/" +
                                item.id_user +
                                "/" +
                                firstImage
                            }
                            alt={item.name}
                        />
                    </div>

                    <div className="item-details">
                        <p className="item-brand">{item.id_brand}</p>
                        <p className="item-name">{item.name}</p>

                        <div className="item-bottom">
                            <div className="qty-control">
                                <button className="qty-btn" onClick={minusQty}>
                                    −
                                </button>
                                <span className="qty-num">{item.qty}</span>
                                <button className="qty-btn" onClick={plusQty}>
                                    +
                                </button>
                            </div>

                            <div className="price-wrap">
                                <span className="item-price">
                                    ${(item.price * item.qty).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className="remove-btn" onClick={removeItem}>
                        ×
                    </button>
                </div>
            );
        });
    };



    return (
        <div className="cart-page">
            <div className="cart-wrap">

                {/* ── Header ── */}
                <div className="cart-header">
                    <h1 className="cart-h1">Your Cart</h1>

                </div>

                <div className="cart-layout">

                    {/* ════ LEFT COLUMN ════ */}
                    <div className="cart-left">

                        {/* Free Shipping Bar */}
                        <div className="shipping-bar">
                            <div className="shipping-bar-left">
                                <p className="shipping-bar-text">
                                    You're <b>$42</b> away from <b>FREE SHIPPING!</b>
                                </p>
                                <div className="progress-track">
                                    <div className="progress-fill" style={{ width: "35%" }} />
                                </div>
                            </div>
                            <button className="keep-shopping" >
                                Keep Shopping
                            </button>
                        </div>

                        {/* Item List */}
                        <div className="item-list">

                            {/* ── Item Card (lặp lại cho mỗi sản phẩm) ── */}
                            {renderCartItems()}
                            {/* ── /Item Card ── */}

                        </div>
                        {/* /Item List */}

                    </div>
                    {/* ════ /LEFT COLUMN ════ */}

                    {/* ════ RIGHT COLUMN — Summary ════ */}
                    <div className="summary-panel">
                        <h2 className="summary-title">Summary</h2>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span className="summary-label">Subtotal ({cartData.length} Items)</span>
                                <span className="summary-value">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Shipping Discount</span>
                                <span className="summary-value discount">−$10.00</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Shipping &amp; Handling</span>
                                <span className="summary-value">$8.00</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Tax</span>
                                <span className="summary-value summary-value--muted">Calculated at checkout</span>
                            </div>
                        </div>

                        {/* Promo code */}
                        <div className="promo-row">
                            <input
                                className="promo-input"
                                type="text"
                                placeholder="PROMO CODE"
                            />
                            <button className="promo-btn" >Apply</button>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-total">
                            <span className="total-label">Balance</span>
                            <span className="total-value">${(totalPrice).toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn" >Checkout</button>
                        <p className="summary-note">Free returns · Secure checkout · SSL encrypted</p>
                    </div>
                    {/* ════ /RIGHT COLUMN ════ */}

                </div>
            </div>
        </div>
    );
}

export default Cart;
import React from "react";
import './../css/cart.css';

interface CartProps {
    onClose: () => void;
}

function Cart({ onClose }: CartProps) {

    return (
        <div className="cart-panel open">
            <h1>Your Cart</h1>
            <button onClick={onClose}>Continue Browsing</button>
        </div>
    );
}

export default Cart;
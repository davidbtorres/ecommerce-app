import React from "react";
import './../css/cart.css';

interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
}

interface CartProps {
    cartProducts: Product[];
    onClose: () => void;
    onRemoveProduct: (product: Product) => void;
}

function ProductCard({ product, onRemoveProduct }: { product: Product; onRemoveProduct: (product: Product) => void }) {

    const handleRemoveProduct = () => {
        onRemoveProduct(product);
    }

    return (
        <div className="cart-product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.quantity}</p>
            <button onClick={handleRemoveProduct}>Remove</button>
        </div>
    );
}

function Cart({ cartProducts, onClose, onRemoveProduct }: CartProps) {

    return (
        <div className="cart-panel open">
            <h1>Your Cart</h1>
            <div className="cart-product-list">
                {cartProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onRemoveProduct={onRemoveProduct}/>
                ))}
            </div>
            <button onClick={onClose}>Continue Browsing</button>
        </div>
    );
}

export default Cart;
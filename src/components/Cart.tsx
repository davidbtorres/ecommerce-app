import React from 'react'
import './../css/cart.css'

type CartProps = {
  cartProducts: ProductItem[]
  onClose: () => void
  onRemoveProduct: (product: ProductItem) => void
}

type ProductCartCard = {
  product: ProductItem
  onRemoveProduct: (product: ProductItem) => void
}

function ProductCard({ product, onRemoveProduct }: ProductCartCard) {
  return (
    <div className="cart-product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.quantity}</p>
      <button onClick={() => onRemoveProduct(product)}>Remove</button>
    </div>
  )
}

function Cart({ cartProducts, onClose, onRemoveProduct }: CartProps) {
  return (
    <div className="cart-panel open">
      <h1>Your Cart</h1>
      <div className="cart-product-list">
        {cartProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemoveProduct={onRemoveProduct}
          />
        ))}
      </div>
      <button onClick={onClose}>Continue Browsing</button>
    </div>
  )
}

export default Cart

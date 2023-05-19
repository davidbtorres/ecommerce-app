import React, { useEffect, useState } from 'react';


interface ProductProps {
    productId: string;
}

interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
}

function Product({ productId }: ProductProps) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function fetchProduct() {
          try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
    
        fetchProduct();
      }, []);

    
    return (
        <div>
            {product ? (
                <div>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <button>Add to Cart</button>
                </div>
                ) : (
                <p>Loading...</p>
                )}
        </div>
    )
}

export default Product;
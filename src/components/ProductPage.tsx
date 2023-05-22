import React, { useEffect, useState } from 'react';
import './../css/product.css';


interface ProductPageProps {
    productId: string;
    onAddToCart: (product: Product) => void;
}

// TODO - make global product type
interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
}

function ProductPage({ productId, onAddToCart }: ProductPageProps) {
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

    const handleAddToCart = () => {
        if (product) {
            onAddToCart(product);
        }
    }
    
    return (
        <div className="product">
            {product ? (
                    <> {/* will not leave 'div' in the markup - same as <React.Fragment> */}
                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product-details">
                            <h2>{product.title}</h2>
                            <p>Price: {product.price}</p>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    )
}

export default ProductPage;
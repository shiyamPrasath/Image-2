import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch product data from Django API
        axios.get('http://127.0.0.1:8000/api/products/')
            .then(response => {
                // Properly map data and handle keys with spaces
                setProducts(response.data.map(item => ({
                    id: item._id,
                    name: item["Product Name"],  // Access "Product Name"
                    category: item.Category,
                    subCategory: item.subCategory,
                    detail: item.Detail,
                    image: item.Image
                })));
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    // Slick slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="p-4">
                        <div className="text-white overflow-hidden max-w-xs mx-auto">
                            <img
                                src={product.image}  // Correctly render the image
                                alt={product.name}
                                className="w-64 h-60 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-md md:text-lg font-bold mb-2">{product.name}</h3>
                                <p className="text-sm font-semibold mb-4">{product.detail}</p>
                                <button className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductCarousel;

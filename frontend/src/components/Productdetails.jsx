import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './Utilities/Nav';
import { getProductById } from '../services/product-service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Purple from './Labels/Purple';
import Red from './Labels/Red';
import Green from './Labels/Green';
import Orange from './Labels/Orange';

const Productdetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const productData = await getProductById(productId);
                setProduct(productData);
            } catch (err) {
                setError(err.message || 'Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();

        // Cleanup state on unmount or when productId changes
        return () => {
            setProduct(null);
        };
    }, [productId]);

    if (loading) {
        return (
            <div className="max-w-7xl h-screen mx-auto flex flex-col gap-5">
                <Nav />
                <Skeleton height={350} width="100%" className="mt-5" />
                <div className="mx-56 mt-5">
                    <Skeleton width="100%" height={40} />
                    <div className="flex justify-center items-center gap-10 mt-10">
                        <Skeleton width="40%" height={10} />
                        <div className="text-3xl">
                            <Skeleton width={150} height={30} />
                        </div>
                        <Skeleton width="40%" height={10} />
                    </div>
                    <div className="my-10">
                        <Skeleton count={3} width="100%" height={20} />
                    </div>
                    <div className="text-xl font-semibold mt-4  text-white p-5">
                        <Skeleton width="100%" height={30} />
                    </div>

                    <div className="line"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const getCategoryLabel = (category) => {
        switch (category) {
            case "EDUCATION":
                return <Purple />;
            case "DESIGN":
                return <Red />;
            case "TECHNOLOGY":
                return <Green />;
            case "LIFESTYLE":
                return <Orange />;
            default:
                return <Purple />;
        }
    };

    return (
        <div className="max-w-7xl h-screen mx-auto flex flex-col gap-5">
            <Nav />
            {product.productImage && (
                <div className="flex justify-center mb-5">
                    <img
                        src={product.productUrl}
                        alt={product.title}
                        className="w-full h-96 object-cover"
                    />
                </div>
            )}

            <div className="mx-56">
                <div className="flex justify-center items-center bg-dark text-white p-5">
                    <div className="text-4xl mb-5 flex justify-center items-center text-center leading-relaxed">
                        {loading ? <Skeleton width="80%" height={40} /> : product.title.toUpperCase()}
                    </div>
                </div>
                <div className='flex justify-center items-center gap-10 mt-10'>
                    <div className="line w-full"></div>
                    <div className='text-3xl'>
                        {loading ? <Skeleton width={150} height={30} /> : 'OVERVIEW'}
                    </div>
                    <div className="line w-full"></div>
                </div>

                <div className='mt-5'>{loading ? <Skeleton width={150} height={30} /> : getCategoryLabel(product.category)}</div>

                <div className="leading-relaxed tracking-wide my-10 text-lg text-justify">
                    <p>{loading ? <Skeleton count={5} /> : product.description}</p>
                </div>

                <div className="text-xl font-semibold mt-4 bg-dark text-white p-5">
                    ₹ {loading ? <Skeleton width={80} height={30} /> : product.price.toFixed(2)}
                </div>

                <div className="line"></div>
            </div>
        </div>
    );
};

export default Productdetails;

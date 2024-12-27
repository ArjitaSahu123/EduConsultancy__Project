import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/product-service';
import Adminsidenav from '../Utilities/Adminsidenav';
import Admintop from '../Utilities/Admintop';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Purple from '../Labels/Purple';
import Red from '../Labels/Red';
import Green from '../Labels/Green';
import Orange from '../Labels/Orange';

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
                console.log(productData);
            } catch (err) {
                setError(err.message || 'Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();


        return () => {
            setProduct(null);
        };
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
                <Adminsidenav />
                <div className='w-full'>
                    <Admintop />
                    <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%] h-[80%]'>
                        <div className="flex justify-between items-center pb-5">
                            <div className="flex flex-col gap-1">
                                <div className="font-bold text-3xl mb-5">
                                    <Skeleton width={200} />
                                </div>
                                <div>
                                    <Skeleton width={150} />
                                </div>
                                <div>
                                    <Skeleton width={150} />
                                </div>
                                <div>
                                    <Skeleton width={200} />
                                </div>
                                <div>
                                    <Skeleton width={200} />
                                </div>

                            </div>
                            {/* Skeleton for blog image */}
                            <div className="flex my-5 px-20">
                                <Skeleton width={300} height={200} />
                            </div>
                        </div>
                        <div className='line'></div>


                        {/* Skeleton for blog content */}
                        <div className="space-y-4 mt-4 px-20">
                            <div className="text-xl">
                                <Skeleton width={250} />
                            </div>
                            <div className="text-xl">
                                <Skeleton width={200} />
                            </div>
                            <div className="text-xl">
                                <Skeleton count={5} />
                            </div>
                        </div>
                    </div>
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
        <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
            <Adminsidenav />
            <div className="w-full">
                <Admintop />
                <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]">
                    <div className="flex justify-between items-start pb-5">
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-lg mb-5">Product Details</div>
                            <div>
                                <span className="font-semibold">Product ID : </span>
                                <span>{product.productId}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Price :</span> ₹ {product.price.toFixed(2)}
                            </div>
                            <div>
                                <span className="font-semibold">Rating :</span> {product.rating}
                            </div>
                            <div className='flex'>
                                <span className="font-semibold">Category : </span>
                                <span>{getCategoryLabel(product.category)}</span>
                            </div>
                        </div>
                        <div>
                            {product.productUrl && (
                                <div className="flex my-5 px-20">
                                    <img
                                        src={product.productUrl}
                                        alt={product.title}
                                        className="max-w-xs max-h-96 object-contain rounded-xl"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='line'></div>


                    <div className="space-y-4 mt-4 px-20">
                        <div className="text-2xl font-semibold">
                            {product.title}
                        </div>
                        <div className="leading-relaxed tracking-wide my-10">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productdetails;

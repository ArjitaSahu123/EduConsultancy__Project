import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Green from './Labels/Green';
import Orange from './Labels/Orange';
import Purple from './Labels/Purple';
import Red from './Labels/Red';
import Nav from './Utilities/Nav';
import star from "../assets/star.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAllProducts } from '../services/product-service';
import { useProducts } from './Context/ProductContext';

const Home = () => {
  const { products, setFetchedProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setFetchedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchProducts();
  }, [setFetchedProducts]);

  const renderLabel = (category) => {
    switch (category) {
      case 'TECHNOLOGY':
        return <Green />;
      case 'LIFESTYLE':
        return <Orange />;
      case 'EDUCATION':
        return <Purple />;
      case 'DESIGN':
        return <Red />;
      default:
        return null;
    }
  };

  if (initialLoad) {
    return (
      <div className="max-w-7xl h-screen mx-auto">
        <Nav />
        <div className="flex">
          <div className="w-3/4">
            <div className="font-semibold text-2xl mt-10 ">Products</div>
            <div className="flex flex-wrap gap-6 mt-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[270px] pcard flex flex-col gap-2 rounded-2xl"
                >
                  <Skeleton height={200} className="rounded-xl" />
                  <div className="flex flex-col gap-2 h-full">
                    <div className="flex justify-between items-center px-4">
                      <Skeleton width={60} height={20} />
                      <Skeleton width={80} height={20} />
                    </div>
                    <div className="font-semibold line-clamp-1 text-sm px-4">
                      <Skeleton width="100%" />
                    </div>
                    <div className="line-clamp-2 text-sm px-4">
                      <Skeleton width="100%" />
                    </div>
                    <div className="flex-grow"></div>
                    <div className="line"></div>
                    <div className="flex justify-between items-center px-4 mb-3">
                      <Skeleton width={60} height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl h-screen mx-auto">
      <Nav />
      <div className="flex">
        <div className="w-full">
          <div className="font-semibold text-2xl mt-10">Products</div>
          {loading && <div>Loading...</div>} {/* Show a simple loader if needed */}
          <div className="flex flex-wrap gap-6 mt-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link
                  to={`/products/${product.productId}`}
                  key={product.productId}
                  className="block pcard w-full sm:w-[270px] flex flex-col gap-2 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div>
                    <img
                      src={product.productUrl || 'default_image.png'}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2 h-full">
                    <div className="flex justify-between items-center px-4">
                      {renderLabel(product.category)}
                      <div className="font-bold text-lg text-orange poppins-semibold">
                        ₹ {product.price}
                      </div>
                    </div>
                    <div className="font-semibold line-clamp-1 text-sm px-4">
                      {product.title}
                    </div>
                    <div className="line-clamp-2 text-sm px-4">
                      {product.description}
                    </div>
                    <div className="flex-grow"></div>
                    <div className="line"></div>
                    <div className="flex justify-between items-center px-4 mb-3">
                      <div className="flex justify-center items-center gap-1">
                        <img
                          src={star}
                          alt="Rating"
                          className="w-4 h-4 rounded-xl"
                        />
                        <div className="font-semibold">
                          {product.rating || '0.0'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

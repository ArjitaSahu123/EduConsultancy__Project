import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../services/product-service';
import { useProducts } from '../Context/ProductContext';
import Adminsidenav from '../Utilities/Adminsidenav';
import Productform from './Productform';
import edit from "../../assets/edit (1) 3.png";
import trash from "../../assets/trash-2 3.png";
import Purple from '../Labels/Purple';
import Red from '../Labels/Red';
import Green from '../Labels/Green';
import Orange from '../Labels/Orange';
import Skeleton from 'react-loading-skeleton';
import Admintop from "../Utilities/Admintop";
import { toast } from 'react-toastify';
import ConfirmationModal from '../Utilities/Confirmationmodel';

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

const Products = () => {
    const { products, setFetchedProducts, deleteProductById } = useProducts();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const products = await getAllProducts();
            setFetchedProducts(products); // Update context
        } catch (err) {
            setError(err.message || 'Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // eslint-disable-next-line 
    }, []);

    const handleProductUpdate = () => {
        fetchProducts();
        setShowForm(false);
    };

    const toggleForm = (mode = 'create', product = null) => {
        setFormMode(mode);
        setCurrentProduct(product);
        setShowForm(!showForm);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await deleteProduct(productToDelete.productId);
            deleteProductById(productToDelete.productId);
            toast.success('Product deleted successfully!');
            setShowConfirmModal(false);
        } catch (err) {
            fetchProducts();
            toast.error(`Error deleting the product: ${err.message}`);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex justify-between bg-[#F9FAFB] poppins-regular'>
            <Adminsidenav />
            <div className='w-full'>
                <Admintop />

                <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
                    <div>
                        <div className='font-semibold text-lg'>Product's Management</div>
                        <div className='text-[#737791]'>Manage your products efficiently</div>
                    </div>
                    {/* Button to open the Productform for Create */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => toggleForm('create')}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md btn"
                        >
                            Add New Product
                        </button>
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-[black] bg-opacity-70 z-50 flex justify-center items-center">
                            <Productform
                                mode={formMode}
                                productData={currentProduct}
                                onClose={() => setShowForm(false)}
                                onProductUpdated={handleProductUpdate}
                            />
                        </div>
                    )}

                    {/* Product Table */}
                    <div className="overflow-x-auto mt-5">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">#</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Category</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Title</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Description</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Price</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Rating</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    Array(5).fill().map((_, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={40} /></td>
                                            <td className="py-2 px-4 border-b text-center"><Skeleton width={80} /></td>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={120} /></td>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={150} /></td>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={60} /></td>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={50} /></td>
                                            <td className="py-2 px-4 border-b text-sm text-center"><Skeleton width={100} /></td>
                                        </tr>
                                    ))
                                ) : (
                                    products.length > 0 ? (
                                        products.map((product) => (
                                            <tr
                                                key={product.productId}
                                                className="hover:bg-gray-100 cursor-pointer"
                                                onClick={() => navigate(`/admin/products/${product.productId}`)}
                                            >
                                                <td className="py-2 px-4 border-b text-sm text-center">{product.productId}</td>
                                                <td className="py-2 px-4 border-b text-center">{getCategoryLabel(product.category)}</td>
                                                <td className="py-2 px-4 border-b text-sm truncate-content">
                                                    {product.title.length > 40 ? `${product.title.slice(0, 40)}...` : product.title}
                                                </td>
                                                <td className="py-2 px-4 border-b truncate-content text-sm">
                                                    {product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description}
                                                </td>
                                                <td className="py-2 px-4 border-b text-sm text-center">₹{product.price.toFixed(2)}</td>
                                                <td className="py-2 px-4 border-b text-sm text-center">{product.rating}</td>
                                                <td className="py-2 px-4 border-b flex gap-2 justify-center">
                                                    <button
                                                        className="text-white py-1 px-3 rounded-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleForm('edit', product);
                                                        }}
                                                    >
                                                        <img src={edit} alt="Edit icon" className="w-6" />
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white py-1 px-3 rounded-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setProductToDelete(product); // Set the product to delete
                                                            setShowConfirmModal(true); // Show confirmation modal
                                                        }}
                                                    >
                                                        <img src={trash} alt="Delete icon" className="w-6" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                No products available.
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteProduct}
                message="Are you sure you want to delete this product?"
            />
        </div>
    );
};

export default Products;

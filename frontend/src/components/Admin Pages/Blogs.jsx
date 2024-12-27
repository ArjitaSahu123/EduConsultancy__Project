import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs, deleteBlog } from '../../services/blog-service';
import Adminsidenav from '../Utilities/Adminsidenav';
import Blogform from './Blogform';
import Purple from '../Labels/Purple';
import Red from '../Labels/Red';
import Green from '../Labels/Green';
import Orange from '../Labels/Orange';
import edit from "../../assets/edit (1) 3.png";
import trash from "../../assets/trash-2 3.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Admintop from '../Utilities/Admintop';
import { useBlogs } from '../Context/BlogContext';
import Confirmationmodel from '../Utilities/Confirmationmodel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
    const { blogs, setFetchedBlogs, deleteBlogById } = useBlogs();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [currentBlog, setCurrentBlog] = useState(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const navigate = useNavigate();


    const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const blogs = await getAllBlogs();
            setFetchedBlogs(blogs); // Set blogs in context
        } catch (err) {
            setError(err.message || 'Failed to fetch blogs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(); // eslint-disable-next-line 
    }, []);

    const handleBlogUpdate = () => {
        fetchBlogs();
        setShowForm(false);
    };

    const toggleForm = (mode = 'create', blog = null) => {
        setFormMode(mode);
        setCurrentBlog(blog);
        setShowForm(!showForm);
    };

    const handleDeleteBlog = async () => {
        try {
            await deleteBlog(blogToDelete.blogId);
            deleteBlogById(blogToDelete.blogId);
            toast.success('Blog deleted successfully!');
        } catch (err) {
            toast.error(`Error deleting the blog: ${err.message}`);
        }
    };

    const formatDate = (date) => {
        if (new Date(date).getTime() === 0) {
            return '--';
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

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
                        <div className='font-semibold text-lg'>Blog's Management</div>
                        <div className='text-[#737791]'>Blog's Summary</div>
                    </div>

                    {/* Button to open the Blogform for Create */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => toggleForm('create')}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md btn"
                        >
                            Publish New Blog
                        </button>
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-[black] bg-opacity-70 z-50 flex justify-center items-center">
                            <Blogform
                                mode={formMode}
                                blogData={currentBlog}
                                onClose={() => setShowForm(false)}
                                onBlogUpdated={handleBlogUpdate}
                            />
                        </div>
                    )}

                    {/* Blog Table */}
                    <div className="overflow-x-auto mt-5">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">#</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Category</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Title</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">UID</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Created At</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Updated At</th>
                                    <th className="py-2 px-4 border-b text-center text-sm poppins-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Skeleton rows when loading
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={50} />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <Skeleton width={100} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={150} />
                                            </td>
                                            <td className="py-2 px-4 text-sm border-b">
                                                <Skeleton width={80} />
                                            </td>
                                            <td className="py-2 px-4 text-sm border-b">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-2 px-4 text-sm border-b">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <div className="flex gap-2">
                                                    <Skeleton width={30} />
                                                    <Skeleton width={30} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                        <tr
                                            key={blog.blogId}
                                            className="hover:bg-gray-100 cursor-pointer"
                                            onClick={() => navigate(`/admin/blogs/${blog.blogId}`)}
                                        >
                                            <td className="py-2 px-4 border-b text-sm">{blog.blogId}</td>
                                            <td className="py-2 px-4 border-b ">{getCategoryLabel(blog.category)}</td>
                                            <td className="py-2 px-4 border-b text-sm truncate-content">{blog.title.length > 50
                                                ? `${blog.title.slice(0, 50)}...`
                                                : blog.title}</td>
                                            <td className="py-2 px-4 text-sm border-b">{blog.userId}</td>
                                            <td className="py-2 px-4 text-sm border-b">
                                                {formatDate(blog.createdAt)}
                                            </td>
                                            <td className="py-2 px-4 text-sm border-b text-center">
                                                {formatDate(blog.updatedAt)}
                                            </td>
                                            <td className="py-2 px-4 border-b flex gap-2">
                                                <button
                                                    className=" text-white py-1 px-3 rounded-md"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click
                                                        toggleForm('edit', blog);
                                                    }}
                                                >
                                                    <img
                                                        src={edit}
                                                        alt='userimg'
                                                        className='w-6'
                                                    />
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white py-1 px-3 rounded-md"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click
                                                        setBlogToDelete(blog); // Set blog to delete
                                                        setIsDeleteConfirmOpen(true); // Open confirmation modal
                                                    }}
                                                >
                                                    <img
                                                        src={trash}
                                                        alt='userimg'
                                                        className='w-6'
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            No blogs available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Confirmationmodel
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteBlog}
                message="Are you sure you want to delete this blog?"
            />
        </div>
    );
};

export default Blogs;

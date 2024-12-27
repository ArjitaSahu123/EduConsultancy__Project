import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Adminsidenav from '../Utilities/Adminsidenav';
import { getBlogById } from '../../services/blog-service';
import { getUserById } from '../../services/user-service';
import Admintop from '../Utilities/Admintop';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import Purple from '../Labels/Purple';
import Red from '../Labels/Red';
import Green from '../Labels/Green';
import Orange from '../Labels/Orange';

const Blogdetails = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const blogData = await getBlogById(blogId);
                setBlog(blogData);

                if (blogData.userId) {
                    const userData = await getUserById(blogData.userId);
                    setUser(userData);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();

 
        return () => {
            setBlog(null);
            setUser(null);
        };
    }, [blogId]);

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

    if (!blog) {
        return <div>No blog found.</div>;
    }
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


    return (
        <div className="flex justify-between bg-[#F9FAFB] poppins-regular">
            <Adminsidenav />
            <div className='w-full'>
                <Admintop />
                <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
                    <div className="flex justify-between items-center pb-5">
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-lg mb-5">Blog Details</div>

                            <div>
                                <span className="font-semibold">Blog ID : </span>
                                <span>{blog.blogId}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Author ID : </span>
                                <span>{blog.userId}</span>
                            </div>

                            <div>
                                <span className="font-semibold">Author Name : </span>
                                <span>{user ? `${user.name} (${user.email})` : 'Loading user info...'}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Created At : </span>
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Updated At : </span>
                                <span>{formatDate(blog.updatedAt)}</span>
                            </div>
                            <div className='flex'>
                                <span className="font-semibold">Category : </span>
                                <span>{getCategoryLabel(blog.category)}</span>
                            </div>
                        </div>
                        <div>
                            {blog.blogUrl && (
                                <div className="flex my-5 px-20">
                                    <img
                                        src={blog.blogUrl}
                                        alt={blog.title}
                                        className="max-w-xs max-h-96 object-contain rounded-xl"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='line w-full'></div>


                    {/* Blog details display */}
                    <div className="space-y-4 mt-4 px-20">
                        <div className="text-2xl font-semibold">
                            {blog.title}
                        </div>

                        <div className="leading-relaxed tracking-wide my-10">
                            <span className="text-4xl font-bold italic text-purple-700 font-cursive">
                                {blog.content.charAt(0)}
                            </span>
                            {blog.content.slice(1)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blogdetails;

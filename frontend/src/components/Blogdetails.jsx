import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './Utilities/Nav';
import { getBlogById } from '../services/blog-service';
import { getUserById } from '../services/user-service';
import view from "../assets/view.png";
import Purple from './Labels/Purple';
import Red from './Labels/Red';
import Green from './Labels/Green';
import Orange from './Labels/Orange';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

        // Cleanup state on unmount
        return () => {
            setBlog(null);
            setUser(null);
        };
    }, [blogId]);

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

    if (!blog) {
        return <div>No blog found.</div>;
    }

    const formatDate = (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const year = dateObject.getFullYear();

        return `${day} ${month.toUpperCase()}, ${year}`;
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
        <div className="max-w-7xl h-screen mx-auto flex flex-col gap-5">
            <Nav />

            {blog.blogUrl && (
                <div className="flex">
                    <img
                        src={blog.blogUrl}
                        alt={blog.title}
                        className="w-full h-96 object-cover"
                    />
                </div>
            )}

            <div className='mx-56'>
                <div className="flex justify-center items-center bg-dark text-white p-5">
                    <div className="text-4xl mb-5 flex justify-center items-center text-center leading-relaxed">
                        {loading ? <Skeleton width="80%" height={40} /> : blog.title.toUpperCase()}
                    </div>
                </div>

                <div className='flex justify-center items-center gap-10 mt-10'>
                    <div className="line w-full"></div>
                    <div className='text-3xl'>
                        {loading ? <Skeleton width={150} height={30} /> : 'INSIGHTS'}
                    </div>
                    <div className="line w-full"></div>
                </div>

                <div className='mt-5'>{loading ? <Skeleton width={150} height={30} /> : getCategoryLabel(blog.category)}</div>
                <div className="text-lg text-justify leading-relaxed tracking-wide my-10">
                    <span className="text-4xl font-bold italic text-purple-700 font-cursive">
                        {loading ? <Skeleton width={50} height={50} /> : blog.content.charAt(0)}
                    </span>
                    {loading ? <Skeleton count={5} /> : blog.content.slice(1)}
                </div>

                <div className="text-xl font-semibold mt-4 bg-dark text-white p-5">
                    <div className='flex justify-between items-center mb-2'>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-[white] p-2 rounded-full'>
                                <img
                                    src={view}
                                    alt={blog.title}
                                    className="max-w-7 max-h-7 object-contain"
                                />
                            </div>

                            <span className='font-semibold text-lg'>
                                {loading ? <Skeleton width={120} height={20} /> : (user ? `${user.name}` : 'Loading user info...')}
                            </span>
                        </div>
                        <div>
                            <span className='font-semibold text-lg poppins-regular'>
                                {loading ? <Skeleton width={100} height={20} /> : formatDate(blog.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
            </div>
        </div>
    );
};

export default Blogdetails;

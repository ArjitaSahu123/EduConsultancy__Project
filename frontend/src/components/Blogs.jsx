import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from './Context/BlogContext';
import m1 from '../assets/m1.png';
import Nav from './Utilities/Nav';
import Sidenav from './Utilities/Sidenav';
import Purple from './Labels/Purple';
import Red from './Labels/Red';
import Green from './Labels/Green';
import userimg from '../assets/userimg.png';
import { getAllBlogs } from '../services/blog-service';
import { getUserById } from '../services/user-service';
import Orange from './Labels/Orange';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Blogs = () => {
  const { blogs, setFetchedBlogs } = useBlogs();
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await getAllBlogs();

      const blogsWithAuthors = await Promise.all(
        response.map(async (blog) => {
          if (blog.userId) {
            const user = await getUserById(blog.userId);
            return { ...blog, author: user.name };
          }
          return { ...blog, author: 'Unknown Author' };
        })
      );

      setFetchedBlogs(blogsWithAuthors);
    } catch (error) {
      console.error('Failed to fetch blogs:', error.message);
    } finally {
      setInitialLoad(false); 
    }
  }, [setFetchedBlogs]);

  useEffect(() => {
    fetchBlogs(); 

    const interval = setInterval(() => {
      fetchBlogs();
    }, 60000);

    return () => clearInterval(interval); 
  }, [fetchBlogs]);

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'EDUCATION':
        return <Purple />;
      case 'DESIGN':
        return <Red />;
      case 'TECHNOLOGY':
        return <Green />;
      case 'LIFESTYLE':
        return <Orange />;
      default:
        return <Purple />;
    }
  };

  if (initialLoad) {
    return (
      <div className="max-w-7xl h-screen mx-auto">
        <Nav />
        <div className="flex">
          <div className="w-3/4">
            <div className="font-semibold text-2xl mt-10">Blogs</div>
            <div className="mt-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="pcard flex rounded-xl gap-10 mb-6">
                  <div>
                    <Skeleton height={240} width={320} className="rounded-xl" />
                  </div>
                  <div className="flex flex-col w-1/2 mt-5 justify-between">
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="100%" height={15} count={3} />
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex justify-center items-center gap-2">
                        <Skeleton circle width={32} height={32} />
                        <Skeleton width={100} height={20} />
                      </div>
                      <Skeleton width={80} height={25} />
                      <Skeleton width={50} height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Sidenav />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl h-screen mx-auto">
      <Nav />
      <div className="flex">
        <div className="w-3/4">
          <div className="font-semibold text-2xl mt-10 sticky">Blogs</div>
          <div className="mt-10 ">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link key={blog.blogId} to={`/blogs/${blog.blogId}`} className="block">
                  <div className="pcard flex rounded-xl gap-10">
                    <div>
                      <img
                        src={blog.blogUrl || m1}
                        alt={blog.title}
                        className="w-80 h-60 object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 mt-5 justify-between">
                      <div className="font-semibold line-clamp-2 text-lg">{blog.title}</div>
                      <div className="line-clamp-3 text-md">{blog.content}</div>
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex justify-center items-center gap-2">
                          <div>
                            <img
                              src={userimg}
                              alt={blog.author}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="font-semibold">{blog.author}</div>
                        </div>
                        <div className="bg-grey px-4 py-1 text-sm rounded-sm flex justify-center items-center font-semibold">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div>{getCategoryLabel(blog.category)}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-lg mt-10">No Blogs Found</div>
            )}
          </div>
        </div>
        <Sidenav />
      </div>
    </div>
  );
};

export default Blogs;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Red from '../Labels/Red';
import Purple from '../Labels/Purple';
import Orange from '../Labels/Orange';
import Green from '../Labels/Green';
import s1 from '../../assets/s1image.png';
// import s2 from '../../assets/s2image.png';
// import s3 from '../../assets/s3image.png';
import { getAllBlogs } from '../../services/blog-service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Sidenav = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.reverse().slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blogs:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  if (loading) {
    return (
      <div className='w-[30%] h-full sidenav mt-6 p-5 transform rounded-2xl '>
        <div>
          <div><label htmlFor="search" className="font-semibold text-2xl">Search</label></div>
          <div className="mt-2 mb-4 ">
            <input type="text" id="search" name="search" placeholder="What do you want to learn..." className="p-2 rounded-md text-sm bg-lightblue w-full inputborder" required />
          </div>
        </div>
        <div className='line'></div>

        <div className='mt-5'>
          <div className='font-semibold text-2xl'>Categories</div>
          <div className='flex flex-col justify-evenly h-48'>
            <Purple />
            <Orange />
            <Green />
            <Red />
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-10 w-[100%] rounded-xl'>
          {/* Skeleton placeholders for blog cards */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className=' rounded-xl flex justify-between items-center'>
              {/* Skeleton for blog image */}
              <Skeleton height={96} width={96} className="rounded-xl" />

              <div className='w-64 mx-1'>
                {/* Skeleton for blog title */}
                <Skeleton width="60%" height={20} />
                {/* Skeleton for blog content */}
                <Skeleton width="100%" height={15} count={1} />
                <div className="flex justify-between items-center mb-5">
                  <div className="flex justify-center items-center gap-2">
                    {/* Skeleton for user avatar */}
                    <Skeleton circle width={32} height={32} />
                    {/* Skeleton for author name */}
                    <Skeleton width={100} height={20} />
                  </div>
                  {/* Skeleton for date */}
                  <Skeleton width={50} height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='w-[30%] h-full sidenav mt-6 p-5 transform rounded-2xl sticky top-32'>
      <div>
        <div><label htmlFor="search" className="font-semibold text-2xl">Search</label></div>
        <div className="mt-2 mb-4 "><input type="text" id="search" name="search" placeholder="What do you want to learn..." className="p-2 rounded-md text-sm bg-lightblue w-full inputborder" required /></div>
      </div>
      <div className='line'></div>

      <div className='mt-5'>
        <div className='font-semibold text-2xl'>Categories</div>
        <div className='flex flex-col justify-evenly h-48'>
          <Purple />
          <Orange />
          <Green />
          <Red />
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-10 w-[100%] rounded-xl'>
        {blogs.map((blog) => (
          <Link key={blog.blogId} to={`/blogs/${blog.blogId}`} className='card rounded-xl flex justify-between items-center overflow-hidden'>
            <div className='bg-black w-24 h-24 overflow-hidden'>
              <img src={blog.blogUrl || s1} alt="Description" className="w-full h-full object-cover" />
            </div>
            <div className='w-64 mx-1'>
              <div className='font-semibold line-clamp-2 text-sm ml-4'>{blog.title}</div>
              <div className='flex w-full justify-around mt-4'>
                <div className='bg-grey px-1 py-1 text-sm rounded-sm flex justify-center items-center font-semibold'>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',  
                    day: 'numeric'   
                  })}
                </div>
                <div>{getCategoryLabel(blog.category)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Sidenav;
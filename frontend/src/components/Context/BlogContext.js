import React, { createContext, useState, useContext } from 'react';


const BlogContext = createContext();


export const useBlogs = () => {
  return useContext(BlogContext);
};


export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  

  const setFetchedBlogs = (blogs) => {
    setBlogs(blogs);
  };


  const deleteBlogById = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.blogId !== blogId));
  };

  return (
    <BlogContext.Provider value={{ blogs, setFetchedBlogs, deleteBlogById }}>
      {children}
    </BlogContext.Provider>
  );
};

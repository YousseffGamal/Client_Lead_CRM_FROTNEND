// src/pages/BlogsArticles.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import Layout from '../../component/Layout/Layout';
import BlogCard from '../../component/Card/Card';
import First from "../../assets/images/young-woman-working-laptop-library 1.png"
import axiosInstance from '../../axios';

const BlogsArticles = () => {

  // States of blogs
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch blogs 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/getallblogs'); 
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Layout headerText="Blogs & Articles" pageType="blogs">
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <p>Loading blogs...</p>  
          ) : error ? (
            <p>{error}</p>  
          ) : blogs?.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard 
                  image={blog.image || First}  // Use the default image if not provided
                  title={blog.name}
                  description={blog.description}
                />
              </Grid>
            ))
          ) : (
            <p>No blogs available.</p> 
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default BlogsArticles;

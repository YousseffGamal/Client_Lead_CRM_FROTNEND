import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BlogCard = ({ image, title, description }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '22.53px',
        boxShadow: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        sx={{
          padding: '22px 22px 0 22px',
          objectFit: 'cover',
          display: 'block',
          margin: '0 auto',
        }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
        <Typography
          className='CardTitle'
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            marginTop: '34px',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '1.8rem' }, // Responsive font sizes
          }}
        >
          {title}
        </Typography>
        <Typography
          className='CardDescr'
          sx={{ marginTop: '12px', marginBottom: '29px' }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

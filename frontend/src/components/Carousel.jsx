import React from 'react';
import { TextField, Button } from '@mui/material'; // Import Material-UI components

const Carousel = () => {
  // Array of placeholder image URLs
  const images = [
    'https://via.placeholder.com/1000x500',
    'https://via.placeholder.com/1000x500',
    'https://via.placeholder.com/1000x500',
    'https://via.placeholder.com/1000x500',
    'https://via.placeholder.com/1000x500'
  ];

  // State to keep track of the index of the current image
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Function to handle moving to the previous image
  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Function to handle moving to the next image
  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      {/* Search bar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"100px" }}> {/* Adjusted padding */}
        <TextField label="Search" variant="outlined" />
        <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>Search</Button>
      </div>
      
      {/* Carousel */}
      <div className="carousel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}> {/* Adjusted height */}
        <button onClick={prevImage}>Previous</button>
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{ width: '1000px', height: '500px' }} // Apply inline styles for width and height
        />
        <button onClick={nextImage}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;

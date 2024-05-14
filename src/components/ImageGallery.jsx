import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Gallery from './styledComponents/Gallery';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery className="gallery">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={() => {
            onImageClick(image.largeImageURL);
          }}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

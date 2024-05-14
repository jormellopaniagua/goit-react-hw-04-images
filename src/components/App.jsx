import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Page from './styledComponents/page';

const API_KEY = '43149026-ef77b7f6113923fd46a63d2ce';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
    // eslint-disable-next-line
  }, [query, page]);

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&per_page=12`;
      const response = await axios.get(url);
      const newImages = response.data.hits;

      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handlePreviousImageClick = () => {
    const currentIndex = images.findIndex(
      img => img.largeImageURL === selectedImage
    );
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    const previousImage = images[previousIndex].largeImageURL;
    setSelectedImage(previousImage);
  };

  const handleNextImageClick = () => {
    const currentIndex = images.findIndex(
      img => img.largeImageURL === selectedImage
    );
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex].largeImageURL;
    setSelectedImage(nextImage);
  };

  return (
    <Page className="App">
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Error: {error}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal
          imageUrl={selectedImage}
          onCloseModal={handleCloseModal}
          onPreviousImageClick={handlePreviousImageClick}
          onNextImageClick={handleNextImageClick}
        />
      )}
    </Page>
  );
};

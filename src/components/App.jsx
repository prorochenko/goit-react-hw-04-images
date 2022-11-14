import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import * as API from '../Services/images-fetch';
import LoadingComponent from './Loader/Loader';
import PictureFoundFail from './ImageGallery/ImageError';
import css from '../Styles/main.module.scss';

export default function App() {
  // state = {
  //   images: [],
  //   showModal: false,
  //   pictureName: '',
  //   error: null,
  //   status: 'idle',
  //   page: 1,
  // };

  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pictureName, setPictureName] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (pictureName === '') {
      return;
    }

    async function fetchImages() {
      // const { page, pictureName } = this.state;

      // if (prevState.pictureName !== pictureName || prevState.page !== page) {
      try {
        setStatus('pending');
        const images = await API.FetchPhoto(pictureName, page);
        if (images.length === 0) {
          return Promise.reject(
            new Error(`Sorry, we didn't find images with name "${pictureName}"`)
          ).catch(error => setError(error), setStatus('rejected'));
          // error => this.setState({error,
        } else {
          // this.setState(prevState => ({
          //   images: [...prevState.images, ...images],
          //   status: 'resolved',
          // }));
          setImages(prevState => [...prevState, ...images]);
          setStatus('resolved');
        }
      } finally {
        setStatus('idle');
      }
    }
    fetchImages();
  }, [pictureName, page]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const loadMore = () => {
    // page: prevState.page + 1,
    setPage(prevState => prevState + 1);
    // status: 'pending',
    setStatus('pending');
  };

  const handleFormSubmit = pictureName => {
    // this.setState({ pictureName, images: [], page: 1 });
    setPictureName(pictureName);
    setImages([]);
    setPage(1);
  };

  // const { showModal, error, status, images } = this.state;

  return (
    <div>
      <ToastContainer autoClose={3000} />

      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && images.length === 0 ? (
        <div className={css.text}>
          Hello! &#x270C; Please, enter an image name &#x1F446;
        </div>
      ) : (
        ''
      )}
      {status === 'rejected' ? (
        <div>
          <PictureFoundFail message={error.message} />
        </div>
      ) : (
        ''
      )}
      <ImageGallery images={images} />
      {status === 'pending' && <LoadingComponent />}
      {images.length > 0 && <Button onClick={loadMore} />}
      {showModal && <Modal onClose={toggleModal} onClick={toggleModal} />}
    </div>
  );
}

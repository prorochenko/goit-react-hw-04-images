import React, { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import * as API from '../Services/images-fetch';
import LoadingComponent from './Loader/Loader';
import PictureFoundFail from './ImageGallery/ImageError';
import css from '../Styles/main.module.scss';

export default class App extends PureComponent {
  state = {
    images: [],
    showModal: false,
    pictureName: '',
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, pictureName } = this.state;

    if (prevState.pictureName !== pictureName || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const images = await API.FetchPhoto(pictureName, page);
        if (images.length === 0) {
          return Promise.reject(
            new Error(`Sorry, we didn't find images with name "${pictureName}"`)
          ).catch(error => this.setState({ error, status: 'rejected' }));
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            status: 'resolved',
          }));
        }
      } finally {
        this.setState({ status: 'idle' });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName, images: [], page: 1 });
  };

  render() {
    const { showModal, error, status, images } = this.state;

    return (
      <div>
        <ToastContainer autoClose={3000} />

        <Searchbar onSubmit={this.handleFormSubmit} />

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
        {images.length > 0 && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.toggleModal} />
        )}
      </div>
    );
  }
}

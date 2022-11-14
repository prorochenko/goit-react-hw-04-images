import { useState } from 'react';
import css from './ImageGalleryItem.module.scss';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

// import css from './ImageGalleryItem/ImageGalleryItem.module.css';

// export default function ImageGalleryItem({ picture: { hits } }) {
//   return (
//     <ul>
//       <li key={hits[0].id}>
//         <img src={hits[0].largeImageURL} alt={hits[0].tags} width="300" />
//       </li>
//     </ul>
//   );
// }

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  // state = {
  //   showModal: false,
  // };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  // const { id, webformatURL, largeImageURL, tags } = this.props;
  return (
    <>
      <li key={id} className={css.item}>
        <img
          className={css.img}
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

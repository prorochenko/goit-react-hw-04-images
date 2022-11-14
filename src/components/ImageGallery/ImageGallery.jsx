import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.scss';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  const elements = images.map(image => (
    <ImageGalleryItem
      key={image.id}
      webformatURL={image.webformatURL}
      tags={image.tags}
      largeImageURL={image.largeImageURL}
    />
  ));

  return <ul className={css.list}>{elements}</ul>;
};
export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

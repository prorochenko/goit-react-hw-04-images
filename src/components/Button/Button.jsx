import { AiOutlineClose } from 'react-icons/ai';
import css from './Button.module.scss';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.Button}>
      Load More
    </button>
  );
};

export const ButtonClose = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.Btnclose}>
      <AiOutlineClose size={25} />
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
};

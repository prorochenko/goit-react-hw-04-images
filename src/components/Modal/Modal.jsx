import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import css from './Modal.module.scss';
import { ButtonClose } from '../Button/Button';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', escKeyDown);
    return () => {
      window.removeEventListener('keydown', escKeyDown);
    };
  });

  const escKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // const { children } = this.props;

  return createPortal(
    <div className={css.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={css.Modal__content}>hey</div>
      {children}
      <ButtonClose onClick={onClose} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

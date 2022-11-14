import { createPortal } from 'react-dom';
import React, { Component } from 'react';

import css from './Modal.module.scss';
import { ButtonClose } from '../Button/Button';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escKeyDown);
  }

  escKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.Modal__backdrop} onClick={this.handleBackdropClick}>
        <div className={css.Modal__content}>hey</div>
        {children}
        <ButtonClose onClick={this.props.onClose} />
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

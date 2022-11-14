import React, { PureComponent } from 'react';
import css from './Searchbar.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default class Searchbar extends PureComponent {
  state = {
    pictureName: '',
  };

  handleNameChange = e => {
    this.setState({ pictureName: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.pictureName.trim() === '') {
      toast.error('Please, enter picture name');
      return;
    }

    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <form className={css.Searchbar} onSubmit={this.handleSubmit}>
        <input
          className={css.input__box}
          type="text"
          name="pictureName"
          value={this.state.pictureName}
          onChange={this.handleNameChange}
          placeholder={'Enter Image Name'}
        />
        <button className={css.SearchForm__button} type="submit">
          Search
        </button>
      </form>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import { useState } from 'react';
import css from './Searchbar.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  // state = {
  //   pictureName: '',
  // };
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = e => {
    setPictureName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (pictureName.trim() === '') {
      toast.error('Please, enter picture name');
      return;
    }

    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <form className={css.Searchbar} onSubmit={handleSubmit}>
      <input
        className={css.input__box}
        type="text"
        name="pictureName"
        value={pictureName}
        onChange={handleNameChange}
        placeholder={'Enter Image Name'}
      />
      <button className={css.SearchForm__button} type="submit">
        <span>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

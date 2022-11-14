import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30395749-07b69c31ba3bc7894f96bd68a';

export const FetchPhoto = async (searchWord, page) => {
  const response = await axios.get(
    `/?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return response.data.hits;
};

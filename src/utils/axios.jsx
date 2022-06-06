import axios from 'axios'

export const customFetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
  });
  
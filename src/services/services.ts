import axios from 'axios';
import {API_URL} from '../constants/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const get = async (url, body) => {
  let res, err;
  try {
    // console.log('body', body);
    const response = await fetch(
      'https://jadwali-be.mtechub.com/services/getServiceTypesByService',
      {
        method: 'GET',
        body: JSON.stringify(body),
      },
    );
    const data = response.json();
    res = data;
  } catch (error) {
    err = error;
  }
  return {res, err};
};

export const post = async (url, body, token, id) => {
  console.log(url, token, id, body);
  let res, err;
  try {
    const response = await api.post(url, body, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return {res, err};
};

export const put = async (url, body, token, id) => {
  console.log(url, token, id, body);
  let res, err;
  try {
    const response = await api.put(url, body, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return {res, err};
};

export const del = async (url, token, id) => {
  console.log(url, token, id);
  let res, err;
  try {
    const response = await api.delete(url, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return {res, err};
};

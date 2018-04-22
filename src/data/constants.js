export const SERVER_URL = process.env.NODE_ENV === 'production'?
  'https://codenamesai.herokuapp.com/api/' : 'http://127.0.0.1:5000/api/';

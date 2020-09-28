export const path = {
  dashboard: '/',
  login: '/login',
  auth: '/auth/:provider/callback',
};

// export const basename = '/';
//
export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://quillbot-backend.herokuapp.com'
  : process.env.NODE_ENV === 'staging' ? 'http://localhost:1337' : 'http://localhost:1337';

export const APP_URL = process.env.NODE_ENV === 'production'
  ? 'https://quillbot-frontend.herokuapp.com'
  : process.env.NODE_ENV === 'staging' ? 'http://localhost:3000' : 'http://localhost:3000';
export const SOCKET_PORT = process.env.NODE_ENV === 'production'
  ? 1342
  : process.env.NODE_ENV === 'staging' ? 1342 : 1342;
  


export const color = {
  // primary: '#ffaa00',
  // accent: '#000000',
  // success: '#53D769',
  // danger: '#fC3D39',
  // disabled: '#cfcfcf'
};

export const DEV_MODE = true;

export default { BASE_URL, path, color, DEV_MODE, SOCKET_PORT };

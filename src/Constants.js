// Constants.js
const prod = {
  url: {
    API_URL: `https://workflow118.herokuapp.com`
  }
};
const dev = {
  url: {
    API_URL: 'http://localhost:3001'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;

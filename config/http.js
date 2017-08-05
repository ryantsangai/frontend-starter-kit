import axios from 'axios'

// if (window.location.hostname == 'localhost') {
//   axios.defaults.baseURL = 'http://localhost:9000'
// } else {
//   axios.defaults.baseURL = `//${window.location.hostname}`
// }


axios.interceptors.request.use(function (request) {
  // let token = store.get('cms.token')
  // if (token) config.headers['Authorization'] = `Bearer ${token}`
  return request;
}, function(error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response.data;
}, function(error) {
  return Promise.reject(error.response.data);
});
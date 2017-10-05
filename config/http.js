import axios from 'axios'

// if (window.location.hostname == 'localhost') {
//   axios.defaults.baseURL = 'http://localhost:9000'
// } else {
//   axios.defaults.baseURL = `//${window.location.hostname}`
// }

let app = axios.create()

app.interceptors.request.use(function (request) {
  // let token = store.get('cms.token')
  // if (token) config.headers['Authorization'] = `Bearer ${token}`
  return request;
}, function(error) {
  return Promise.reject(error);
});

// Add a response interceptor
app.interceptors.response.use(function (response) {
  return response.data;
}, function(error) {
  // add api error handling here, like 401 prompt login
  return Promise.reject(error.response.data);
});

export { app }
app.factory('httpService', function ($http) {
  const BASE_URL = '/api';
  function getHeaders() {
    return {
      'x-access-token': localStorage.getItem('token') || ''
    }
  }

  return {
    get(url, params = {}) {
      return $http.get(`${BASE_URL}${url}`, {
        headers: getHeaders(),
        params
      });
    },
    post(url, payload = {}) {
      return $http.post(`${BASE_URL}${url}`, payload, {
        headers: getHeaders()
      });
    },
    put(url, payload = {}) {
      return $http.put(`${BASE_URL}${url}`, payload, {
        headers: getHeaders()
      });
    },
    delete(url, params) {
      return $http.delete(`${BASE_URL}${url}`, {
        headers: getHeaders(),
        params
      });
    }
  }
});
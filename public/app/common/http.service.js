app.factory('httpService', function ($http) {
  function getHeaders() {
    return {
      'x-access-token': localStorage.getItem('token') || ''
    }
  }

  return {
    get(url, params = {}) {
      return $http.get(url, {
        headers: getHeaders(),
        params
      });
    },
    post(url, payload = {}) {
      return $http.post(url, payload, {
        headers: getHeaders()
      });
    },
    put(url, payload = {}) {
      return $http.put(url, payload, {
        headers: getHeaders()
      });
    },
    delete(url, params) {
      return $http.delete(url, {
        headers: getHeaders(),
        params
      });
    }
  }
});
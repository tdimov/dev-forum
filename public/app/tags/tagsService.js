app.factory('tagsService', function($http, $q, identity, httpService) {
  return {
    index(params) {
      return httpService.get('/tags', params);
    },
    get(id) {
      return httpService.get(`/tags/${id}`);
    },
    create(payload) {
      return httpService.post('/tags', payload);
    }
  };
});
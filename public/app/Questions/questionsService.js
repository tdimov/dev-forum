app.factory('questionsService', function($http, $q, httpService) {
    return {
      index(params) {
        return httpService.get('/questions', params);
      },
      get(id) {
        return httpService.get(`/questions/${id}`);
      },
      create(payload) {
        return httpService.post('/questions', payload);
      },
      vote(id, isPositive) {
        return httpService.put(`/questions/${id}/vote`, { isPositive });
      }
    };
});
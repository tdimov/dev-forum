app.factory('rankingService', function($http, $q, httpService) {
  return {
    getCurrentRanking(params) {
      return httpService.get('/rankings', params);
    },
    create(payload) {
      return httpService.post('/rankings', payload);
    }
  };
});
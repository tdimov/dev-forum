app.factory('answersService', function ($http, $q, httpService) {
  return {
    create(questionId, payload) {
      return httpService.post(`/questions/${questionId}/answers`, payload);
    },
    vote(questionId, answerId, isPositive) {
      return httpService.put(`/questions/${questionId}/answers/${answerId}/vote`, { isPositive });
    }
  }
});
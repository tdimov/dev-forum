module.exports = {
  transformSingleToBaseModel(data) {
    return {
      id: data.id,
      name: data.name
    };
  },
  transformMultipleToBaseModel(data) {
    return data.map(item => this.transformSingleToBaseModel(item));
  }
};

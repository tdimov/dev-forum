function transformToTagModel(tag) {
  return {
    id: tag._id,
    name: tag.name
  };
}

function transformToTagsModel(tags) {
  return tags.map(tag => transformToTagModel(tag));
}

module.exports = {
  transformToTagModel,
  transformToTagsModel
};

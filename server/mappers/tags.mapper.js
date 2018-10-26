function transformToTagModel(tag) {
  return {
    id: tag._id,
    name: tag.name,
    description: tag.description
  };
}

function transformToTagsModel(tags) {
  return tags.map(tag => transformToTagModel(tag));
}

module.exports = {
  transformToTagModel,
  transformToTagsModel
};

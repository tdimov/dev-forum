const Tag = require('mongoose').model('Tag');

async function index(query) {
  const { limit, offset, ...filters } = query;

  const tags = await Tag.find(filters)
    // .sort('-postedDate')
    .limit(Number(limit))
    .skip(Number(offset))
    .exec();

  return tags;
}

module.exports = {
  index
}

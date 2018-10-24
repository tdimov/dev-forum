const Tag = require('mongoose').model('Tag');
const _ = require('underscore');
const tagsValidator = require('../utilities/validation/tagsValidator');

module.exports = {
  getTags(req, res, next) {
    Tag.find({})
      .sort('-questions')
      .exec((err, tags) => {
        if (err) {
          console.log(`Cannot load tags: ${err}`);
          res.send({
            success: false,
            message: 'An error occurred while loading tags!'
          });
          res.end();
          return;
        }
        const models = [];

        for (let i = 0, len = tags.length; i < len; i++) {
          const tagVM = {
            _id: tags[i]._id,
            name: tags[i].name,
            description: tags[i].description,
            questionsCount: tags[i].questions.length
          };

          models.push(tagVM);
        }

        res.send(models);
        res.end();
      });
  },
  getTagsAskQuestion(req, res) {
    Tag.find({}).exec((err, tags) => {
      if (err) {
        console.log(`Cannot load the tag: ${err}`);
        res.send({
          success: false,
          message: 'An error occurred while loading tags!'
        });
        res.end();
        return;
      }

      const models = [];

      for (let i = 0, len = tags.length; i < len; i++) {
        const tagVM = { name: tags[i].name };
        models.push(tagVM);
      }

      res.send(models);
      res.end();
    });
  },
  getTagsAside(req, res) {
    Tag.find({})
      .sort('-questions')
      .limit(10)
      .exec((err, tags) => {
        if (err || !tags) {
          console.log(`getLimitedTags Cannot load tags: ${err}`);
          return;
        }

        const models = [];

        for (let i = 0, len = tags.length; i < len; i++) {
          const tagVM = {
            name: tags[i].name
          };

          models.push(tagVM);
        }

        res.send(models);
        res.end();
      });
  },
  getTagById(req, res) {
    const { id } = req.params;
    if (id) {
      Tag.findOne({ _id: id }).exec((err, tag) => {
        if (err || !tag) {
          console.log(`Cannot load the tag: ${err}`);
          return;
        }

        res.send(tag);
        res.end();
      });
    }
  },
  getTagsIdsQuestion(tags) {
    const ids = [];

    const allTags = getAllTags();

    for (let i = 0, len = tags.length; i < len; i++) {
      ids.push(_.findWhere(allTags, { name: tags[i] }));
    }

    return ids;
  },
  searchTag(req, res) {
    const { query } = req.params;

    if (query) {
      Tag.find({})
        .sort('-questions')
        .exec((err, tags) => {
          if (err || !tags) {
            console.log(`searchTag Cannot laod tags: ${err}`);
            return;
          }
          const searchedTags = [];

          for (let i = 0, len = tags.length; i < len; i++) {
            if (tags[i].name.indexOf(query) > -1) {
              searchedTags.push(tags[i]);
            }
          }

          const models = [];

          for (let i = 0, len = searchedTags.length; i < len; i++) {
            const tagVM = {
              _id: searchedTags[i]._id,
              name: searchedTags[i].name,
              description: searchedTags[i].description,
              questionsCount: searchedTags[i].questions.length
            };

            models.push(tagVM);
          }

          res.send(models);
          res.end();
        });
    } else {
      res.send([]);
      res.end();
    }
  },
  addTag(req, res, next) {
    const newTag = req.body;

    if (true) {
      Tag.create(newTag, (err, tag) => {
        if (err) {
          console.log(`An error occurred while creating new tag: ${err}`);
          res.send({ success: false, message: 'Add new tag failed!' });
          res.end();
          return;
        }

        res.send({ success: true, message: 'New tag added successful!' });
        res.end();
      });
    } else {
      res.send({ success: false, message: 'Please, enter correct tag data!' });
    }
  },
  updateTag(req, res, next) {
    const updatedTag = req.body.tag;
    if (updatedTag.name && updatedTag.description) {
      Tag.update(
        { _id: updatedTag._id },
        {
          $set: { name: updatedTag.name, description: updatedTag.description }
        },
        { upsert: true },
        err => {
          if (err) {
            console.log(`An error occurred while updating the tag: ${err}`);
            res.send({ success: false, message: 'Update tag failed!' });
            res.end();
          } else {
            res.send({ success: true, message: 'Successful update!' });
            res.end();
          }
        }
      );
    } else {
      res.send({ success: false, message: 'Please, enter correct tag data!' });
    }
  },
  deleteTag(req, res, next) {
    const tagId = req.params.id;

    if (tagId) {
      Tag.remove({ _id: tagId }, err => {
        if (err) {
          console.log(`The tag was not removed from db: ${err}`);
          res.send({ success: false, message: 'Delete failed!' });
          res.end();
        } else {
          res.send({ success: true, message: 'Successful delete!' });
          res.end();
        }
      });
    }
  }
};

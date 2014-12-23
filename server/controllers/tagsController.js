var Tag = require('mongoose').model('Tag'),
    _ = require('underscore'),
    tagsValidator = require('../utilities/validation/tagsValidator');

function isTagExist(tagName) {
}

function addNewTag(tagName) {
}

function getAllTags(options, callback) {
    Tag.find(options).exec(function (err, tags) {
        if(err || !tags) {
            callback(err, null);
        }

        callback(null, tags);
    });
}

module.exports = {
    getTags: function (req, res, next){
        getAllTags({}, function(err, tags) {
            if(err) {
                console.log("Cannot load tags: " + err);
                res.send({success: false, message: "An error occurred while loading tags!"});
                res.end();
                return;
            }
            var models = [];

            for(var i = 0, len = tags.length; i < len; i++) {
                var tagVM = {
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
    getTagsAskQuestion: function (req, res) {
        getAllTags({}, function(err, tags) {
            if(err) {
                console.log("Cannot load the tag: " + err);
                res.send({success: false, message: "An error occurred while loading tags!"});
                res.end();
                return;
            }

            var models = [];

            for(var i = 0, len = tags.length; i < len; i++) {
                var tagVM = { name: tags[i].name };
                models.push(tagVM)
            }

            res.send(models);
            res.end();

        });
    },
    getTagById: function (req, res) {
        var id = req.params.id;
        if(id) {
            Tag.findOne({_id: id}).exec(function(err, tag) {
                if(err || !tag) {
                    console.log("Cannot load the tag: " + err);
                    return;
                }

                res.send(tag);
                res.end();
            });
        }
    },
    getTagsIdsQuestion: function (tags) {
        var ids = [],
            allTags = getAllTags();

        for(var i = 0, len = tags.length; i < len; i++) {
            ids.push(_.findWhere(allTags, {name: tags[i]}));
        }

        return ids;
    },
    addTag: function (req, res, next) {
        var newTag = req.body;

        if(tagsValidator.isTagValid(newTag)) {
            Tag.create(newTag, function (err, tag) {
                if(err) {
                    console.log("An error occurred while creating new tag: " + err);
                    res.send({success: false, message: "Add new tag failed!"});
                    res.end();
                    return;
                }

                res.send({success: true, message: "New tag added successful!"});
                res.end();
            })
        }
        else {
            res.send({success: false, message: "Please, enter correct tag data!"});
        }
    },
    updateTag: function (req, res, next) {
        var updatedTag = req.body.tag;
        if(updatedTag.name && updatedTag.description){
            Tag.update({_id: updatedTag._id}, {$set: {name: updatedTag.name, description: updatedTag.description}}, {upsert: true}, function(err) {
                if(err) {
                    console.log("An error occurred while updating the tag: " + err);
                    res.send({success: false, message: "Update tag failed!"});
                    res.end();
                    return;
                }
                else {
                    res.send({success: true, message: "Successful update!"});
                    res.end();
                }
            });
        }
        else {
            res.send({success: false, message: "Please, enter correct tag data!"});
        }

    },
    deleteTag: function (req, res, next) {
        var tagId = req.params.id;

        if(tagId) {
            Tag.remove({_id: tagId}, function (err) {
                if(err) {
                    console.log("The tag was not removed from db: " + err);
                    res.send({success: false, message: "Delete failed!"});
                    res.end();
                    return;
                }
                else {
                    res.send({success: true, message: "Successful delete!"});
                    res.end();
                }
            })
        }
    }
};
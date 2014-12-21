var commonValidator = require('commonValidator');

function isTagsLengthValid(tags) {

    var len = tags.length;

    if(len >= 1 && len <= 5) {
        return true;
    }

    return false;
}

function areTagsValuesValid(tags) {
    for(var i, len = tags.length; i < len; i++) {
        if(commonValidator.isNullOrEmpty(tags[i])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isAskQuestionValid: function(question) {
        if(question) {
            if(!commonValidator.areJsonPropsNullOrEmpty(question)) {
                return false;
            }
            else if(question.tags) {
                if(isTagsLengthValid(question.tags)) {
                    return false;
                }

                if (areTagsValuesValid(question.tags)) {
                    return false;
                }
            }
            else {
                return true;
            }
        }
    }
};
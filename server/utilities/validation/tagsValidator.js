var commonValidator = require('commonValidator');

module.exports = {
    isTagValid: function(tag) {
        if(tag) {
            if(!commonValidator.areJsonPropsNullOrEmpty(tag)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
};
var validator = require('validator');

module.exports = {
    isNullOrEmpty: function (str) {
        if(!str || validator.isNull(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    areJsonPropsNullOrEmpty: function (obj) {
        for(var key in obj) {
            if(this.isNullOrEmpty(obj[key])) {
                return false;
            }
        }

        return true;
    }
};
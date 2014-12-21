var validator = require('validator');

function isNullOrEmpty(str) {
    if(!str || validator.isNull(str)) {
        return true;
    }
    else {
        return false;
    }
}

function areJsonPropsNullOrEmpty(obj) {
    for(var key in obj) {
        if(isNullOrEmpty(obj[key])) {
            return false;
        }
    }

    return true;
}

function passwordsMatch(pass, conformPass) {
    if (pass != conformPass) {
        return false;
    }
    return true;
}

function isCSV(val) {
    var pattern = new RegExp("/([^,]+)/");
    var isValid = pattern.test(val);

    return isValid;
}
//TODO: Change email pattern in registration.jade with validator email pattern
module.exports = {
    isRegistrationValid: function (user) {
        if(user) {
            if(!areJsonPropsNullOrEmpty(user)) {
                return false;
            }
            else if(!passwordsMatch(user.password, user.confirmPassword)) {
                return false
            }
            else if(!validator.isEmail(user.email)) {
                return false
            }
            else {
                return true;
            }
        }
    },
    //TODO: Check passwords
    isUpdateUserDataValid: function (user) {
        if(user) {
            var userRequiredData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            if(!areJsonPropsNullOrEmpty(userRequiredData)) {
                return false;
            }
            else if(!validator.isEmail(user.email)) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    isAskQuestionValid: function(question) {
        if(question) {
            if(!areJsonPropsNullOrEmpty(question)) {
                return false;
            }
            else if(isCSV(question.tags)){
                return false;
            }
            else {
                return true;
            }
        }
    },
    isTagValid: function(tag) {
        if(tag) {
            if(!areJsonPropsNullOrEmpty(tag)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
};
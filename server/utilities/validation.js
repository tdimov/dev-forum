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

module.exports = {
    isRegistrationValid: function (user) {
        console.log(user);
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
    }
};
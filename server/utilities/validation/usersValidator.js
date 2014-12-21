var validator = require('validator'),
    commonValidator = require('commonValidator');

function passwordsMatch(pass, conformPass) {
    if (pass != conformPass) {
        return false;
    }
    return true;
}

module.exports = {
    isRegistrationValid: function (user) {
        if(user) {
            if(!commonValidator.areJsonPropsNullOrEmpty(user)) {
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

            if(!commonValidator.areJsonPropsNullOrEmpty(userRequiredData)) {
                return false;
            }
            else if(!validator.isEmail(user.email)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
};
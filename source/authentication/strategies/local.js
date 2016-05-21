'use strict';

/**
 * Module dependencies.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localStrategy(User, config) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, callback) {
			console.log('with in signup function');
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) return callback(err);

                // no user found with that email
                if (!user) {
					console.log('user not found');
                    return callback(null, false, { message: 'The email is not registered.' });
                }
                // make sure the password is correct
                user.comparePassword(password, function(err, isMatch) {
                    if (err) { return callback(err); }

                    // password did not match
                    if (!isMatch) {
                        return callback(null, false, { message: 'The password is not correct.' });
                    }

                    // success
                    return callback(null, user);
                });
            });
        }
    ));
}

module.exports = localStrategy;

const { Strategy, ExtractJwt } = require('passport-jwt');

// load up the user model
const User = require('../models/');

const { SECRET } = process.env;

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = SECRET;
  passport.use(new Strategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};

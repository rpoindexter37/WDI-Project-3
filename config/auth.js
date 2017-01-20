module.exports = {
  'facebookAuth': {
    'clientID': process.env.facebookID,
    'clientSecret': process.env.facebookSecret,
    'callbackURL': 'http://localhost:3000/auth/facebook/callback',
    'profileFields': ['emails', 'displayName']
  }
}

module.exports = {
  'facebookAuth': {
    'clientID': process.env.facebookID,
    'clientSecret': process.env.facebookSecret,
    'callbackURL': process.env.facebookCallbackURL,
    'profileFields': ['emails', 'displayName']
  }
}

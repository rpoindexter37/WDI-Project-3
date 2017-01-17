// Post Model
const
  mongoose = require('mongoose'),
  postSchema = new mongoose.Schema({
    title: {type: String},
    body: {type: String}
  }, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)

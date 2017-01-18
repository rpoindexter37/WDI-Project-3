// Post Model
const
  mongoose = require('mongoose'),
  commentSchema = new mongoose.Schema({
    body: {type: String}
  }),
  postSchema = new mongoose.Schema({
    title: {type: String},
    body: {type: String},
    comments: [commentSchema],
    _author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }, {timestamps: true})

  postSchema.pre('findOne', function() {
    this.populate('_author')
  })

module.exports = mongoose.model('Post', postSchema)

// Playlist Model
const
  mongoose = require('mongoose'),
  commentSchema = new mongoose.Schema({
    body: {type: String}
  }),
  playlistSchema = new mongoose.Schema({
    name: {type: String},
    url: {type: String},
    comments: [commentSchema],
    _author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    votes: {type: Number, default: 0}
  }, {timestamps: true})

  playlistSchema.pre('findOne', function() {
    this.populate('_author')
  })

module.exports = mongoose.model('Playlist', playlistSchema)

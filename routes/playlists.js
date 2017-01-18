const
  express = require('express'),
  playlistRouter = express.Router(),
  Playlist = require('../models/Playlist.js')

playlistRouter.use(isLoggedIn)

playlistRouter.route('/')
  .get((req, res) => {
    Playlist.find({}, (err, playlists) => {
      res.render('playlists/index', {playlists: playlists})
    })
  })
  .post((req, res) => {
    var newPlaylist = new Playlist(req.body)
    newPlaylist._author = req.user
    newPlaylist.save((err, playlist) => {
      req.user.playlists.push(playlist)
      req.user.save()
      res.redirect('/playlists/' + playlist._id)
      })
    })


playlistRouter.get('/new', (req, res) => res.render('playlists/new'))

playlistRouter.route('/:id')
  .get((req, res) => {
    Playlist.findById(req.params.id, (err, playlist) => {
      res.render('playlists/show', {playlist: playlist})
    })
  })
  .delete((req,res) => {
  Playlist.findByIdAndRemove(req.params.id, (err,playlist) => {
    if (err) {
      console.log(err);
    }
    console.log('bannana');
    var playlistIndex = req.user.playlists.findIndex((p) => p._id == req.params.id)
    req.user.playlists.splice(playlistIndex, 1)
    req.user.save()
    res.redirect('/profile')
  })
})

  playlistRouter.post('/:id/comments', (req, res) => {
    Playlist.findById(req.params.id, (err, playlist) => {
      playlist.comments.push(req.body)
      playlist.save(() => res.redirect('/playlists/' + playlist._id))
    })
  })


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}



module.exports = playlistRouter

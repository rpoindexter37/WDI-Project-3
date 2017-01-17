const
  express = require('express'),
  postRouter = express.Router(),
  Post = require('../models/Post.js')

postRouter.use(isLoggedIn)

postRouter.route('/')
  .get((req, res) => {
    Post.find({}, (err, posts) => {
      res.render('posts/index', {posts: posts})
    })
  })
  .post((req, res) => {
    Post.create(req.body, (err, post) => {
      res.redirect('/posts/' + post._id)
    })
  })

postRouter.get('/new', (req, res) => res.render('posts/new'))

postRouter.route('/:id')
  .get((req, res) => {
    Post.findById(req.params.id, (err, post) => {
      res.render('posts/show', {post: post})
    })
  })


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = postRouter

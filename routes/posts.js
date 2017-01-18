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
    var newPost = new Post(req.body)
    newPost._author = req.user
    newPost.save((err, post) => {
      req.user.posts.push(post)
      req.user.save()
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
  .delete((req,res) => {
  Post.findByIdAndRemove(req.params.id, (err,post) => {
    if (err) {
      console.log(err);
    }
    console.log('bannana');
    var postIndex = req.user.posts.findIndex((p) => p._id == req.params.id)
    req.user.posts.splice(postIndex, 1)
    req.user.save()
    res.redirect('/profile')
  })
})

  postRouter.post('/:id/comments', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      post.comments.push(req.body)
      post.save(() => res.redirect('/posts/' + post._id))
    })
  })


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}



module.exports = postRouter

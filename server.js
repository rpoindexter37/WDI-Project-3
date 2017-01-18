const
	dotenv = require('dotenv').load({silent:true}),
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session),
	passport = require('passport'),
	passportConfig = require('./config/passport.js'),
	userRoutes = require('./routes/users.js'),
	postRoutes = require('./routes/posts.js'),
	methodOveride = require('method-override')

	console.log(process.env.boom);

// environment port
const
	port = process.env.PORT || 3000,
	mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/mongoose-relationships-practice'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB (mongoose-relationships-practice)")
})

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
});

// middleware
app.use(methodOveride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
	secret: 'boooooooooom',
	cookie: {maxAge: 60000000},
	resave: true,
	saveUninitialized: false,
	store: store
}))
app.use(passport.initialize())
app.use(passport.session())


// currentUser:
app.use((req, res, next) => {
	app.locals.currentUser = req.user
	app.locals.loggedIn = !!req.user

	next()
})

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//root route
app.get('/', (req,res) => {
	res.render('pages/home')
})

app.use('/', userRoutes)
app.use('/posts', postRoutes)

app.listen(port, (err) => {
	console.log(err || "Server running on port " + port)
})

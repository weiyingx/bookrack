var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require("./models");
var app = express();
var methodOverride = require('method-override')

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'))


app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET || 'donttellanybody',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', function(req, res) {
  res.render('index');
});


app.get('/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: req.session.passport.user
  }).then(function(user) {
    db.favourite.findAll( {
      where: {
        userid: req.user.id
      }
    }).then(function(books) {
      res.render('profile', {
        user: user,
        books: books
      });
    });
  });
});

app.get('/library', isLoggedIn, function(req, res) {
  db.books.findAll().then(function(books) {
    res.render('library', {
      title: 'Express',
      books: books
    });
  });
});

app.get('/genre', isLoggedIn, function(req, res) {
  res.render('genre',{books: null});
});

app.post('/search', isLoggedIn, function(req, res) {
  db.books.findAll({
    where: {
      genre: req.body.genreSelect
    }
  }).then(function(books) {
    console.log(books);
    res.render('genre', {
      title: 'Express',
      books: books
    });
  });
});

app.post('/favourites', isLoggedIn, function(req, res) {
  db.favourite.create({
      userid: req.user.id,
      bookid: req.body.bookId
  }).then(function(books) {
    console.log(books);
    db.favourite.findAll( {
      where: {
        userid: req.user.id
      }
    }).then(function(books) {
      res.render('profile', {
        books: books
      });
    });
  });
});

app.delete("/deleteBook", function(req, res) {
  db.favourite.destroy({
    where: {
      id: req.body.bookId
    }
  }).then(function(books) {
    res.redirect('/profile')
  });
});

app.get('/editprofile', function(req, res) {
  res.render('editprofile');
});

app.put('/editprofile', function(req, res) {
  console.log(req.body)
  db.user.update({
    name: req.body.name,
    email: req.body.email
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(function(user) {
    res.redirect('/profile');
  });
});

app.use('/auth', require('./controllers/auth'));



var server = app.listen(process.env.PORT || 3000);

module.exports = server;

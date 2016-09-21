var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require("./models");
var app = express();
// var methodOverride = require('method-override')

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
  res.render('profile');
});



app.get('/library', isLoggedIn, function(req, res) {
    db.books.findAll().then(function(books) {
      res.render('library', {
        title: 'Express',
        books: books
      });
    });
  });

// function search(event) {
//   event.preventDefault();
//
//   clearSearchResults();
//   $('#results').text("wait ah..");
//
//   $.get('http://carparks-sg.herokuapp.com/api', function(data) {
//     clearSearchResults();
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//       addSearchResult(data[i].Development, data[i].Lots);
//     }
//   });
// }
//
//   // Clear previous search results.
//   function clearSearchResults() {
//     $("#results").empty();
//   }
//
//   // adds a single search result to the page.
//   function addSearchResult(result, lots) {
//     $("#results").append($("<li>").append(result + ' has ' + lots + ' lot(s).'));
//   }


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

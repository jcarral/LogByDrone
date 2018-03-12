require('dotenv').config();

//  const fs = require('fs');
const express = require('express');
//  const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const bluebird = require('bluebird');
const webpack = require('webpack');
/* eslint-disable */
const webpackMiddleware = require('webpack-dev-middleware');
/* eslint-enable */
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');

const app = express();
const { api } = require('./routes/');

const {
  NODE_ENV,
  DATABASE_PATH,
} = process.env;
const isDevelopment = NODE_ENV !== 'production';

/* Database connection */
mongoose.Promise = bluebird;
mongoose.connect(DATABASE_PATH, { promiseLibrary: bluebird })
  .then(() => console.log('connection succesful'))
  .catch(err => console.error(err));

/* Express Middlewares */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(passport.initialize());
app.use('/api', api);

if (isDevelopment) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  const staticPath = path.resolve(__dirname, '../assets');
  app.use('/assets', express.static(staticPath));
}

app.get('/', (req, res) => res.render('app', {
  title: 'LogByDrone',
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

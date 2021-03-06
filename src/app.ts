import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import index from './routes/index';
import component from './routes/component';
import version from './routes/version';

const app = express();
const bootstrapDir = path.join(__dirname, '../node_modules/bootstrap/dist/');

// uncomment after placing your favicon in /public
app.use('/bootstrap', express.static(bootstrapDir));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/version/', version);
app.use('/component/', component);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log(err.message);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

export default app

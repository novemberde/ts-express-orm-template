import "reflect-metadata";

import * as express from 'express';
import TestRoute from './routes/TestRoute';
import ErrorHandler from './handlers/ErrorHandler';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import UserRoute from './routes/UserRoute';

const env = process.env.NODE_ENV || 'development';
const app = express();

// Initialize connection
createConnection().then(() => {
    // Set logger
    if (env === 'production') app.use(logger('common'));
    else if (env === 'development') app.use(logger('dev'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/', (req, res, next) => {
        return res.send('Welcome!');
    });
    app.use('/test', new TestRoute().router);
    app.use('/user', new UserRoute().router);
    app.use(new ErrorHandler().router);
}).catch(err => {
    console.error(err);
});

export default app;
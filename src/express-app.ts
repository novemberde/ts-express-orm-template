import * as express from 'express';
import TestRoute from './routes/test';
import ErrorHandler from './handlers/ErrorHandler';
import * as logger from 'morgan';

const env = process.env.NODE_ENV || 'development';
const app = express();

// Set logger
if(env === 'production') app.use(logger('common'));
else if(env === 'development') app.use(logger('dev'));

app.get('/', (req, res, next) => {
    return res.send('Welcome!');
});
app.use('/test', new TestRoute().router);
app.use(new ErrorHandler().router);

export default app;
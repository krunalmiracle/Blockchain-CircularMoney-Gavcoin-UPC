//Dependency Imports
import express from 'express';
// TODO: Future Token Authentication
/*import morgan from 'morgan';*/
/*import passport from 'passport';
import passportMiddleware from './middlewares/passport';*/

//Importing Routes files


/*let path = require('path');*/


//Starting Express
const app = express();
//Configuration
//Setting Port as Environment Provided else using 3000
app.set('port', process.env.PORT || 4000);

app.use(express.static('views'));
//middlewares
/*app.use(morgan('dev'));*/

//Against deprecation warning of bodyparser
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json());
//Passport JWT
/*app.use(passport.initialize());
passport.use(passportMiddleware);*/


//API Routes
app.get('/', (_, res) => {
    res.send('Welcome to gavkoin!');
  });

//Export the server as 'app'
export default app;
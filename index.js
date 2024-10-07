const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const routerApi = require('./routes');
const {
 logErrors,
 errorHandlers,
 boomErrorHandler,
 ormErrorHandler,
} = require('./middleware/error.handler');

const app = express();
const PORT = 4000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

const whiteList = ['http://localhost:8080', 'http://localhost:3000'];
const options = {
 origin: (origin, callback) => {
  if (whiteList.includes(origin) || !origin) {
   callback(null, true);
  } else {
   callback(new Error('No Permitido'));
  }
 },
};

app.use(cors(options));

// Routing
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandlers);



app.listen(PORT, () => {
 console.log(colors.magenta.bold(`Listening on port ${PORT}`));
});

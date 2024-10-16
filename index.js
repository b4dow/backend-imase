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
const { frontendUrl } = require('./config/config');
const { corsOptions } = require('./config/corsOptions');
// const { corsOptions } = require('./config/corsOptions');

const app = express();
const PORT = 4000;

// Middlewares
// app.use(cors(corsOptions))

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Routing
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandlers);

app.listen(PORT, () => {
 console.log(colors.magenta.bold(`Listening on port ${PORT}`));
});

const { frontendUrl } = require('./config');

const corsOptions = {
  origin: (origin, callback) => {
    const whiteList = [frontendUrl];
    console.log(whiteList.includes(origin))
    console.log('estoy aqui')
    console.log(origin)
    if (process.argv[2] === '--api') {
      whiteList.push(undefined);
    }
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = { corsOptions };

// CORS -> Cross-Origin Resource Sharing

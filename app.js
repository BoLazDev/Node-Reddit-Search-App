const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const { errorHandler } = require('./middleware/errorHandler');
const redditRouter = require('./routes/redditRoutes');

const app = express();

const whitelist = [process.env.WHITE_LIST_CORS];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
// CORS
app.use(cors(corsOptions));

// PARSE REQ JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
//ROUTES
app.use('/api/reddit', redditRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Reddit App);
});

//MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port :${PORT}`);
});

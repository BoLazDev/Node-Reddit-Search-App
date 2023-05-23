const axios = require('axios');
const asyncHandler = require('express-async-handler');
const URL = process.env.URL;

const simulateFailedRequest = (cb) => {
    setTimeout(() => {
        const error = new Error('Error, failed fetching Reddit data!');
        error.statusCode = 500;
        cb(error);
    }, 1000);
}

const redditSearch = asyncHandler(async (req, res, next) => {
    const { qSearch } = req.body;
    try {
        //Fetch the data from reddit
        const response = await axios.get(`${URL}?q=${qSearch}&sort=new`);
        const {children} = response?.data?.data;
        res.send(children || []); // if we dont get children in the response from reddis sent empty array
        //simulateFailedRequest(next); // to test error scenario
    } catch(err) {
        throw new Error('Error, failed fetching Reddit data!');
    }
});

module.exports = {
    redditSearch
}
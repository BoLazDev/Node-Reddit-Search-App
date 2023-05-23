// Error Handler
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    //console.log("statuscode :", statuscode);
    res.json({
        msg: err?.message,
        stack: err?.stack,
    });
};

module.exports = {
    errorHandler
}
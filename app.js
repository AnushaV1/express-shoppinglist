const express = require("express");
const ExpressError = require("./expressError");
//const middleware = require("./middleware");
//const morgan = require("morgan");

const itemRoutes = require("./itemRoutes");
const app = express();

app.use(express.json());
//app.use(morgan('dev'));


app.use('/items', itemRoutes)

/* 404 page not found handler */
app.use(function(req,res,next) {
    return new ExpressError("Not found",400)
});

/* Other errors handler */
app.use((error, req, res, next) => {
    res.status(error.status || 500);

    return res.json({error: error.message});
}); 

module.exports = app;



import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";

import mongoose from "mongoose";

import ExpressError from './utils/ExpressError.js';

import listings from './routes/listing.js';

import reviews from './routes/review.js';

import session from 'express-session';

import flash from 'connect-flash';

import passport from 'passport';


const app = express();

async function main() {
 await mongoose.connect(process.env.MONGOURL, {
  serverSelectionTimeoutMS: 30000 // Set timeout to 30 seconds (30,000 milliseconds)
})
}

main().then(() => {
 console.log("connected to db")
})
.catch((err) => {
 console.log(err)
});


const sessionOptions = {
 secret: process.env.SESSION_SESSION,
 resave: false,
 saveUnitialized: true,
 cookie: {
  expires: Date.now() + 1000 * 60 * 60 * 24 *3,
  maxAge: 7 * 60 * 60 * 24 * 3,
  httpOnly: true
 },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
 res.locals.success = req.flash("success")
 res.locals.error = req.flash("error")

 next();

})


app.listen(8000, () => {
 console.log("server is listening on 8080")
});

app.use("/listings", listings );
app.use("/listings/:id/reviews", reviews)


app.all("*", (req, res, next) => {
 next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {

let {statusCode = 500, message = "something wrong"} = err;

res.status(statusCode).send(message);

})
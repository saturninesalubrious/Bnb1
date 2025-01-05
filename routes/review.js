import express from "express";

import { Review } from './models/review.js';

import { validateReview } from './validators/validateReview.js';

import Listing from "./models/listing.js"


import { wrapAsync } from './utils/wrapAsync.js';

export default router = express.Router({mergeParams: true});


router.post("/", validateReview ,wrapAsync(async (req, res) => {

 let listing = Listing.findById(req.params.id);

 let newReview = new Review(req.body.Review);
 
 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();

 res.send("new Review saved");

}))

router.delete("/:reviewId", wrapAsync(async (req, res) => {

 let {id, reviewId} = req.params;

 await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})

 await Review.findByIdAndDelete(reviewId);

res.json("Review deleted")

}))

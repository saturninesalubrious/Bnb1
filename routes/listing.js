
import express from "express";

import Listing from "../models/listing";

import { validateListing } from "../validators/validateLisitng";


import { wrapAsync } from "../utils/wrapAsync";

export default router = express.Router();




router.get("/listings", wrapAsync(async (req, res) => {
 const allListings = await Listing.find({});
 
 res.json({allListings});
}))

router.get("/listings/new", (req, res) => {
 res.json("Form rendered")
});

router.get("/listings/:id", wrapAsync(async(req, res) => {

 let {id} = req.params;

 const listing =  await Listing.findById(id);

 if (!listing) {
  req.flash("error", "Listing you requested for does not exist")

  res.redirect("React routing to be included")
 }

 res.json({listing})

}));

router.post("/listings", validateListing, wrapAsync(async (req, res) => {

 const  newListing = new Listing(req.body.listing);

 await newListing.save;

 req.flash("success", "new Listing saved" )

 console.log(listing);

}));


router.get("/listings/:id/edit",  wrapAsync(async (req, res) => {

 const {id} = req.params

 const listing =  await Listing.findById(id)

 res.json({listing})

}));

router.put("/listings/:id", wrapAsync(async () => {

 let {id} = req.params;

 await Listing.findByIdAndUpdate(id, {...req.body.listing});

 res.json("Listing updated");

}));

router.delete("/listings/:id", wrapAsync(async (req,res) => {

 let {id} = req.params;

 let deletedListing = await Listing.findByIdAndDelete(id);

 console.log("deletedListing");

 res.json("listing deleted")

}));

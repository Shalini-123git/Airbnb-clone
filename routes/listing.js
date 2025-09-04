const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
// const upload = multer({ dest: "uploads/"});
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//index, create route
router
   .route("/")
   .get(wrapAsync(listingController.index))
   .post(
        isLoggedIn, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.create)
     ); 


//new listing route
router.get("/new", isLoggedIn, listingController.newRouter);

//show, update, delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.show))
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.update))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete));



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;
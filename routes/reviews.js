const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const { validateReview , isLoggedIn, isReviewAuthor,} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

router.use(methodOverride("_method"));

//post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReviewRouter));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReviewRouter));

module.exports = router;
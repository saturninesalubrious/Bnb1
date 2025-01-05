
import { reviewSchema } from './schemaValidators/reviewschema.js';

export const validateReview = (req, res, next) => {

 let {error} = reviewSchema.validate(req.body);

 if (error) {

  let errorMsg = error.details.map((el) => el.message)

  throw new ExpressError(400, result.error);

 }

 next();

}

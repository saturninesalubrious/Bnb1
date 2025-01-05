

import { listingSchema } from './schemaValidators/listingschema.js';


export const validateListing = (req, res, next) => {

 let {error} = listingSchema.validate(req.body);

 if (error) {

  let errorMsg = error.details.map((el) => el.message)

  throw new ExpressError(400, result.error);

 }

 next();

}




import Joi from "joi";

export const reviewSchema = Joi.object({
 review: Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.number().required(),
 }).required(),
});
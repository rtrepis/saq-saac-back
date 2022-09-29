import { Joi } from "express-validation";

const SequenceJoi = {
  body: Joi.object({
    name: Joi.string().required(),
    pictograms: Joi.array().items(Joi.number()).required(),
    privately: Joi.boolean(),
  }),
};

export default SequenceJoi;

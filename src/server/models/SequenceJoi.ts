import { Joi } from "express-validation";

const SequenceJoi = {
  body: Joi.object({
    name: Joi.string().max(30).required(),
    pictograms: Joi.array().items(Joi.number()).required(),
    private: Joi.boolean(),
  }),
};

export default SequenceJoi;
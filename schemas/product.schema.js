const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string().min(10);
const image = Joi.string().uri();
const url = Joi.string();

const createProductSchema = Joi.object({
 name: name.required(),
 description: description.required(),
 image: image.required(),
 url: url.required()
});

module.exports = {
 createProductSchema,
};

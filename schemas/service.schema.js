const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string().min(10);
const image = Joi.string();
const url = Joi.string();

const createServiceSchema = Joi.object({
 name: name.required(),
 description: description.required(),
 image: image.required(),
 url: url.required(),
});

const updateServiceSchema = Joi.object({
 name,
 description,
 image,
 url,
});

const getServiceSchema = Joi.object({
 id: id.required(),
});

module.exports = {
 createServiceSchema,
 updateServiceSchema,
 getServiceSchema,
};

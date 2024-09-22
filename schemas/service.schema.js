const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string().min(10);
const image = Joi.string();
const url = Joi.string().uri();

const createServiceSchema = Joi.object({
 name: name.required(),
 description: description.required(),
 image: image.required(),
 url: url.required(),
});
const uploadServiceSchema = Joi.object({
 filename: Joi.string().required(),
 path: Joi.string().required(),
//  headers: Joi.object({
//   'content-disposition': Joi.string().required(),
//   'content-type': Joi.string().valid(['image/jpeg']).required(),
//  }).required(),
 bytes: Joi.number().required(),
});

const updateServiceSchema = Joi.object({
 name,
 description,
 url,
});

const getServiceSchema = Joi.object({
 id: id.required(),
});

module.exports = {
 createServiceSchema,
 updateServiceSchema,
 getServiceSchema,
 uploadServiceSchema
};

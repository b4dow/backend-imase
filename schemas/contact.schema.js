const Joi = require('joi');

const name = Joi.string();
const email = Joi.string().email();
const message = Joi.string().min(10);

const createContactSchema = Joi.object({
 name: name.required(),
 email: email.required(),
 message: message.required(),
});

module.exports = {
 createContactSchema,
};

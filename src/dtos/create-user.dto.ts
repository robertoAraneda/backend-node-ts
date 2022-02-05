import Joi from 'joi';

export const CreateUserDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
});

import Joi from 'joi';

export const CreateTestDto = Joi.object({
  username: Joi.string().required(),
  password: Joi.string(),
});

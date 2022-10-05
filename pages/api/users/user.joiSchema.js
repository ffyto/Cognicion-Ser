import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    )
    .required(),
});

export function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const payload = { email, password };
  const { error } = loginSchema.validate(payload);
  if (error) {
    console.error(error);
    return res.status(400).json({ error, message: 'missing data' });
  }
  next();
  return null;
}

const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    )
    .required(),
});

export function changePasswordValidation(req, res, next) {
  const { newPassword } = req.body;
  const payload = { newPassword };
  const { error } = changePasswordSchema.validate(payload);

  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  next();
  return null;
}

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    )
    .required(),

  name: Joi.string().min(2).max(20).required(),

  lastName: Joi.string().min(2).max(30).required(),

  phoneNumber: Joi.string().min(10).max(10).required(),

  age: Joi.number().min(18).required(),
});

export function registerLogin(req, res) {
  const { email, password, name, lastName, phoneNumber, birthday } = req.body;
  const today = new Date();
  const birthdate = new Date(birthday);
  let age = today.getFullYear() - birthdate.getFullYear();
  const birthMonth = today.getMonth() - birthdate.getMonth();

  if (
    birthMonth < 0 ||
    (birthMonth === 0 && today.getDate() < birthdate.getDate())
  ) {
    age = age - 1;
  }
  const payload = { email, password, name, lastName, phoneNumber, age };
  const { error } = registerSchema.validate(payload);

  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }

  return null;
}

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),

  lastName: Joi.string().min(2).max(20).required(),

  userName: Joi.string().alphanum().min(3).max(30).required(),
});

export function userUpdateValidation(req, res, next) {
  const { name, lastName, userName } = req.body;
  const payload = { name, lastName, userName };
  const { error } = userUpdateSchema.validate(payload);
  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  next();
  return null;
}

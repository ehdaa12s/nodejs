
const validate = (schema) => {
  return (req, res, next) => {

    const { error, value } = schema.validate(req.body, {
      abortEarly: false, 
      stripUnknown: true 
    });

    if (error) {
 
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      const err = new Error(errorMessage);
      err.statusCode = 400;
      return next(err);
    }

    req.body = value;
    next();
  };
};

module.exports = validate;

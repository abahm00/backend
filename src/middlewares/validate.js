export const validate = (schema) => {
  return (req, res, next) => {
    let payload = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    delete payload.id;

    if (req.file) {
      const schemaKeys = Object.keys(schema.describe().keys);

      if (schemaKeys.includes("logo")) {
        payload.logo = req.file.filename;
      }
      if (schemaKeys.includes("img")) {
        payload.img = req.file.filename;
      }
    }

    const { error } = schema.validate(payload, { abortEarly: false });

    if (!error) {
      next();
    } else {
      let errMsg = error.details.map((err) => err.message);
      next(new Error(errMsg));
    }
  };
};

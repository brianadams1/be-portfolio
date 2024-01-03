export const Validate = (schema, data) => {
  const result = schema.validate(data);

  if (result.error) {
    throw result.error
      // throw new JoiError(400, result.error.message);
    
  } else {
    return result.value;
  }
};

export const globalErrorHandling = (err, req, res, next) => {
  const code = err.statusCode || 500;
  res.json({ message: err.message });
};

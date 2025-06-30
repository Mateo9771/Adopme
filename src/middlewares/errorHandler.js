//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\middlewares\errorHandler.js
export default (err, req, res, next) => {
  logger.error("❌ Error capturado por middleware:");
  logger.error(err);
  res.status(500).send({
    status: "error",
    message: err.message || "Internal Server Error",
    cause: err.cause || "Unknown",
    code: err.code || 1
  });
};
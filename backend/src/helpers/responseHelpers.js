exports.successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} } = {}
) => {
  return res.status(statusCode).json({ success: true, message, payload });
};

exports.errorResponse = (
  res,
  { statusCode = 500, message = "Internal Server Error" } = {}
) => {
  return res.status(statusCode).json({ success: false, message });
};

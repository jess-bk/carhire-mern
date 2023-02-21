const validateQuery = (req, res, next) => {
  // retrieve query parameters
  const { page, limit } = req.query;

  // check if limit is a number and greater than 0
  if (limit && (!Number.isInteger(parseInt(limit)) || parseInt(limit) <= 0)) {
    return res.status(400).json({ message: "Invalid limit" });
  }

  // check if page is a number and greater than 0
  if (page && (!Number.isInteger(parseInt(page)) || parseInt(page) <= 0)) {
    return res.status(400).json({ message: "Invalid page" });
  }

  next();
};

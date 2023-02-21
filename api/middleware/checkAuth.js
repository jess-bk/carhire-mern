const checkAuth = async (req, res, next) => {
  try {
    // Find the user by their JWT stored in the "token" cookie
    const token = req.cookies.token;
    const user = await User.findOne({
      tokens: { $elemMatch: { token } },
    });
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the token has expired or last used time is less than 1 day
    if (
      jwt.decode(token).exp * 1000 < Date.now() ||
      new Date() - user.lastUsed > 86400000
    ) {
      throw new Error("Token expired, please login again");
    }
    // Update last used time
    user.lastUsed = new Date();
    await user.save();
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
module.exports = checkAuth;

const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Please enter a valid username and password");
    }
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    // Check if the user is already logged in and the JWT has not expired
    if (
      user.tokens.length > 0 &&
      !jwt.decode(user.tokens[0].token).exp * 1000 < Date.now()
    ) {
      return res.status(200).json({ message: "You are already logged in" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });
    user.tokens.push({ token });
    await user.save();

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    if (!username || !password) {
      throw new Error("Please enter a valid username and password");
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, name, email });
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    // Find the user by their JWT stored in the "token" cookie
    const user = await User.findOne({
      tokens: { $elemMatch: { token: req.cookies.token } },
    });

    // Remove the JWT from the user's tokens array
    user.tokens = user.tokens.filter((t) => t.token !== req.cookies.token);
    await user.save();

    // Delete the JWT cookie from the browser
    await res.clearCookie("token", { httpOnly: true });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, register, logout };

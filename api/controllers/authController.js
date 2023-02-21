const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   // const cookies = req.cookies;
//   // console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new Error("Please enter a valid username and password");
//     }
//     const user = await User.findOne({ username });
//     console.log(user);
//     if (!user) {
//       throw new Error("Invalid username or password");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid username or password");
//     }

//     // Replace the tokens array with a new array that does not contain the JWT
//     user.tokens = [];

//     // Remove the first element from the tokens array
//     //user.tokens.shift();

//     //  Add expires in property
//     const tokens = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "24hr", // Set the expiration time to 24 hours
//     });
//     res.cookie("token", tokens, { httpOnly: true });
//     user.tokens.push({ tokens });
//     // add last used time
//     user.lastUsed = new Date();
//     await user.save();

//     res.status(200).json({ user, message: "Login successful" });
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Please enter a valid username and password");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    // Replace the tokens array with a new array that does not contain the JWT
    user.tokens = [];

    //  Add expires in property
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24hr", // Set the expiration time to 24 hours
    });
    res.cookie("token", token, { httpOnly: true });
    user.tokens.push(token);
    await user.save();

    res.status(200).json({ user, message: "Login successful" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const register = async (req, res) => {
  const { username, password, name, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username is already taken");
    }
    if (!username) {
      throw new Error("Please enter a valid username");
    }
    if (!password) {
      throw new Error("Please enter a valid password");
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
    const tokens = req.cookies.token;
    console.log("token", tokens);

    const foundUser = await User.findOne({ tokens }).exec();
    console.log("user", foundUser);

    // If the user object is null or undefined, return an error
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Replace the tokens array with a new array that does not contain the JWT
    foundUser.tokens = foundUser.tokens.filter((rt) => rt !== tokens);
    // foundUser.tokens = [];
    await foundUser.save();

    // Delete the JWT cookie from the browser
    await res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, register, logout };

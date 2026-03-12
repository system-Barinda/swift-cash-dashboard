const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

const SECRET = "supersecretkey";

/* SIGNUP */
async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(email, hashedPassword);

    res.json({
      message: "Account created successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

/* LOGIN */
async function login(req, res) {
  try {

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  signup,
  login
};
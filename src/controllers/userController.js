const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    const token = await jwt.sign(
      { id: newUser.id, name: newUser.username, role: newUser.role, approve: newUser.isApproved },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const isPasswordValid = await !bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.username, role: user.role, approve: user.isApproved },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await User.destroy({
      where: {
        id: user.id,
      },
    });

    if (result) {
      console.log(`Book with ID ${user.id} was deleted.`);
    } else {
      console.log(`No book found with ID ${user.id}.`);
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

module.exports = { register, login, getUserProfile, deleteUser };

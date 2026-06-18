const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // normalize role
    const normalizedRole = role.trim().toLowerCase();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN (STRICT email + password + role)
const loginUser = async (req, res) => {
  try {
    console.log("LOGIN CONTROLLER HIT");

    const { email, password, role } = req.body;

    // 1. check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // 2. password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // 3. role check (normalized)
    const normalizedRole = role.trim().toLowerCase();

    if (user.role !== normalizedRole) {
      return res.status(403).json({
        message: "Role mismatch. Access denied",
      });
    }

    // success
    res.status(200).json({
      message: "Login Successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
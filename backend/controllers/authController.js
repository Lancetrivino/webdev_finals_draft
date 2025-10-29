import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register
export const registerUser = async (req, res) => {
  let { name, email, password, role } = req.body;

  console.log("🧩 Incoming role (before normalization):", role);

  if (role) {
    let normalizedRole = role.toLowerCase();
    role = normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: "✅ User registered successfully",
      receivedRole: user.role,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);

    // Handle Mongoose Validation Errors specifically
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: messages,
      });
    }
    
    res.status(500).json({
      message: "Server error during registration",
      error: error.message, 
    });
  }
  
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user.id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// controllers/userController.js
const User = require("../models/user");

exports.createAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    // In createAccount controller  
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    const user = new User(req.body);

    return res.json({
      message: "Success",
      user
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to add user",
      details: error.message
    });
  }
};

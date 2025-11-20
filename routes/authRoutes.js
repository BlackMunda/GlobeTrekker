const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// -------------------------
// SIGNUP
// -------------------------
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.send("User already exists. Try logging in.");
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: hashed
    });

    // Auto-login after signup (optional but improves UX)
    req.session.user = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };

    return res.redirect("/dashboard");
});


// -------------------------
// LOGIN
// -------------------------
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.send("Incorrect password");
    }

    // Save user data in session
    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    return res.redirect("/dashboard");
});


// -------------------------
// LOGOUT
// -------------------------
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;

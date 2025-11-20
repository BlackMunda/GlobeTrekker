const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
    res.render("index", {
        active: "home",
        title: "Home",
        user: req.session.user || null
    });
});

// Login Page
router.get("/login", (req, res) => {
    // If already logged in → redirect to dashboard
    if (req.session.user) return res.redirect("/dashboard");

    res.render("login", {
        active: "login",
        title: "Login / Signup",
        user: null
    });
});

// Dashboard Page
router.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    res.render("dashboard", {
        title: "Dashboard",
        active: "dashboard",
        user: req.session.user
    });
});

// Destinations Page (JSON-driven)
router.get("/destinations", (req, res) => {
    const jsonPath = path.join(__dirname, "..", "public", "destinations.json");
    const data = JSON.parse(fs.readFileSync(jsonPath));

    res.render("destinations", {
        title: "Destinations",
        active: "destinations",
        destinations: data.destinations,
        user: req.session.user || null
    });
});


// Reviews page handled in reviewRoutes.js, but let's add a redirect for safety
router.get("/reviews", (req, res) => {
    res.redirect("/reviews/all");
});

module.exports = router;

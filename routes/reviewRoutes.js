const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// CREATE review (logged-in users only)
router.post("/add", async (req, res) => {
    try {
        const payload = { ...req.body };

        // If user is logged in, prefer their name and email from session
        if (req.session && req.session.user) {
            payload.name = req.session.user.name || payload.name;
            payload.email = req.session.user.email || payload.email;
        }

        await Review.create(payload);
        res.redirect("/reviews/all");
    } catch (err) {
        console.error("Error creating review:", err);
        res.status(500).send("Unable to create review");
    }
});

// READ reviews
router.get("/all", async (req, res) => {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.render("reviews", {
        reviews,
        user: req.session.user || null,
        title: "User Reviews"
    });
});


// UPDATE
router.post("/update/:id", async (req, res) => {
    await Review.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/reviews/all");
});

// DELETE
router.get("/delete/:id", async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect("/reviews/all");
});

module.exports = router;

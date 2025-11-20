const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Layout engine
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");  // default layout: layout.ejs


// MongoDB Connect
mongoose
    .connect("mongodb+srv://dev:<Dev@2005>@globetrekkerdb.hq7sf7f.mongodb.net/?appName=globetrekkerDB")
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.log(err));


// Sessions
app.use(session({
    secret: "supersecret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/globetrekker",
        collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// Routes
app.use(session({
    secret: "supersecret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/globetrekker",
        collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 }
}));

// Make session user available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;   // used by header to show login/logout
    next();
});

// Routes
app.use("/", require("./routes/pageRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

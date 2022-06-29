// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Campaign = require("./models/campaign");
const User = require("./models/user");
const Comment = require("./models/comment");

const userRoutes = require("./routes/users");
const campaignRoutes = require("./routes/campaigns");
const commentRoutes = require("./routes/comments");
const supporterRoutes = require("./routes/supporters");

const MongoStore = require("connect-mongo");

const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/democracy-roundup";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const secret = process.env.SECRET || "thisIsAWeakSecret";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function () {
  console.log("Session store error");
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,   (on production only - not local host)
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  //these variables are accessible by all ejs templates
  console.log(req.session);
  res.locals.currentUser = req.user; //passport creates this req.user
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/campaigns/:id/comments", commentRoutes);
app.use("/campaigns/:id/supporters", supporterRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`serving on port ${port}`);
});

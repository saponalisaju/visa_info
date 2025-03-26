const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

require("./src/config/database");
const userRouter = require("./src/routes/userRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const applicationRouter = require("./src/routes/applicationRoute");

//middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://worldvisa.netlify.app",
  "https://www.worldvisa.info",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Accept, Authorization",
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

app.get("/lander", (req, res) => {
  res.redirect(301, "/");
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(helmet());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/application", applicationRouter);

module.exports = app;

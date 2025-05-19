import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import validateJWT from "./utils/validate-jwt/index.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jwtSecret = process.env.JWT_SECRET;
const jwtExpireTime = process.env.JWT_EXPIRATION_TIME;

// serve the static files from ./public
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/auth/register", (req, res) => {
  try {
    const user = req.body;
    db.prepare(
      `
        INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)
      `
    ).run(user.first_name, user.last_name, user.email, user.password);

    res.redirect("/page/auth/login/index.html");
  } catch (error) {
    console.error("Failed creating user: ", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db
      .prepare(
        `
        SELECT * FROM users WHERE email = ? AND password = ?`
      )
      .get(email, password);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: jwtExpireTime,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.redirect("/index.html");
  } catch (error) {
    console.error("Failed to log in: ", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/profile", validateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../protected/profile/index.html"));
});

// serve /profile files if jwt is valid.
app.use(
  "/profile",
  validateJWT,
  express.static(path.join(__dirname, "../protected/profile"))
);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is successfully running, and app is listening on port: http://localhost:${PORT}`
    );
  } else {
    console.log(`Error occurred, server can't start`, error);
  }
});

// TODO: password salt

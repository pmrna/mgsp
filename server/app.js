import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import validateJWT from "./utils/validate-jwt/index.js";
import hashUtils from "./utils/hash-password/index.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jwtSecret = process.env.JWT_SECRET;
const jwtExpireTime = process.env.JWT_EXPIRATION_TIME;
const { hashPassword, verifyPassword } = hashUtils;

// serve the static files from ./public
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/auth/register", (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      country,
      region,
      city,
      zip,
      address,
    } = req.body;

    const hashedPassword = hashPassword(password);

    db.prepare(
      `
        INSERT INTO users (first_name, last_name, email, password, country, region, city, zip, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      first_name,
      last_name,
      email,
      hashedPassword,
      country,
      region,
      city,
      zip,
      address
    );

    res.redirect("/page/auth/login/index.html");
  } catch (error) {
    console.error("Failed creating user: ", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

    const verified = await verifyPassword(password, user.password);

    if (!user || !verified) {
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

app.get("/api/profile", (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, jwtSecret);

    const userId = payload.id;

    const user = db
      .prepare(
        `
      SELECT first_name, last_name, country, region, city, zip, address 
      FROM users 
      WHERE id = ? 
      `
      )
      .get(userId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
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
    console.error(`Error occurred, server can't start:`, error);
  }
});

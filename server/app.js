import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/db.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve the static files from ./public
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/users", (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM perfumes").all();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is successfully running, and app is listening on port: http://localhost:${PORT}`
    );
  } else {
    console.log(`Error occurred, server can't start`, error);
  }
});

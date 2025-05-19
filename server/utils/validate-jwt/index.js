import jwt from "jsonwebtoken";

function validateJWT(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect("/page/auth/login/index.html");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send("Invalid token.");
  }
}

export default validateJWT;

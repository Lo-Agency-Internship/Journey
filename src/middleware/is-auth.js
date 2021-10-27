const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Authentication required!" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, { user }) => {
    if (error) return res.status(403).json({ error: "Token is invalid!" });
    req.userId = user;
  });
  next();
};

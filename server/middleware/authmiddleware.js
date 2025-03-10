const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");
  // console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;

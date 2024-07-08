const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "nouman") {
    req.user = { name: "Nouman", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorize");
  }
  // console.log("authorize");
};

module.exports = authorize;

module.exports = function (err, req, res) {
  res.status(500).json({ msg: "Something went wrong" });
};

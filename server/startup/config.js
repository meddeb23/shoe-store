module.exports = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("FATAL ERROR: json web token is not defined.");
  }
};

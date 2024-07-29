const crypto = require("crypto");

const secretKey =
  process.env.SECRET_KEY || crypto.randomBytes(32).toString("hex");
const tokenExpiration = "30d";

module.exports = { secretKey, tokenExpiration };

const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");
const tokenExpiration = "30d";

module.exports = { secretKey, tokenExpiration };

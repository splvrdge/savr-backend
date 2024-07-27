require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const tokenExpiration = "30d";

module.exports = { secretKey, tokenExpiration };

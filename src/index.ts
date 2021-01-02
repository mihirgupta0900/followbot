// import express from "express";

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// var Twit = require('twit')
import dotenv from "dotenv";
dotenv.config();
import Twit from "twit";
import Twitter from "twitter-lite";

import fs from "fs";
import { createOauthClient } from "./utils/oauth";
import { tokens } from "./utils/config";

const { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

if (API_KEY && API_SECRET && ACCESS_TOKEN && ACCESS_TOKEN_SECRET) {
  /* */

  const client = createOauthClient(tokens);
}

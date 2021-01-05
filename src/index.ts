import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { createOauthClient, streamApi } from "./utils/oauth";
import { tokens } from "./utils/config";
import Twit from "twit";
import { RootObject } from "./types";

const { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

if (API_KEY && API_SECRET && ACCESS_TOKEN && ACCESS_TOKEN_SECRET) {
  const client = createOauthClient(tokens);

  var T = new Twit({
    consumer_key: API_KEY,
    consumer_secret: API_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET,
    // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    // strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });

  var stream = T.stream("statuses/filter", { track: "@FollowBot2102" });

  stream.on("tweet", (tweet: RootObject) => {
    console.log(tweet);
    // * Gives one tweet
    const userName = tweet.user.name;
    const userId = tweet.user.id_str;
    // Need to get the below tweet
    const repliedToTweet = tweet.in_reply_to_status_id_str;
  });
}

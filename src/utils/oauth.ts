import axios from "axios";
import crypto from "crypto";
import OAuth, { RequestOptions } from "oauth-1.0a";
import { tokens } from "./config";
const { BEARER_TOKEN } = process.env;

export const percentEncode = (string: string) => {
  // From OAuth.prototype.percentEncode
  return string
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
};

export const createOauthClient = ({ key, secret }: Token) => {
  const client = new OAuth({
    consumer: { key, secret },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });

  return client;
};

export const getHeadersFromOAuth = (
  client: OAuth,
  token: Token,
  requestData: RequestOptions
) => {
  return client.toHeader(client.authorize(requestData, token));
};

export const getTweetById = async (id: string, client: OAuth) => {
  const reqData: RequestOptions = {
    url: "https://api.twitter.com/2/tweets/:id",
    method: "GET",
  };
  return await axios.get(`https://api.twitter.com/2/tweets/${id}`, {
    headers: getHeadersFromOAuth(client, tokens, reqData),
  });
};

export const streamApi = async (rules: string, tag: string) => {
  const res = await axios.post(
    "https://api.twitter.com/2/tweets/search/stream/rules",
    { add: [{ value: rules, tag }] },
    { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
  );

  return await res.data;
};

interface Token {
  key: string;
  secret: string;
}

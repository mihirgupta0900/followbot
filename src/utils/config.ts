const { ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;

export const tokens = {
  key: ACCESS_TOKEN ? ACCESS_TOKEN : "",
  secret: ACCESS_TOKEN_SECRET ? ACCESS_TOKEN_SECRET : "",
};

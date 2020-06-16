const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis " + err);
});

module.exports = client;

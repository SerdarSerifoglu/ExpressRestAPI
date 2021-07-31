const express = require("express");
const { lotteryDatabase } = require("./database/index.js");
const app = express();


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/lot", (req, res) => {
  const lotteries = lotteryDatabase.load();
  res.send(JSON.stringify(lotteries));
});

app.listen(3000, () => {
  console.log("started listening on 3000");
});

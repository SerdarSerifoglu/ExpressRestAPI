const express = require("express");
const { lotteryDatabase } = require("./database/index.js");
const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/lottery", (req, res) => {
  const lotteries = lotteryDatabase.load();
  res.render("lottery", { lotteries });
});

app.get("/lottery/:lotteryId", (req, res) => {
  const lottery = lotteryDatabase.findBy("id", req.params.lotteryId);
  if (!lottery) return res.status(404).send("Cannot find lottery");
  res.render("lottery-detail", { lottery });
});

app.listen(3000, () => {
  console.log("started listening on 3000");
});

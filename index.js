const express = require("express");
const bodyParser = require("body-parser");
const LotteryRouter = require("./routes/lottery.js");
const IndexRouter = require("./routes/index");

const app = express();

app.use(bodyParser.json());

app.set("view engine", "pug");

app.use("/", IndexRouter);
app.use("/lottery", LotteryRouter);

app.listen(3000, () => {
  console.log("started listening on 3000");
});

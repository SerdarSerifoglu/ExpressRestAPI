const { lotteryDatabase } = require("../database/index.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  const lotteries = lotteryDatabase.load();
  res.render("lottery", { lotteries });
});

router.get("/:lotteryId", (req, res) => {
  const lottery = lotteryDatabase.findBy("id", req.params.lotteryId);
  if (!lottery) return res.status(404).send("Cannot find lottery");
  res.render("lottery-detail", { lottery });
});

router.post("/", (req, res) => {
  const lottery = lotteryDatabase.insert(req.body);
  console.log(lottery);
  res.send(lottery);
});

router.delete("/:lotteryId", (req, res) => {
  lotteryDatabase.removeBy("_id", req.params.lotteryId);
  res.send("OK");
});

router.patch("/:lotteryId", async (req, res) => {
  const { name } = req.body;
  await lotteryDatabase.update(req.params.lotteryId, { name });
});

module.exports = router;

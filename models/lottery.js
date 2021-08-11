const mongoose = require("mongoose");

const LotterySchema = new mongoose.Schema({
  name: String,
  participants: [],
});

module.exports = mongoose.model("Lottery", LotterySchema);

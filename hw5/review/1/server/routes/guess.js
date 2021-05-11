import express from "express";
import getNumber from "../core/getNumber";
import { gettime, logName } from "../server";
const fs = require("fs");
const router = express.Router();

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

// Just call getNumber(true) to generate a random number for guessing game
router.post("/start", (_, res) => {
  getNumber(true);
  fs.appendFile(
    `/Users/liuyuchao/Desktop/wp1092/hw5/own/server/log/${logName}`,
    `start number=${getNumber()} ${gettime("Time")}`,
    function (err, file) {
      if (err) throw err;
      console.log("Updated start log");
    }
  );
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = roughScale(req.query.number, 10);

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: "Not a legal number." });
  } else {
    // TODO: check if number and guessed are the same,
    // and response with some hint "Equal", "Bigger", "Smaller"
    fs.appendFile(
      `/Users/liuyuchao/Desktop/wp1092/hw5/own/server/log/${logName}`,
      `\nguess ${guessed} ${gettime("Time")}`,
      function (err, file) {
        if (err) throw err;
        console.log("Updated guess log");
      }
    );
    if (guessed === number) {
      res.status(200).send({ msg: "Equal" });
      fs.appendFile(
        `/Users/liuyuchao/Desktop/wp1092/hw5/own/server/log/${logName}`,
        `\nend-game`,
        function (err, file) {
          if (err) throw err;
          console.log("Updated end log");
        }
      );
    } else if (guessed < number) {
      res.status(200).send({ msg: "Bigger" });
    } else if (guessed > number) {
      res.status(200).send({ msg: "Smaller" });
    }
  }
});

// TODO: add router.post('/restart',...)
router.post("/restart", (_, res) => {
  getNumber(true);
  fs.appendFile(
    `/Users/liuyuchao/Desktop/wp1092/hw5/own/server/log/${logName}`,
    `\nrestart number=${getNumber()} ${gettime("Time")}`,
    function (err, file) {
      if (err) throw err;
      console.log("Updated start log");
    }
  );

  res.json({ msg: "The game has restarted." });
});

export default router;

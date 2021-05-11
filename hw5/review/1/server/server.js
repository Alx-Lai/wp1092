import express from "express";
import cors from "cors";
import path from "path";

import guessRoute from "./routes/guess";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// init date
function gettime(type) {
  let time = new Date();
  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    date = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds();
  if (type === "Date") {
    return `${year}-${month}-${date}`;
  } else if (type === "Time") {
    return `${year}-${month}-${date}-${hour}-${minute}-${second}`;
  }
}

const logName = `${gettime("Date")}.log`;

// init middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (isProduction && req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  return next();
});

// define routes
app.use("/api/guess", guessRoute);

const port = process.env.PORT || 4000;

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, "..", "build");

  app.use(express.static(publicPath));

  app.get("*", (_, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

app.listen(port, async () => {
  console.log(`Server is up on port ${port}.`);
  const fs = require("fs");
  await fs.open(
    `/Users/liuyuchao/Desktop/wp1092/hw5/own/server/log/${logName}`,
    "w",
    function (err, file) {
      if (err) throw err;
      console.log("new log");
    }
  );
});

export { gettime, logName };

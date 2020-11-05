const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  return res.send({ error: "not found" });
});

app.get("/fetch/:country", (req, res) => {
  console.log(req.params.country);
  fetch(
    `https://disease.sh/v3/covid-19/historial/${req.params.country}?lastdays=all`
  )
    .then((response) => response.json())
    .then((json) => {
      return res.send(json);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

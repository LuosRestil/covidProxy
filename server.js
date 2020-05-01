const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/fetch:country", cors(corsOptions), (req, res) => {
  fetch(`http://corona-api.com/countries/${req.params.country}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
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

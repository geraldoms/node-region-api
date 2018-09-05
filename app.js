var express = require("express"),
  regionService = require("./services/regionService"),
  app = express();

const port = process.env.PORT || 3000;

app.get("/api/region/:country/:zipcode", (req, res) => {
  regionService
    .getRegioByCountryAndZip(req.params.country, req.params.zipcode)
    .then(
      result => {
        res.send(result);
      },
      err => {
        console.log(err);
      }
    );
});

app.listen(port, () => {
  console.log("Running on PORT: " + port);
});

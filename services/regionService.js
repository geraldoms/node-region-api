const rq = require("request-promise");

class RegionService {
  static getRegioByCountryAndZip(countryCode, zipCode) {
    if (!countryCode || !zipCode) {
      throw new Error("Country Code and Zip Code are required");
    }

    var options = {
      uri: "http://api.zippopotam.us/" + countryCode + "/" + zipCode,
      json: true
    };

    return rq(options)
      .then(res => {
        return {
          city: res.places[0]["place name"],
          state: res.places[0].state,
          country: res.country,
          longitude: res.places[0].longitude,
          latitude: res.places[0].latitude
        };
      })
      .catch(err => {
        return {};
      });
  }
}

module.exports = RegionService;

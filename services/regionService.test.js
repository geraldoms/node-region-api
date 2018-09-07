const sc = require("sinon-chai"),
  chai = require("chai"),
  sinon = require("sinon"),
  rp = require("request-promise"),
  RegionService = require("./regionService");

chai.should();
chai.use(sc);

describe("Region Service", () => {
  afterEach(() => {
    if (rp.get.restore) {
      rp.get.restore();
    }
  });

  it("Test Get region by country and zip code", done => {
    const countryCode = "US";
    const zipCode = "48104";
    const regionExpected = {
      city: "Ann Arbor",
      state: "Michigan",
      country: "United States",
      longitude: "-83.7282",
      latitude: "42.2694"
    };

    const result = RegionService.getRegionByCountryAndZip(countryCode, zipCode);
    result.then(region => {
      region.should.to.be.deep.equal(regionExpected);
      done();
    });
  });

  it("Test Get region by country and zip code using mock data", done => {
    const countryCode = "US";
    const zipCode = "48104";
    const regionExpected = {
      city: "Ann Arbor",
      state: "Michigan",
      country: "United States",
      longitude: "-83.7282",
      latitude: "42.2694"
    };

    const rpStub = sinon.stub(rp, "get").resolves({
      "post code": "48104",
      country: "United States",
      "country abbreviation": "US",
      places: [
        {
          "place name": "Ann Arbor",
          longitude: "-83.7282",
          state: "Michigan",
          "state abbreviation": "MI",
          latitude: "42.2694"
        }
      ]
    });

    const result = RegionService.getRegionByCountryAndZip(countryCode, zipCode);
    result.then(region => {
      region.should.to.be.deep.equal(regionExpected);
      rpStub.should.be.calledWith({
        uri: "http://api.zippopotam.us/US/48104",
        json: true
      });
      done();
    });
  });

  it("Missing required arguments", () => {
    chai
      .expect(() => {
        RegionService.getRegionByCountryAndZip();
      })
      .to.be.throws("Country Code and Zip Code are required");
  });
});

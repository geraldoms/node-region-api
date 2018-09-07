# Node Region API

This is a basic REST API to return region/location by country and zip code using the api.zippopotam.us API.

## Requirements
* Node 8+

## Installation 
`$ npm install`

## Usage 
`$ npm start`

## Running the tests
`$ npm test`

## Stack

| Tech             | Description        |
| ---------------- |:------------------:|
| [Express](https://expressjs.com)     | Web server    |
| [Mocha](https://mochajs.org)          | Test library   |
| [Chai](http://www.chaijs.com)        | Assertion library     |
| [Sinon](https://sinonjs.org/)          | Stubs   |

## Request samples 

Request:
```bash
curl http://localhost:3000/api/region/us/90210
```
Response:
```json
{
    "city":"Beverly Hills",
    "state":"California",
    "country":"United States",
    "longitude":"-118.4065",
    "latitude":"34.0901"
}
```
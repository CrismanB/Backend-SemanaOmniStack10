const axios = require("axios");
const Dev = require("./../models/Dev");
const parseStringAsArray = require("./../utils/parseStringAsArray");

class SeacrhController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const dev = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json(dev);
  }
}

module.exports = new SeacrhController();

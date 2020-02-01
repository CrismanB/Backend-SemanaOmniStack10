const axios = require("axios");
const Dev = require("./../models/Dev");
const parseStringAsArray = require("./../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("./../webSocket");

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `http://api.github.com/users/${github_username}`
      );

      const techsArray = parseStringAsArray(techs);

      const { name = login, avatar_url, bio } = response.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude
        },
        techsArray
      );
      console.log("teste");
      console.log(sendSocketMessageTo);
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  }
}

module.exports = new DevController();

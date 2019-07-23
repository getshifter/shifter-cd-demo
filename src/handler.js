const axios = require("axios");
const querystring = require("querystring");
const { Auth, Sites, Artifacts } = require("@shifter/node");

module.exports.index = async event => {
  const {
    username,
    password,
    site_id,
    wppusher_token,
    wppusher_package
  } = event.queryStringParameters;

  let data = [];
  const login = new Auth();

  /**
   * Start WordPress
   */
  await login.login(username, password).then(result => {
    const start = new Sites({
      token: result.AccessToken
    });
    return start.startWordPress(site_id);
  });

  /**
   * Get WordPress URL
   */
  await login.login(username, password).then(result => {
    const site = new Sites({
      token: result.AccessToken
    });
    return site.describe(site_id).then(result => {
      data.push({
        wordpress_site_url: result.wordpress_site_url
      });
    });
  });

  /**
   * Post to WP Pusher
   */
  const wppusher = await axios
    .post(
      data[0].wordpress_site_url + "/?wppusher-hook",
      querystring.stringify({
        token: wppusher_token,
        package: wppusher_package
      })
    )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });

  /**
   * Stop WordPress
   */
  await login.login(username, password).then(result => {
    const stop = new Sites({
      token: result.AccessToken
    });
    return stop.stopWordPress(site_id);
  });

  /**
   * Create Artifact
   */
  await login.login(username, password).then(result => {
    const generate = new Artifacts({
      token: result.AccessToken
    });
    return generate.generate(site_id);
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Did it work?")
  };
};

const { Issuer } = require("openid-client");
require('dotenv').config();
// 1. Discover Google OAuth server config & create client
async function setupClient() {
  const googleIssuer = await Issuer.discover("https://accounts.google.com");

  const client = new googleIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URIS],
    response_types: ["code"],
  });
  return client;
}

// 2. Sign in route
const signInWithGoogle = async (req, res) => {
  const client = await setupClient();
  if (!client) {
    return res.status(500).send("OAuth client not initialized yet");
  }

  const url = client.authorizationUrl({
    scope: "openid email profile ", // request identity + email + profile
  });

  res.redirect(url);
};



module.exports = {
  setupClient,
  signInWithGoogle,
};

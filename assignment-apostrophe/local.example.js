// Settings specific to this server. Change the URL
// if you are deploying in production. Then copy to
// data/local.js. That folder is shared by all
// deployments in our stagecoach recipe

module.exports = {
  modules: {
    'apostrophe-assets': {
      // Set to true for full CSS and JS minify, on staging and production servers
      // minify: true
    },
    // If these are your db settings then you don't need to be explicit. If not
    // you can uncomment this and get more specific.
    'apostrophe-db': {
      uri: 'mongodb://localhost:27017/apostrophe-sandbox'
      // There is legacy support for host, port, name, user and password options,
      // but this is not necessary. They can all go in the uri option like this:
      // mongodb://user:password@host:port/dbname
    }
  }
};



module.exports = {
  projectId: 'customer-pro-2',
  keyFilename: './customers.json',
  oauth2: {
    redirectUrl: process.env.REDIRECT_URL || 'http://localhost:8080/oauth2callback'
  }
};

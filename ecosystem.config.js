module.exports = {
  apps : [{
    name: 'Deployer Frontend',
    script: 'server.js',
    env: {
      NODE_ENV: 'staging',
      NODE_PORT: 3004,
    }
  }],
};

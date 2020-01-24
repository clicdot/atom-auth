const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

function plugin (fastify, options) {
  const instance = options.instance || 'sequelize';
  // const autoConnect = options.autoConnect || true;

  delete options.instance;
  delete options.autoConnect;

  const sequelize = new Sequelize(options.database, options.username, options.password, {
    host: options.host,
    dialect: options.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  return sequelize.authenticate().then(decorate);

  function decorate () {
    fastify.decorate(instance, sequelize);
    fastify.addHook('onClose', (fastifyInstance, done) => {
      sequelize.close()
        .then(done)
        .catch(done);
    });
  }
}

module.exports = fp(plugin);

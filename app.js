const path = require('path');
const Hapi = require('hapi');
const routes = require("./routes");
const fileLoader = require('./file-loader')
const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  app: {
    ROOT_DIR : path.dirname(require.main.filename),
    JSON_FILE_DIR : path.dirname(require.main.filename)+ "/resources/alerts.json",
    SOURCE_DIR : path.dirname(require.main.filename)+ "/resources/data"
  }
});
const iniciarServer = async () => {
  try {
    await server.register(routes);
    await fileLoader.loadJson(server.settings.app.JSON_FILE_DIR, server.settings.app.SOURCE_DIR);
    await server.start();
    console.log(server.settings.app.ROOT_DIR)
    console.log(`Servidor corriendo en: ${server.info.uri}`);
  } catch (error) {
    console.log('Error al iniciar el servidor Hapi');
  }
};
iniciarServer();
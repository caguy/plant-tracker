import app from "./app.js";

const server = app({
  logger: {
    level: "debug",
  },
  ignoreTrailingSlash: true,
});
startServer();

async function startServer() {
  try {
    await server.ready();
    await server.listen(server.config.port);
  } catch (err) {
    server.log.fatal("Failed to launch server app");
    server.log.error(err);
    process.exit(1);
  }
}

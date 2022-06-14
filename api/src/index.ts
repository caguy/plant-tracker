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
    await server.listen(
      { port: server.config.port, host: "0.0.0.0" },
      (error) => {
        if (error) {
          process.exit(1);
        }
      },
    );
  } catch (err) {
    server.log.fatal("Failed to launch server app");
    server.log.error(err);
    process.exit(1);
  }
}

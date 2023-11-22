import Fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import { join } from "desm";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log("Error connecting to database"));

app.register(cors, {});

app.register(autoload, {
  dir: join(import.meta.url, "routes"),
  dirNameRoutePrefix: false,
});

app.setErrorHandler((err, req, res) => {
  req.log.error({ req, res, err }, err && err.message);
  err.message = "An error has occurred";
  res.send(err);
});

async function start() {
  try {
    await app.listen({ port: 5000 });
    app.log.info("Server is running on http://localhost:5000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

import fastify from "fastify";
import cors from "@fastify/cors";
import autoLoad from "@fastify/autoload";
import fastifyPrintRoutes from "fastify-print-routes";
import { join } from "desm";
import mongoose from "mongoose";

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to database"))
	.catch((e) => console.log("Error connecting to database"));

const server = fastify({
	ignoreTrailingSlash: true,
	logger: {
		transport: {
			target: "pino-pretty",
		},
	},
});

await server.register(cors, {});
await server.register(fastifyPrintRoutes);
await server.register(autoLoad, {
	dir: join(import.meta.url, "app"),
	options: { prefix: "/api" },
});
await server.ready();

export default server;

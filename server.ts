import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "@fastify/routes";
import autoLoad from "@fastify/autoload";
import { join } from "desm";

const server = fastify({
	ignoreTrailingSlash: true,
	logger: {
		transport: {
			target: "pino-pretty",
		},
	},
});

await server.register(cors, {});
await server.register(routes);
await server.register(autoLoad, {
	dir: join(import.meta.url, "app"),
});
await server.ready();

export default server;

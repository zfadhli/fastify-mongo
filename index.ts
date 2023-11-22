import server from "./server.ts";

process.on("unhandledRejection", (err) => {
	console.error(err);
	process.exit(1);
});

const port = 5000;
await server.listen({ port });
console.log(server.routes);

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () =>
		server.close().then((err) => {
			console.log(`close application on ${signal}`);
			process.exit(err ? 1 : 0);
		}),
	);
}

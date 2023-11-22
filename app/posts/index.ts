import fp from "fastify-plugin";

async function routes(app) {
	app.get("/", {
		handler: async (req, reply) => {
			return { name: "posts" };
		},
	});
	app.get("/:id", {
		handler: async (req, reply) => {
			return { name: "posts", count: req.params.id };
		},
	});
}

export default fp(async function (app) {
	app.register(routes, { prefix: "/api/v1/posts" });
});

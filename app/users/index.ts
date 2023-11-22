import fp from "fastify-plugin";

async function users(app) {
	app.get("/", {
		handler: async (req, reply) => {
			return { name: "zfadhli" };
		},
	});
	app.post("/:id", {
		handler: async (req, reply) => {
			return { name: "zfadhli", count: req.params.id };
		},
	});
}

export default fp(async function (app) {
	app.register(users, { prefix: "/api/v1/users" });
});

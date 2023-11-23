export default async function (app) {
	app.get("/", {
		handler: async (req, res) => {
			res.send({
				name: "posts.index",
			});
		},
	});

	app.post("/", {
		handler: async (req, res) => {
			res.send({
				name: "posts.store",
			});
		},
	});

	app.get("/:id", {
		handler: async (req, res) => {
			res.send({
				id: req.params.id,
				name: "posts.show",
			});
		},
	});
}

import User from "./model.ts";

export default async function (app) {
	app.get("/", {
		handler: async (req, res) => {
			const user = await User.find();

			res.send({
				success: true,
				data: user,
			});
		},
	});

	app.post("/", {
		handler: async (req, res) => {
			const user = await User.create(req.body);

			res.send({
				success: true,
				data: user,
			});
		},
	});

	app.get("/:id", {
		handler: async (req, res) => {
			const user = await User.findById(req.params.id);

			res.send({
				success: true,
				data: user,
			});
		},
	});
}

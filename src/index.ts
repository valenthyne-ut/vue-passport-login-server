import express from "express";
import cors from "cors";

import { sequelize } from "@/classes/db";

import { apiRouter } from "@/api";
import "@/strategies/localStrategy";

const app = express();

(async () => {
	app.use(cors({
		origin: "http://localhost:8080"
	}));
	
	app.use("/api", apiRouter);

	await sequelize.sync();
	
	app.listen(8080, () => {
		console.log("Listening at port 8080");
	});
})();
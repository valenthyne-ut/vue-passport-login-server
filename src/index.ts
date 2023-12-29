import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize, supplyDefaultsToDB } from "@/classes/db";
import { apiRouter } from "@/api";

import "@/strategies/localStrategy";
import { initModels } from "./classes/db/models";

const app = express();

(async () => {
	initModels(sequelize);
	app.use(cors({
		origin: "http://localhost:8080"
	}));
	
	app.use(express.json());

	app.use("/api", apiRouter);

	await sequelize.sync();
	await supplyDefaultsToDB();
	
	app.listen(8080, () => {
		console.log("Listening at port 8080");
	});
})();
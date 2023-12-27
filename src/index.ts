import express from "express";
import cors from "cors";
import { sequelize } from "./classes/db";

import "@/strategies/localStrategy";

export const app = express();

(async () => {
	app.use(cors({
		origin: "http://localhost:8080"
	}));
	
	await sequelize.sync();
	
	app.listen(8080, () => {
		console.log("Listening at port 8080");
	});
})();
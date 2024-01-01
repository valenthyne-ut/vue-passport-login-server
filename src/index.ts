import "dotenv/config";
import express from "express";
import cors from "cors";
import { expiredJWTCache, sequelize, supplyDefaultsToDB } from "@/classes/db";
import { apiRouter } from "@/api";
import { randomBytes } from "crypto";
import { initExpiredJWTCache, initModels } from "./classes/db/models";

process.env.JWT_SECRET = randomBytes(48).toString("hex");

import "@/strategies/localStrategy";
import "@/strategies/JWTStrategy";

const app = express();

(async () => {
	initModels(sequelize);
	initExpiredJWTCache(expiredJWTCache);
	app.use(cors({
		origin: "http://localhost:8080"
	}));
	
	app.use(express.json());

	app.use("/api", apiRouter);

	await sequelize.sync();
	await expiredJWTCache.sync();
	await supplyDefaultsToDB();
	
	app.listen(8080, () => {
		console.log("Listening at port 8080");
	});
})();
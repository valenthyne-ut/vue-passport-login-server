import "dotenv/config";
import express from "express";
import cors from "cors";
import { expiredJWTCache, sequelize, supplyDefaultsToDB } from "@/classes/db";
import { apiRouter } from "@/api";
import { randomBytes } from "crypto";
import { initExpiredJWTCache, initModels } from "./classes/db/models";
import { ServerOptions, createServer } from "https";
import { readFileSync } from "fs";
import { join } from "path";

process.env.JWT_SECRET = randomBytes(48).toString("hex");

import "@/strategies/localStrategy";
import "@/strategies/JWTStrategy";

const app = express();

(async () => {
	const credentials: ServerOptions = {};
	const credentialsPath = join(process.cwd(), "/certs");

	try {
		credentials.key = readFileSync(join(credentialsPath, "key.pem"), "utf-8");
		credentials.cert = readFileSync(join(credentialsPath, "cert.pem"), "utf-8");
	} catch(err) {
		console.log("Error reading SSL credentials. Stopping..", err);
		process.exit(1);
	}

	initModels(sequelize);
	initExpiredJWTCache(expiredJWTCache);
	app.use(cors({
		origin: "https://localhost:8443"
	}));
	
	app.use(express.json());

	app.use("/api", apiRouter);

	await sequelize.sync();
	await expiredJWTCache.sync();
	await supplyDefaultsToDB();
	
	const httpsServer = createServer(credentials, app);
	httpsServer.listen(8443).on("listening", () => {
		console.log("Server listening on port 8443");
	});
})();
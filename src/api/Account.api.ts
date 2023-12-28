import { User } from "@/classes/db/models/User.model";
import { hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import { Router } from "express";

const accountRouter = Router()
	.post("/", (request, response) => {
		const randomUsername = randomBytes(4).toString("hex");
		const randomPassword = randomBytes(8).toString("hex");

		User.create({
			name: randomUsername,
			password_hash: hashSync(randomPassword, 11)
		}).then(() => {
			return response.status(201).json({
				username: randomUsername,
				password: randomPassword
			});
		}).catch(() => {
			return response.status(500).send("Couldn't create new user.");
		});
	});

export { accountRouter };
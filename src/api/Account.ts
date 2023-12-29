import { User } from "@/classes/db/models";
import { hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import { Router } from "express";

const accountRouter = Router()
	.post("/", async (request, response) => {
		const randomUsername = randomBytes(4).toString("hex");
		const randomPassword = randomBytes(8).toString("hex");

		try {
			const user = await User.create({
				name: randomUsername,
				password_hash: hashSync(randomPassword, parseInt(process.env.BCRYPT_HASH_COST))
			});
			return response.status(201).json({
				username: randomUsername,
				password: randomPassword
			});
		} catch(err) {
			console.log(err);
			return response.status(500).send("Couldn't create new user.");
		}
		
	});

export { accountRouter };
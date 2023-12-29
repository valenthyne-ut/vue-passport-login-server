import { Role, User } from "@/classes/db/models";
import { hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import { Router } from "express";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

type RequestParamsRole = "user" | "admin";

interface AccountRequestParams {
	role: RequestParamsRole
}

const accountRouter = Router()
	.post("/", async (request: Request<ParamsDictionary, unknown, AccountRequestParams>, response) => {
		if(!request.body.role || !["user", "admin"].includes(request.body.role)) {
			return response.status(400).send("Invalid role.");
		}

		const randomUsername = randomBytes(4).toString("hex");
		const randomPassword = randomBytes(8).toString("hex");

		try {
			const user = await User.create({
				name: randomUsername,
				password_hash: hashSync(randomPassword, parseInt(process.env.BCRYPT_HASH_COST))
			});
			
			const userRole = await Role.findOne({
				where: {
					name: request.body.role
				}
			});

			if(!userRole) { throw new Error("Requested role not present in database."); }
		
			await user.addRole(userRole);

			return response.status(201).json({
				username: randomUsername,
				password: randomPassword,
				roles: (await user.getRoles()).map(role => role.name)
			});
		} catch(err) {
			console.log(err);
			return response.status(500).send("Couldn't create new user.");
		}
		
	});

export { accountRouter };
import { User } from "@/classes/db/models";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

const authRouter = Router()
	.post("/", (request, response) => {
		passport.authenticate("password", { session: false }, (err: unknown, user: User | boolean, info: IVerifyOptions | undefined) => {
			if(info) {
				return response.status(400).json({
					error: info.message
				});
			}

			request.login(user, { session: false }, async (error) => {
				if(error) {
					console.log(error);
					return response.status(400).send({
						error: "Server error"
					});
				}
				
				user = user as User;
				const payload = {
					name: user.name,
					roles: (await user.getRoles()).map(role => role.name)
				};

				const jwtToken = sign({user: payload}, process.env.JWT_SECRET);
				return response.status(200).json({
					jwtToken: jwtToken,
					user: payload
				});
			});
		})(request, response);
	});

export { authRouter };
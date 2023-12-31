import { User } from "@/classes/db/models";
import { JWTPayload } from "@/interfaces/JWTPayload";
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
				const payload: JWTPayload = {
					user: {
						name: user.name,
						roles: (await user.getRoles()).map(role => role.name)
					}
				};

				const jwtToken = sign(payload, process.env.JWT_SECRET);
				return response.status(200).json({
					jwtToken: jwtToken,
					user: payload.user
				});
			});
		})(request, response);
	})
	.get("/", passport.authenticate("jwt", { session: false }), async (request, response) => {
		const user = request.user as User;
		return response.status(200).json({
			user: {
				name: user.name,
				roles: (await user.getRoles()).map(role => role.name)
			}
		});
	});

export { authRouter };
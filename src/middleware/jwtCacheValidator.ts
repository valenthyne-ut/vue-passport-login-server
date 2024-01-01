import { ExpiredJWT } from "@/classes/db/models";
import { RequestHandler } from "express";

export const jwtCacheValidator: RequestHandler = (request, response, next) => {
	const authHeader = request.headers.authorization;
	
	if(!authHeader) { return next(); }
	if(!authHeader.startsWith("Bearer ")) { return next(); }

	const token = authHeader.substring(7, authHeader.length);
	ExpiredJWT.findOne({
		where: {
			token: token
		}
	}).then(token => {
		if(!token) {
			return next();
		} else {
			return response.status(401).send("Unauthorized");
		}
	});
};
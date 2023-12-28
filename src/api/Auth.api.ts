import { Router } from "express";

const authRouter = Router()
	.post("/", (request, response) => {
		response.status(501).send("Not implemented.");
	});

export { authRouter };
import { Router } from "express";

const accountRouter = Router()
	.post("/", (request, response) => {
		response.status(501).send("Not implemented.");
	});

export { accountRouter };
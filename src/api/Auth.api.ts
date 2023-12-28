import { app } from "@/index";

app.post("/api/auth", (request, response) => {
	response.status(501).send("Not implemented.");
});
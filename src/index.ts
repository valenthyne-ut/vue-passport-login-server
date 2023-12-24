import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
	origin: "http://localhost:8080"
}));

app.listen(8080, () => {
	console.log("Listening at port 8080");
});
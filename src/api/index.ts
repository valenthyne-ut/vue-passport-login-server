import express from "express";
import { accountRouter } from "@/api/Account";
import { authRouter } from "@/api/Auth";

const apiRouter = express.Router()
	.use("/account", accountRouter)
	.use("/auth", authRouter);

export { apiRouter }; 
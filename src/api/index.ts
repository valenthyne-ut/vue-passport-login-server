import express from "express";
import { accountRouter } from "@/api/Account.api";
import { authRouter } from "@/api/Auth.api";

const apiRouter = express.Router()
	.use("/account", accountRouter)
	.use("/auth", authRouter);

export { apiRouter }; 
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "vue-passport-login-server.db",
	logging: false
});
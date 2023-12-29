import { Sequelize } from "sequelize";
import { Role } from "./models";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "vue-passport-login-server.db",
	logging: false,
	define: {
		underscored: true
	}
});

export const supplyDefaultsToDB = async () => {
	const userRoleExists = (await Role.findOne({where: { name: "user" }})) != null;
	if(!userRoleExists) {
		Role.create({
			name: "user"
		});
	}

	const adminRoleExists = (await Role.findOne({where: { name: "admin" }})) != null;
	if(!adminRoleExists) {
		Role.create({
			name: "admin"
		});
	}
};
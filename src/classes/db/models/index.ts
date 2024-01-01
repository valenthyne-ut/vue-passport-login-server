import { Sequelize } from "sequelize";
import { User } from "./User";
import { Role } from "./Role";
import { ExpiredJWT } from "./ExpiredJWT";

export { User, Role, ExpiredJWT };

export const initModels = (sequelize: Sequelize) => {
	User.initModel(sequelize);
	Role.initModel(sequelize);

	User.hasMany(Role, {
		as: "roles",
		foreignKey: "user_id"
	});

	return { User, Role };
};

export const initExpiredJWTCache = (sequelize: Sequelize) => {
	ExpiredJWT.initModel(sequelize);
	return { ExpiredJWT };
};
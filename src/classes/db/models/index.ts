import { Sequelize } from "sequelize";
import { User } from "./User";
import { Role } from "./Role";

export { User, Role };

export function initModels(sequelize: Sequelize)  {
	User.initModel(sequelize);
	Role.initModel(sequelize);

	User.hasMany(Role, {
		as: "roles",
		foreignKey: "user_id"
	});

	return { User, Role };
}
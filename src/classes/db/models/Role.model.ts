import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import { sequelize } from "..";

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role, {omit: never}>> {
	declare public readonly id: number | null;

	declare public readonly name: string;
}

Role.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	}
}, { sequelize });
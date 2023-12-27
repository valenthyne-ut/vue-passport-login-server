import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import { sequelize } from "@/classes/db";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User, {omit: never}>> {
	declare public readonly id: number | null;

	declare public readonly name: string;
	declare public readonly password_hash: string;
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	},
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, { sequelize });
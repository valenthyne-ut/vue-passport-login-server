import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes } from "sequelize";

export class ExpiredJWT extends Model<
	InferAttributes<ExpiredJWT>,
	InferCreationAttributes<ExpiredJWT>
> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare token: string;

	static initModel(sequelize: Sequelize): typeof ExpiredJWT {
		ExpiredJWT.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			}
		}, { sequelize });

		return ExpiredJWT;
	}
}
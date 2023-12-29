import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Role extends Model<
	InferAttributes<Role>,
	InferCreationAttributes<Role>
> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare name: string;

	static initModel(sequelize: Sequelize): typeof Role {
		Role.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},

			name: {
				type: DataTypes.TEXT,
				unique: true,
				allowNull: false
			}
		}, { sequelize });

		return Role;
	}
}
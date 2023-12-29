import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Role } from "./Role";

export class User extends Model<
	InferAttributes<User>, 
	InferCreationAttributes<User>
> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare name: string;
	declare password_hash: string;

	declare roles?: NonAttribute<Role[]>;
	declare getRoles: HasManyGetAssociationsMixin<Role>;
	declare setRoles: HasManySetAssociationsMixin<Role, number>;
	declare addRole: HasManyAddAssociationMixin<Role, number>;
	declare addRoles: HasManyAddAssociationsMixin<Role, number>;
	declare createRole: HasManyCreateAssociationMixin<Role>;
	declare removeRole: HasManyRemoveAssociationMixin<Role, number>;
	declare removeRoles: HasManyRemoveAssociationsMixin<Role, number>;
	declare hasRole: HasManyHasAssociationMixin<Role, number>;
	declare hasRoles: HasManyHasAssociationsMixin<Role, number>;
	declare countRoles: HasManyCountAssociationsMixin;

	declare static associations: {
		roles: Association<User, Role>
	};

	static initModel(sequelize: Sequelize): typeof User {
		User.init({
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
			},
			password_hash: {
				type: DataTypes.TEXT,
				allowNull: false
			}
		}, { sequelize });

		return User;
	}
}
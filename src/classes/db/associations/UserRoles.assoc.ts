import { User } from "../models/User.model";
import { Role } from "../models/Role.model";

User.hasMany(Role);
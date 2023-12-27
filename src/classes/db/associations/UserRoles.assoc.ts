import { User } from "@/classes/db/models/User.model";
import { Role } from "@/classes/db/models/Role.model";

User.hasMany(Role);
import { Role } from "@/classes/db/models/Role.model";
import { User } from "@/classes/db/models/User.model";
import { compareSync } from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use("password", new LocalStrategy({
	usernameField: "username",
	passwordField: "password"
}, async (username, password, done) => {
	const user = await User.findOne({
		where: {
			name: username
		},
		include: [
			Role
		]
	});

	if(!user) {
		return done(null, false, { message: "User not found." });
	}

	if(!compareSync(password, user.password_hash)) {
		return done(null, false, { message: "Incorrect password." });
	}

	return done(null, user);
}));
import { User } from "@/classes/db/models";
import { JWTPayload } from "@/interfaces/JWTPayload";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use("jwt", new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload: JWTPayload, done) => {
	const user = await User.findOne({ 
		where: { name: jwtPayload.user.name },
		include: [{ association: User.associations.roles }]
	});

	if(!user) {
		return done(null, false, { message: "User not found." });
	}

	return done(null, user);
}));
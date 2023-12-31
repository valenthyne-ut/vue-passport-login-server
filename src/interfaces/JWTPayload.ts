export interface JWTPayload {
	iat?: number;
	user: {
		name: string;
		roles: Array<string>;
	}
}
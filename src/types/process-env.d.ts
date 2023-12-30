export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			BCRYPT_HASH_COST: string;
			JWT_SECRET: string;
		}
	}
}
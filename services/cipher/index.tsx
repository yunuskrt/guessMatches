import { hash, compare } from 'bcryptjs'

export class CipherHandler {
	static async encrypt(password: string): Promise<string> {
		return await hash(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
	}

	static async isValid(password: string, hashedPass: string): Promise<boolean> {
		return await compare(password, hashedPass)
	}
}

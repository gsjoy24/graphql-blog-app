import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type TUser = {
	id?: number;
	name: string;
	email: string;
	password: string;
};

export const resolvers = {
	Query: {
		users: async (parent: any, args: any, context: any) => {
			return await prisma.user.findMany();
		}
	},
	Mutation: {
		signUp: async (parent: any, args: TUser, context: any) => {
			const { name, email, password } = args;
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword
				}
			});
			return user;
		}
	}
};

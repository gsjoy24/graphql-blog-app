import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
	Query: {
		users: async (parent: any, args: any, context: any) => {
			return await prisma.user.findMany();
		}
	},
	Mutation: {
		signUp: async (parent: any, args: any, context: any) => {
			return await prisma.user.create({
				data: {
					name: args.name,
					email: args.email,
					password: args.password
				}
			});
		}
	}
};

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwtHelper";

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

			const userExists = await prisma.user.findFirst({
				where: {
					email
				}
			});

			if (userExists) {
				throw new Error("User already exists");
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword
				}
			});
			const jwtPayload = { userId: newUser?.id, email: newUser?.email };

			const token = createToken(jwtPayload);
			console.log({ token });

			return { token, user: newUser };
		},

		signIn: async (parent: any, args: { email: string; password: string }, context: any) => {
			const { email, password } = args;
			const user = await prisma.user.findFirst({
				where: {
					email
				}
			});

			if (!user) {
				throw new Error("User not found");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				throw new Error("Invalid password");
			}

			const jwtPayload = { userId: user.id, email: user.email };

			const token = createToken(jwtPayload);

			return { token, user };
		}
	}
};

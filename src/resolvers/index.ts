import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
			const newUser = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword
				}
			});
			const jwtPayload = { userId: newUser?.id, email: newUser?.email };

			const token = jwt.sign(jwtPayload, "vkuesnhaeiwofhaw98eruaw9n8rh2qcr8ejqa9hq9r8jhqp9e8hqn9ryh", {
				expiresIn: "1d"
			});
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

			const token = jwt.sign(jwtPayload, "vkuesnhaeiwofhaw98eruaw9n8rh2qcr8ejqa9hq9r8jhqp9e8hqn9ryh", {
				expiresIn: "1d"
			});

			return { token, user };
		}
	}
};

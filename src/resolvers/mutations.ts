import bcrypt from "bcrypt";
import { createToken } from "../utils/jwtHelper";

type TUser = {
	id?: number;
	name: string;
	email: string;
	password: string;
	bio?: string;
};

export const Mutation = {
	signUp: async (parent: any, args: TUser, { prisma }: any) => {
		const { name, email, password, bio } = args;

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

		if (bio) {
			await prisma.profile.create({
				data: {
					bio,
					userId: newUser.id
				}
			});
		}
		const jwtPayload = { userId: newUser?.id, email: newUser?.email };

		const token = createToken(jwtPayload);

		return { token, user: newUser };
	},

	signIn: async (parent: any, args: { email: string; password: string }, { prisma }: any) => {
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
};

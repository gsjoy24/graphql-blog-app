export const Query = {
	users: async (parent: any, args: any, { prisma }: any) => {
		return await prisma.user.findMany();
	},

	user: async (parent: any, args: { id: string }, { prisma }: any) => {
		return await prisma.user.findUnique({
			where: {
				id: args.id
			}
		});
	},

	profiles: async (parent: any, args: any, { prisma }: any) => {
		return await prisma.profile.findMany();
	},

	profile: async (parent: any, args: { userId: string }, { prisma }: any) => {
		return await prisma.profile.findUnique({
			where: {
				userId: args.userId
			}
		});
	}
};

import { Mutation } from "./mutations";
import { Query } from "./queries";

export const resolvers = {
	Query,
	Mutation,
	User: {
		profile: async (parent: any, args: any, { prisma }: any) => {
			return await prisma.profile.findFirst({
				where: {
					userId: parent.id
				}
			});
		}
	}
};

import jwt from "jsonwebtoken";

export const createToken = (payload: { userId: string; email: string }) => {
	return jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: "1d"
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET!);
};

import { ratelimit } from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
	try {
		const { success } = await ratelimit.limit("my-limit");

		if (!success) {
			return res.status(429).json({
				message: "Too many requests, please try again later.",
			});
		}
		next();
	} catch (error) {
		console.log("Rate limit error", error);
		next(error);
	}
};

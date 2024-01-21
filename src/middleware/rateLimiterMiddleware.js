const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 30, 
	keyGenerator: (req) => {
		return req.user ? req.user.username : "default";
	},
	handler: (req, res) => {
		res.status(429).json({ error: "Too many requests, please try again later." });
	},
});

module.exports = { rateLimiter };

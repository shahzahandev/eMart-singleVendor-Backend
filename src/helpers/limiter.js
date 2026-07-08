const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // (here, per 15 minutes).
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56,
}); 
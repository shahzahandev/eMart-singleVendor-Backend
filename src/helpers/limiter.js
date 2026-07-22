const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 500, // (here, per 5 minutes).
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56,
}); 
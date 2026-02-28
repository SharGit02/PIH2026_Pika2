/**
 * requireRole middleware factory.
 * Usage: requireRole('seller') or requireRole('admin')
 *
 * Expects syncUser to have run first (req.dbUser must be populated).
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        const user = req.dbUser;

        if (!user) {
            console.warn('⚠️  [roleMiddleware] req.dbUser is missing – did syncUser run?');
            return res.status(401).json({ error: 'Unauthorized – user not found' });
        }

        if (!roles.includes(user.role)) {
            console.warn(
                `🚫 [roleMiddleware] Access denied for clerkId: ${user.clerkId} | role: ${user.role} | required: ${roles.join(' or ')}`
            );
            return res.status(403).json({
                error: `Forbidden – requires role: ${roles.join(' or ')}`,
            });
        }

        console.log(
            `✅ [roleMiddleware] Access granted for clerkId: ${user.clerkId} | role: ${user.role}`
        );
        next();
    };
};

export default requireRole;

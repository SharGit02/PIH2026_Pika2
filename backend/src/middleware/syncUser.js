import User from '../models/User.js';

/**
 * Middleware: Sync Clerk user into MongoDB on every authenticated request.
 * If user doesn't exist in DB, auto-create them with default role 'buyer'.
 */
const syncUser = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized – no userId in token' });
        }

        // Check if user already exists in DB
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            // Log what Clerk actually gives us in the JWT
            const claims = req.auth?.sessionClaims || {};
            console.log(`🔍 [syncUser] Session claims for new user:`, JSON.stringify(claims));

            const claimEmail = claims.email || claims.primaryEmailAddress || '';
            const claimName = claims.name || claims.username || claims.firstName || 'RentiGO User';

            console.log(`🆕 [syncUser] Creating new DB user for clerkId: ${userId} | email: "${claimEmail}" | name: "${claimName}"`);

            user = await User.create({
                clerkId: userId,
                email: claimEmail,
                name: claimName,
                role: 'buyer',
            });

            console.log(`✅ [syncUser] New user created: ${user._id} (email: "${user.email}")`);
        }

        // Attach full DB user to request
        req.dbUser = user;
        next();
    } catch (error) {
        console.error('❌ [syncUser] Error syncing user:', error.message);
        return res.status(500).json({ error: 'Internal server error during user sync' });
    }
};

export default syncUser;

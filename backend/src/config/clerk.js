import { clerkMiddleware, requireAuth } from '@clerk/express';

// Export ready-to-use Clerk middleware
export const clerkSetup = clerkMiddleware();
export { requireAuth };

console.log('🔐 [Clerk] Clerk middleware configured');

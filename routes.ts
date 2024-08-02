/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type { string[ ] }
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/reset"
];


/**
 * An array of routes that are used for authentication.
 * There routes will redirect logged user to /settings.
 * @type { string[ ] }
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/new-password"
]

/**
 * The prefix for api authentication routes.
 * Routes that starts with this prefix are used for api authentication purposes.
 * @type { string }
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after loging in.
 * @type { string }
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
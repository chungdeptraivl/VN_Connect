/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     description: API to register a new user with email, password, and full name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user.
 *               email:
 *                 type: string
 *                 description: The user's email address (must be valid).
 *               password:
 *                 type: string
 *                 description: The user's password (at least 6 characters, including an uppercase letter, lowercase letter, number, and special character).
 *     responses:
 *       200:
 *         description: Successful registration. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     profilePic:
 *                       type: string
 *                       example: "https://avatar.iran.liara.run/public/1.png"
 *       400:
 *         description: Bad request, invalid or missing data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is already registered."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authenticate a user using email and password, and return a JWT token on successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tc01@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful. Returns user information and a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "UD2uRORwrUReT5wiBb0O87cz1uGhlgIuTNnpelbaidY...."
 *                 user:
 *                   type: object
 *                   description: User details (excluding sensitive data)
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     profilePic:
 *                       type: string
 *                       example: "https://avatar.iran.liara.run/public/1.png"
 *       400:
 *         description: Invalid email format, weak password, or incorrect credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password."
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: API to log out a user from the system
 *     responses:
 *       200:
 *         description: Successful logout
 *       400:
 *         description: Logout failed
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 */

/**
 * @swagger
 * /api/auth/onboarding:
 *   post:
 *     tags:
 *       - Profile
 *     description: API for completing the onboarding process by updating user profile information. Requires authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - bio
 *               - nativeLanguage
 *               - learningLanguage
 *               - location
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The user's full name.
 *                 example: "John Doe"
 *               bio:
 *                 type: string
 *                 description: A short biography or introduction.
 *                 example: "I love learning new languages and connecting with people around the world."
 *               nativeLanguage:
 *                 type: string
 *                 description: The user's native language (language code).
 *                 example: "en"
 *               learningLanguage:
 *                 type: string
 *                 description: The language the user is currently learning (language code).
 *                 example: "es"
 *               location:
 *                 type: string
 *                 description: The user's location or country.
 *                 example: "New York, USA"
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User onboarded successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     bio:
 *                       type: string
 *                       example: "I love learning new languages and connecting with people around the world."
 *                     nativeLanguage:
 *                       type: string
 *                       example: "en"
 *                     learningLanguage:
 *                       type: string
 *                       example: "es"
 *                     location:
 *                       type: string
 *                       example: "New York, USA"
 *       400:
 *         description: Missing or invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please fill in all required fields."
 *                 missingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["bio", "location"]
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../validators/user");
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const inputValidator_1 = __importDefault(require("../middlewares/inputValidator"));
const tokenAuth_1 = require("../middlewares/tokenAuth");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - phone
 *        - occupation
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto generated id of product
 *        name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: The user email
 *        phone:
 *          type: string
 *          description: The user phone
 *        password:
 *          type: string
 *          description: The user password
 *        occupation:
 *          type: string
 *          description: The user occupation
 *        createdAt:
 *          type: string
 *          description: The user occupation
 *        updatedAt:
 *          type: string
 *          description: The user occupation
 *
 */
/**
* @swagger
*         components:
*          securitySchemes:
*           cookieAuth:         # arbitrary name for the security scheme; will be used in the "security" key later
*              type: apiKey
*              in: cookie
*              name: accessToken  # cookie name
*
*/
/**
 * @swagger
 * /user/all:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: Returns a list of users.
 *     description: Optional extended description in CommonMark or HTML.
 *     responses:
 *       200:    # status code
 *         description: A JSON array of user names
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get("/all", auth_1.default, userController_1.default.getAllUsers);
router.post("/login", (0, inputValidator_1.default)(user_1.loginSchema), userController_1.default.login);
router.post("/logout", userController_1.default.logout);
router.put("/set-password", tokenAuth_1.tokenAuth, (0, inputValidator_1.default)(user_1.createPasswordSchema), userController_1.default.setPassword);
router.post("/registration", (0, inputValidator_1.default)(user_1.createUserSchema), userController_1.default.addUser);
exports.default = router;

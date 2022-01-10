import {
  createUserSchema,
  createPasswordSchema,
  loginSchema,
} from "../validators/user";
import express from "express";
import UserController from "../controllers/userController";

import inputValidator from "../middlewares/inputValidator";
import { tokenAuth } from "../middlewares/tokenAuth";
import auth from "../middlewares/auth";

const router = express.Router();

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

router.get("/all", auth,  UserController.getAllUsers);
router.post("/login", inputValidator(loginSchema), UserController.login);
router.post("/logout", UserController.logout);
router.put(
  "/set-password",
  tokenAuth,
  inputValidator(createPasswordSchema),
  UserController.setPassword
);

router.post(
  "/registration",
  inputValidator(createUserSchema),
  UserController.addUser
);

export default router;

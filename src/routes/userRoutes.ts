import { createUserSchema, createPasswordSchema, loginSchema } from "../validators/user";
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

router.get("/all",  auth, UserController.getAllUsers);
router.post("/login", inputValidator(loginSchema), UserController.login);
router.post("/logout", UserController.logout);
router.put("/set-password", tokenAuth, inputValidator(createPasswordSchema), UserController.setPassword);

router.post(
  "/create",
  inputValidator(createUserSchema),
  UserController.addUser
);

router.get("/get/:userId", UserController.getUser);

export default router;

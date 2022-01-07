import { createUserSchema, createPasswordSchema, loginSchema } from "../validators/user";
import express from "express";
import UserController from "../controllers/userController";

import inputValidator from "../middlewares/inputValidator";
import { tokenAuth } from "../middlewares/tokenAuth";

const router = express.Router();

router.get("/all", UserController.getAllUsers);
router.post("/login", inputValidator(loginSchema), UserController.login);
router.put("/set-password", tokenAuth, inputValidator(createPasswordSchema), UserController.setPassword);

router.post(
  "/create",
  inputValidator(createUserSchema),
  UserController.addUser
);

router.get("/get/:userId", UserController.getUser);

export default router;

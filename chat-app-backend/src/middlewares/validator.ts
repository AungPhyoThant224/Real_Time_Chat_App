import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateRegistration = [
  body("email").isEmail().withMessage("Enter a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("role")
    .isIn(["ADMIN", "USER"])
    .withMessage("Role must be either 'ADMIN' or 'USER'."),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").notEmpty().withMessage("Invalid credentials."),
  body("password").notEmpty().withMessage("Invalid credentials."),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

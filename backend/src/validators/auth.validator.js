import { body } from "express-validator";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters").matches(/[A-Za-z]/).withMessage("Password must contain a letter").matches(/\d/).withMessage("Password must contain a number"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

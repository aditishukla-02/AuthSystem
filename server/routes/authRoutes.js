// server1/routes/authroutes.js
import express from 'express';
import { login, logout, register } from '../controllers/authController.js'; // or ../controllers/...
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;

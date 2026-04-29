import express from 'express';
import { authMe, loginUser, userRegister } from './auth.contoller.js';
import { requireAuth } from '../../middlewares/requireAuth.js';


const authroutes = express.Router();

authroutes.post('/registerUser', userRegister);

authroutes.post('/loginUser', loginUser);

authroutes.get('/auth/me', requireAuth, authMe)

export default authroutes;
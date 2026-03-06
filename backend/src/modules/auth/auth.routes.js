import express from 'express';
import { loginUser, userRegister } from './auth.contoller.js';


const authroutes = express.Router();

authroutes.post('/registerUser', userRegister);

authroutes.post('/loginUser', loginUser);

export default authroutes;
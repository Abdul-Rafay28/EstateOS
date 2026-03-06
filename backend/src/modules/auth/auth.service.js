import userModel from "../user/user.model.js";
import bcrypt from 'bcrypt';
import { response } from "express";
import jwt from 'jsonwebtoken';

export const registerUser = async ({ name, email, password }) => {
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashPassword });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    }
}

export const login = async ({ email, password }) => {

    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
        const error = new Error('Invalid Credentials')
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error('Invalid Credentials')
        error.statusCode = 401;
        throw error;
    }

    if (!user.isActive) {
        const error = new Error('Account InActive');
        error.statusCode = 403;
        throw error;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });

    return { token }

}
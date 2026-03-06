import { login, registerUser } from "./auth.service.js";


export const userRegister = async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({
                message: 'All fileds are required!',
                success: false,
            })
        }

        const cleanEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return resp.status(400).json({
                message: 'Invalid email format!',
                success: false,
            })
        }

        if (password.length < 8) {
            return resp.status(400).json({
                message: 'Password must be atleast 8 characters',
                success: false,
            })
        }


        const result = await registerUser({ name, email: cleanEmail, password });

        resp.status(200).json({
            message: 'User registered successfully',
            success: true,
            data: result,
        })

    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
        })
    }
}

export const loginUser = async (req, resp) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).json({
                message: 'Email & Password must required!',
                success: false,
            })
        }

        const cleanEmail = email.trim().toLowerCase();
        const result = await login({ email: cleanEmail, password });

        resp.cookie('token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        resp.status(200).json({
            message: 'Login successfully',
            success: true,
        })

    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}
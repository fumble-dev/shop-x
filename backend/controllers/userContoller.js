import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const jwt_secret = process.env.JWT_SECRET || 'iloveyou'

const createToken = (id) => {
    return jwt.sign({ id }, jwt_secret, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide all details."
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password."
            });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = createToken(newUser._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Registration failed."
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid password."
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed."
        });
    }
};




const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin }